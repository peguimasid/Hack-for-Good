import * as Yup from 'yup';

import connection from '../database/api';

class HelpController {
  async index(req, res) {
    try {
      const { latitude, longitude } = req.query;

      const helps = await connection('help')
        .where(
          connection.raw(
            `round(((${latitude} - latitude) * (${latitude} - latitude) + (${longitude} - longitude) * (${longitude} - longitude) * 6371),0)`
          ),
          '<=',
          10
        )
        .select(
          '*',
          connection.raw(
            `round(((${latitude} - latitude) * (${latitude} - latitude) + (${longitude} - longitude) * (${longitude} - longitude) * 6371),0) as distance`
          )
        );

      return res.json(helps);
    } catch (error) {
      return res.status(401).json({
        error: error.message,
        message: 'Não foi possível encontrar os dados',
      });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      longitude: Yup.string().required(),
    });
    if (!(await schema.validate(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    try {
      const { title, description, latitude, longitude } = req.body;
      const user_id = req.userId;

      const [id] = await connection('help').insert({
        title,
        description,
        latitude,
        longitude,
        user_id,
      });

      return res.json({ id, title, description });
    } catch (error) {
      return res.status(401).json({
        error: 'Help not inserted',
        message: 'Problema ao cadastrar a solicitação',
      });
    }
  }
}

export default new HelpController();

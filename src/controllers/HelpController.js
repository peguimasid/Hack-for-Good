import * as Yup from 'yup';

import connection from '../database/api';

class HelpController {
  async index(req, res) {
    try {
      const { latitude, longitude } = req.query;

      const { page = 1 } = req.query;

      const helps = await connection('help')
        .join('users', 'users.id', '=', 'help.user_id')
        .limit(5)
        .offset((page - 1) * 5)
        .orderBy('help.id', 'desc')
        .where(
          connection.raw(
            `round(((${latitude} - latitude) * (${latitude} - latitude) + (${longitude} - longitude) * (${longitude} - longitude) * 6371),0)`
          ),
          '<=',
          10
        )
        .select(
          'help.*',
          'users.name',
          'users.phone',
          connection.raw(
            `round(((${latitude} - latitude) * (${latitude} - latitude) + (${longitude} - longitude) * (${longitude} - longitude) * 6371),0) as distance`
          )
        );

      const count = await connection('help')
        .where(
          connection.raw(
            `round(((${latitude} - latitude) * (${latitude} - latitude) + (${longitude} - longitude) * (${longitude} - longitude) * 6371),0)`
          ),
          '<=',
          10
        )
        .select('*')
        .count();

      res.header('X-Total-Count', count[0]['count(*)']);

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
      latitude: Yup.string().required(),
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

  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.userId;

    const user = await connection('help').where({ user_id, id }).select('*');

    if (!user) {
      return res.status(401).json({
        error: 'Help not find or user not permitted',
        message: 'Erro ao excluir',
      });
    }

    await connection('help').where({ id }).delete();

    return res.sendStatus(204);
  }
}

export default new HelpController();

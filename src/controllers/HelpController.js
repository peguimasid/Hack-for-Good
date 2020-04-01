import * as Yup from 'yup';
import Knex from 'knex';

import connection from '../database/api';

class HelpController {
  async index(req, res) {
    try {
      // const { latitude, longitude } = req.query;
      const latitude = -20.8642561;
      const longitude = -51.5073472;

      // const haversine = `(6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(latitude))))`;
      // const haversine = `(((${latitude} - latitude) * (${latitude} - latitude) + (${longitude} - longitude) * (${longitude} - longitude) * 6371))`;
      const helps = await connection('help')
        .whereRaw(connection.raw(haversine), '<=', 10)
        .select(
          '*',
          connection.raw(
            `(((${latitude} - latitude) * (${latitude} - latitude) + (${longitude} - longitude) * (${longitude} - longitude) * 6371)) as distance`
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
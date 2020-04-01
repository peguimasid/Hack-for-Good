import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import connection from '../database/api';
import authConfig from '../config/auth';

class SessionController {
  async store(req, res) {
    const { name, phone, code } = req.body;
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      phone: Yup.string().min(10).max(11),
      code: Yup.number().min(7),
    });
    try {
      if (!schema.validate(req.body)) {
        return res
          .status(400)
          .json({ error: 'Validation fails', message: 'Dados inválidos' });
      }

      const messages_pass = await connection('messages_pass')
        .where({
          phone,
          code,
        })
        .andWhereNot({
          date_validated: null,
        })
        .select('*')
        .first();

      if (!messages_pass.id) {
        return res
          .status(401)
          .json({ error: 'Data is not valid', message: 'Dados incorretos' });
      }

      const user = await connection('users')
        .where({
          phone,
        })
        .select('*')
        .first();

      let id = user === undefined ? '' : user.id;

      if (user === undefined || user.phone !== phone) {
        const idUser = await connection('users').insert({
          name,
          phone,
        });
        id = idUser;
      }

      return res.json({
        name,
        token: jwt.sign({ id }, authConfig.secret),
      });
    } catch (error) {
      return res.status(401).json({
        error: 'Invalid Data',
        message: 'Dados inválidos. Tente novamente',
      });
    }
  }
}

export default new SessionController();

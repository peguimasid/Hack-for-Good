import jwt from 'jsonwebtoken';
import connection from '../database/api';
import authConfig from '../config/auth';

class SessionController {
  async store(req, res) {
    const { name, phone, code } = req.body;

    const [id] = await connection('messages_pass')
      .where({
        phone,
        code,
      })
      .andWhereNot({
        date_validated: null,
      })
      .first();

    if (!id) {
      return res
        .status(401)
        .json({ error: 'Data is not valid', message: 'Dados incorretos' });
    }
    res.json({
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();

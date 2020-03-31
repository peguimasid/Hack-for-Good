import crypto from 'crypto';
import twillio from 'twilio';
import * as Yup from 'yup';
import connection from '../database/api';

class SMSController {
  async store(req, res) {
    const schema = await Yup.object().shape({
      phone: Yup.string().required().min(10).max(11),
    });

    if (!(await schema.validate(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails', message: 'Celular inválido' });
    }
    const { phone } = req.body;

    await connection('messages_pass').where('phone', phone).update({
      date_validated: new Date(),
    });

    const code = Math.floor(Math.random() * 111111 + 1) + 999999;

    await connection('messages_pass').insert({
      phone,
      code,
    });

    return res.sendStatus(201);
  }
}

export default new SMSController();

import Twilio from 'twilio';
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

    try {
      const { phone } = req.body;

      await connection('messages_pass').where('phone', phone).update({
        date_validated: new Date(),
      });

      const code = Math.floor(Math.random() * 111111 + 1) + 999999;

      await connection('messages_pass').insert({
        phone,
        code,
      });

      const client = new Twilio(
        process.env.SID_TWILIO,
        process.env.TOKEN_TWILIO
      );

      await client.messages.create({
        body: `Seu código de confirmação do Conecte|ME é: ${code}`,
        from: '+1 313 651 7762',
        to: `+55 ${phone}`,
      });
      return res.sendStatus(201);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new SMSController();

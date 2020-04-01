import * as Yup from 'yup';

import connection from '../database/api';

class CodeValidationController {
  async store(req, res) {
    const { phone, code } = req.body;
    const schema = Yup.object().shape({
      phone: Yup.string().required().min(10).max(11),
      code: Yup.number().min(7),
    });
    if (!(await schema.validate(req.body))) {
      return res
        .status(400)
        .json({ error: 'Validation fails', message: 'Dados inválidos' });
    }
    try {
      const message_pass = await connection('messages_pass')
        .where({
          code,
          phone,
          date_validated: null,
        })
        .first();

      if (!message_pass) {
        return res.json({
          error: 'Code not validated',
          message: 'O código não pôde ser validado ou já foi utilizado',
        });
      }

      await connection('messages_pass')
        .where({
          id: message_pass.id,
        })
        .update({
          date_validated: new Date(),
        });

      return res.sendStatus(201);
    } catch (error) {
      return res.status(401).json({ message: 'Erro ao validar o código' });
    }
  }
}

export default new CodeValidationController();

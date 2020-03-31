import connection from '../database/api';

export default {
  async index(req, res) {
    const news = await connection('news').select('*');

    return res.json(news);
  },

  async store(req, res) {
    const { id, title, description, url } = req.body;

    const [noticeId] = await connection('news').insert({
      id,
      title,
      description,
      url,
    });

    return res.status(200).json({ noticeId, title, description, url });
  },

  async delete(req, res) {
    const { newsId } = req.params;

    await connection('news').where('id', newsId).first().delete();

    return res.status(204).json({ success: `news ${newsId} was deleted` });
  },
};

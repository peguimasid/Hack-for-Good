import connection from '../database/api';

export default {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('news').count();

    const news = await connection('news')
      .limit(5)
      .offset((page - 1) * 5)
      .select('*');

    res.header('X-Total-Count', count['count(*)']);

    return res.json(news);
  },

  async store(req, res) {
    const { id, image, title, description, url } = req.body;

    const [noticeId] = await connection('news').insert({
      id,
      image,
      title,
      description,
      url,
    });

    return res.status(200).json({ noticeId, image, title, description, url });
  },

  async delete(req, res) {
    const { newsId } = req.params;

    await connection('news').where('id', newsId).first().delete();

    return res.json({ success: `news with id: ${newsId} was deleted` });
  },
};

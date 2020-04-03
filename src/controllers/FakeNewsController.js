import connection from '../database/api';

export default {
  async store(req, res) {
    const { id, image, title, description, url } = req.body;

    const [fakenewsId] = await connection('fake_news').insert({
      id,
      image,
      title,
      description,
      url,
    });

    return res.json({ fakenewsId, image, title, description, url });
  },

  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection('fake_news').count();

    const fakeNews = await connection('fake_news')
      .limit(5)
      .offset((page - 1) * 5)
      .select('*');

    res.header('X-Total-Count', count['count(*)']);

    return res.json(fakeNews);
  },

  async delete(req, res) {
    const { fakeNewsId } = req.params;

    await connection('fake_news').where('id', fakeNewsId).first().delete();

    return res.json({
      success: `fake news with id: ${fakeNewsId} was deleted`,
    });
  },
};

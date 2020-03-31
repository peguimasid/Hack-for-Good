import connection from '../database/api';

export default {
  async store(req, res) {
    const { id, title, description, url } = req.body;

    const [fakenewsId] = await connection('fake_news').insert({
      id,
      title,
      description,
      url,
    });

    return res.json({ fakenewsId, title, description, url });
  },

  async index(req, res) {
    const fakeNews = await connection('fake_news').select('*');

    return res.json(fakeNews);
  },
};

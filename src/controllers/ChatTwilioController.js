import twilio from 'twilio';

class ChatTwilioController {
  index(req, res) {
    const { AccessToken } = twilio.jwt;
    const { ChatGrant } = AccessToken;
    const token = new AccessToken(
      process.env.SID_TWILIO,
      process.env.API_KEY,
      process.env.APP_SECRET
    );

    token.identity = req.userId;

    const chatGrant = new ChatGrant({
      serviceSid: process.env.CHAT_SID,
    });
    token.addGrant(chatGrant);

    res.send({ token: token.toJwt() });
  }
}

export default new ChatTwilioController();

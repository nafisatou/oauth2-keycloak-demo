const express = require('express');
const axios = require('axios');
const app = express();

const PORT = 3000; // Your app port
const CLIENT_ID = 'my-node-app';
const CLIENT_SECRET = 'hRfsDWRObeNF6yGXgu0sc5dbetGYBugD';
const REDIRECT_URI = 'http://localhost:3000/callback';
const TOKEN_URL = 'http://localhost:8280/realms/myrealm/protocol/openid-connect/token';
const USERINFO_URL = 'http://localhost:8280/realms/myrealm/protocol/openid-connect/userinfo';

app.get('/', (req, res) => {
  const redirectUrl = `http://localhost:8280/realms/myrealm/protocol/openid-connect/auth?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=openid profile email`;
  res.redirect(redirectUrl);
});

app.get('/hello', (req, res) => {
  res.send('🌍 Hello from Express!');
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('❌ Missing "code" query parameter.');

  try {
    const tokenRes = await axios.post(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const accessToken = tokenRes.data.access_token;

    const userInfoRes = await axios.get(USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const user = userInfoRes.data;

    res.send(`
      <h2>✅ Login Successful!</h2>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Username:</strong> ${user.preferred_username}</p>
    `);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).send('❌ Failed to authenticate.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 App running at: http://localhost:${PORT}`);
});

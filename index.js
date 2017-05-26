const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: 'G6rZSbSUFOTJ+lk+azpu0BEOkyHAeiQzh7wimY6A3hnMuHQLI5Nh27KbddXHeUGguzHCrgX/Ne2wNNh/nEtQxWvO+agZ4NtVoCbEpeSNyd1AMtiKLULvHQwriP2ESjQVwk5ixBJt5zPzfYpO8Xa5IAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'U85f96c722276f3628ea09598da6153f7'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

app.get('/',(req, res) => res.end('Site Working'));

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: 'test'
  });
}

app.listen(80);

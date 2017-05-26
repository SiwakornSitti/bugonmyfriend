'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'G6rZSbSUFOTJ+lk+azpu0BEOkyHAeiQzh7wimY6A3hnMuHQLI5Nh27KbddXHeUGguzHCrgX/Ne2wNNh/nEtQxWvO+agZ4NtVoCbEpeSNyd1AMtiKLULvHQwriP2ESjQVwk5ixBJt5zPzfYpO8Xa5IAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'U85f96c722276f3628ea09598da6153f7'
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

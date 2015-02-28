'use strict';

var http = require('http');
var querystring = require('querystring');
var slack = require('slack-notify')(process.env.SLACK_HOOK_URL);

var config =  {
  username: process.env.USERNAME || '<%= username %>',
  emoji: process.env.EMOJI || '<%= emoji %>',
  token: process.env.SLACK_TOKEN || void 0
};

http.createServer(function (req, res) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });

  req.on('end', function() {
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end();

    body = querystring.parse(body);
    console.log(body);

    handlePayload(body);
  });
}).listen(process.env.PORT || 1337);

function handlePayload(body){
  if(config.token && config.token !== body.token){
    return console.error('Token `' + body.token + '` didn\'t match environment variable');
  }

  var text = body.text.split(' ');

  slack.send({
    username: config.username,
    icon_emoji: config.emoji,
    channel: body.channel_id,
    text: '_' + body.command + ' ' + body.text + '_',
    attachments: [{
      title: 'result here'
    }]
  });
}

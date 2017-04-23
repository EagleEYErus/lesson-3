const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const token = 'trnsl.1.1.20170423T105805Z.5a5b8f98411aba03.9a12de0340d0c428be2b52e79d2d80b23e3be93c';

rl.on('line', cmd => {
  if (cmd === '!выход') {
    rl.close();
    return;
  }
  request({
    method: 'GET',
    uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
    form: {
      key: token,
      text: cmd,
      lang: 'ru-en'
    },
  }, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      const result = JSON.parse(body);
      console.log(result.text[0]);
    }
  });
});

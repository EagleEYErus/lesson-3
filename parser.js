const request = require('request');
const cheerio = require('cheerio');

request({
  method: 'GET',
  uri: 'https://playoverwatch.com/ru-ru/blog/',
}, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {

    const $ = cheerio.load(body);
    const news = {
      header: [],
      description: [],
    };

    $('.blog-list').find('.link-title').map(
      (index, element) => news.header.push(element.attribs.title)
    );
    $('.blog-list').find('.summary').map(
      (index, element) => news.description.push(element.children[0].data)
    );

    for (let i = 0; i < news.header.length; i++) {
      console.log(
        `-------------------------------------
        Заголовок: ${news.header[i]}
        Описание: ${news.description[i]}`
      );
    }
  }
});

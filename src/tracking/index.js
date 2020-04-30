import rp from 'request-promise';
import cheerio from 'cheerio';

export const trackRemessa = async (remessa) => {
  const options = {
    method: 'POST',
    encoding: 'latin1',
    uri: 'https://www.directlog.com.br/track_individual/index.asp',
    form: {
      tipo: 0,
      numtracking: remessa,
      tknConsulta: await getToken()
    },
    transform: body => cheerio.load(body),
  };

  const $ = await rp(options);
  const objects = [];
  let lines = [];
  

    $('b').each(function (i) {
    if (i > 5) {
      lines.push($(this).text());

      if (i % 5 === 0) {
        objects.push({
          date: lines[0],
          hour: lines[1],
          op: lines[2],
          location: lines[3],
          obs: lines[4],
        });

        lines = [];
      }
    }
  });

  return objects;
};

const getToken = async () => {
  const tokenRegex = /<input type="hidden" name="tknConsulta" id="tknConsulta1" value="(\w+)">/i

  const options = {
    method: 'GET',
    encoding: 'latin1',
    uri: 'https://www.directlog.com.br'
  };

  let page = await rp(options);  
  let tokenSearch = page.match(tokenRegex);
  if (tokenSearch) {
    return tokenSearch[1];
  } 
};

export default {
  trackRemessa,
};

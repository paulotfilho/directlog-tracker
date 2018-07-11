import rp from 'request-promise';
import cheerio from 'cheerio';
import { toUTF8 } from '../helpers/string';

export const trackRemessa = async (remessa) => {
  const options = {
    method: 'POST',
    encoding: 'latin1',
    uri: 'https://www.directlog.com.br/track_individual/index.asp',
    form: {
      tipo: 0,
      numtracking: remessa,
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

export default {
  trackRemessa,
};

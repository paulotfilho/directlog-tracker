import iconv from 'iconv';

export const toUTF8 = (body) => {
  const ic = new iconv.Iconv('iso-8859-1', 'utf-8');
  const buf = ic.convert(body);
  return buf.toString('utf-8');
};

export default {
  toUTF8,
};

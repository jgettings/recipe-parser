import parser from './parser';

export default (url) => ({
  url,
  recipe: parser(''), // TODO make this curl and pass in some html
});

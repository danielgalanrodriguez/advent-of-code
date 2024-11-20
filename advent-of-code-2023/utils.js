exports.isNumber = (string) => {
  return string === '' ? false : /^[0-9]*$/.test(string);
}

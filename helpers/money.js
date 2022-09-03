module.exports = function(v, symbol = 'ꝁ') {
  return `${symbol} ${(+v).toLocaleString('en-US')}`;
}

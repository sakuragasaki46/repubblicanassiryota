module.exports = function(s){
  const matchObj = s.match(/(\d+(?:\.\d*)?)(s|m|h|d|w|mo|y)/i);
  
  if (!matchObj) return null;

  const [ n, suffix ] = matchObj.slice(1, 3);

  return n * ({
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    mo: 30 * 24 * 60 * 60 * 1000,
    y: 365 * 24 * 60 * 60 * 1000
  }[suffix]);
};

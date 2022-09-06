module.exports = function(msg){
  return msg.replace(/@everyone|@here|<@[!&]?\d+>/g, '');
}

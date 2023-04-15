const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  if (options.addition === null) {
    options.addition = options.addition + "";
  }
  let innerArr = [];
  innerArr.push(
    str +
      Array(options.additionRepeatTimes)
        .fill(options.addition)
        .join(options.additionSeparator || "|")
  );
  return Array(options.repeatTimes)
    .fill(innerArr)
    .join(options.separator || "+");
}

module.exports = {
  repeater
};

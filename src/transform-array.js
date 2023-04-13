const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  if (Array.isArray(arr) === false) {
    throw new Error("'arr' parameter must be an instance of the Array!")
  } else if (arr.length === 0) {
    return []
  }

  const result = []
  let prevSequence = true
  
  for (let i = 0; i < arr.length; i++) {

    if ((arr[i] === '--discard-next' || arr[i] === '--double-next' || arr[i] === '--discard-prev' ||arr[i] === '--double-prev') && prevSequence === false) {
      prevSequence = true
      continue
    }

    if (arr[i] === '--discard-next' && arr[i+1] && prevSequence) {
      i++
      prevSequence = false
      continue;
    } else if (arr[i] === '--discard-next' && !arr[i+1]) {
      continue;
    }
    
    if (arr[i] === '--double-next' && arr[i+1]) {
      result.push(arr[i+1])
      prevSequence = false
      continue;
    } else if (arr[i] === '--double-next' && !arr[i+1]) {
      continue;
    }

    if (arr[i] === '--discard-prev' && arr[i-1]) {
      result.pop()
      prevSequence = false
      continue;
    } else if (arr[i] === '--discard-prev' && !arr[i-1]) {
      continue;
    }

    if (arr[i] === '--double-prev' && arr[i-1] && prevSequence) {
      result[i] = result[result.length - 1]
      prevSequence = false
      continue;
    } else if (arr[i] === '--double-prev' && !arr[i-1]) {
      continue;
    }
    result.push(arr[i])
    prevSequence = true
  }
  return result
}

module.exports = {
  transform
};

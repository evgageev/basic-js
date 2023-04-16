const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(type) {
    this.type = type
  }

  encrypt(message, key, type) {
    if (!message || !key) {
      throw new NotImplementedError('Incorrect arguments!');
    }
    function checkLetter(letter) {
      let l = letter.charCodeAt();
      if ((l >= 65 && l <= 90) || (l >= 97 && l <= 122)) {
        return true;
      } else {
        return false;
      }
    }
    
    let cypher = "";
    for (let i = 0, j = 0; i < message.length; i++) {
      let currentLetter = message[i].toUpperCase();
  
      if (checkLetter(currentLetter)) {
        let upperLetter =
          (currentLetter.charCodeAt() -
            65 +
            (key[j % key.length].toUpperCase().charCodeAt() - 65)) %
          26;
        cypher += String.fromCharCode(upperLetter + 65);
        j++;
      } else {
        cypher += currentLetter;
      }
    }
    if (type === false) {
      return cypher.split().reverse().join();
    }
    return cypher;
  }

  decrypt(cypher, key, type) {
    if (!cypher || !key) {
      throw new NotImplementedError('Incorrect arguments!');
    }
    function checkLetter(letter) {
      let l = letter.charCodeAt();
      if ((l >= 65 && l <= 90) || (l >= 97 && l <= 122)) {
        return true;
      } else {
        return false;
      }
    }

    let message = "";
    for (let i = 0, j = 0; i < cypher.length; i++) {
    let currentLetter = cypher[i].toUpperCase();

    if (checkLetter(currentLetter)) {
      let upperLetter =
        90 -
        ((25 -
          (currentLetter.charCodeAt() -
            key[j % key.length].toUpperCase().charCodeAt())) %
          26);
      message += String.fromCharCode(upperLetter);
      j++;
    } else {
      message += currentLetter;
    }
  }
  if (type === false) {
    return message.split().reverse().join();
  }
  return message;
  }
}

module.exports = {
  VigenereCipheringMachine
};

export default class Sender {
  _fin = 0; // 'finished' bit
  _message = '';
  _messageToArray(message) {
    if (typeof message === 'string') return message.split('');
    return message;
  }

  constructor(message) {
    this._message = this._messageToArray(message);
  }
  send(sequence) {
    console.log('Sent: ', `'${sequence}'`);
  }
}

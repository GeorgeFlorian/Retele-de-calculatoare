export default class Receiver {
  _window_size = 0;
  _received_message = '';
  _ack = 0;

  constructor(window_size) {
    this._window_size = window_size;
  }

  receive(acknowledged) {
    console.log('acknowledged:', `'${acknowledged}'`);
    this._received_message += acknowledged;
    this._ack = 1;
  }

  displayReceivedMessage() {
    console.log(`Received message: '${this._received_message}'`);
  }
}

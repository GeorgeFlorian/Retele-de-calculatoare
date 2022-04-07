import Sender from './sender';
import Receiver from './receiver';
import Network from './network';

const init = function () {
  const message = 'this is a message!';
  const window_size = 4;

  const sender = new Sender(message);
  const receiver = new Receiver(window_size);

  const network = new Network();
  network.establishConnection(sender, receiver);
};

init();

/*
Alternativa pentru tema 2:

Sa se implementeze modelul de comunicare intre doua calculatoare folosind metoda Ferestrei Glisante.

Se dau 2 calculatoare:
  @Unul dintre ele este `sursa` (totat cu S)
  @celalalt `destinatie` (notat cu D).

`Sursa` va avea un mesaj pe care doreste sa il trimita `destinatiei` (Mesajul poate fi un sir de caractere).
`Sursa` va trimite din acel mesaj catre `destinatie` secvente de caractere
de dimensiunea ceruta de calculatorul `destinatie`.

Cand termina de trimis tot mesajul, `sursa` va egala bitul FIN cu 1
si se va incheia conexiunea dintre cele 2 calculatoare,
iar destinatia va afisa mesajul complet pe care l-a primit de la `sursa`.

Daca la final (la ultimul mesaj transmis de `sursa`)
`sursa` nu mai are de transmis atatea caractere cate a cerut destinatia (prin valoarea lui window_size),
atunci trimite cate caractere are si apoi egaleaza bitul FIN cu 1.

Valoarea lui x se va modifica astfel:
  @S->D x va reprezenta nr de caractere transmise pana la acel moment
  @D->S x va reprezenta incrementarea cu o unitate a valorii lui x de la ultimul mesaj primit de la `sursa`.
*/

export default class Network {
  _x = 0;
  _buffer = [];
  _sender;
  _receiver;

  _displayPacket() {
    console.log(
      'x:',
      this._x,
      ', ack:',
      this._receiver._ack,
      ', f:',
      this._receiver._window_size
    );
  }

  _updateConnection() {
    // Trimite bufferul
    this._sender.send(this._buffer.join(''));
    this._displayPacket();
    // Primeste bufferul
    this._receiver.receive(this._buffer.join(''));
    // D->S , x va reprezenta incrementarea cu o unitate a valorii lui x de la ultimul mesaj primit de la `sursa`.
    this._x += 1;
    this._displayPacket();
  }

  establishConnection(sender, receiver) {
    this._sender = sender;
    this._receiver = receiver;

    console.log('Connection established !');
    // take sender message
    console.log(this._sender._message);
    // take receiver window size
    console.log('window size:', this._receiver._window_size);

    while (this._sender._fin !== 1) {
      for (let i = 0; i < this._sender._message.length; i++) {
        // console.log('sent:', this._sender._message[i]);

        // S->D , x va reprezenta nr de caractere transmise pana la acel moment
        this._x += 1;

        // Trimite mesajul in pachete de dimensiunea ferestrei
        // Introducem in buffer elemente din mesaj pana la dimensiunea ferestrei
        this._buffer.push(this._sender._message[i]);
        // Daca indexul are o valoare mai mare sau egala cu dimensiunea ferestrei
        if (i >= this._receiver._window_size - 1) {
          // Daca bufferul nu este plin continuam iteratia
          if (this._buffer.length !== this._receiver._window_size) continue;
          // Daca bufferul s-a umplut trimite secventa de caractere
          this._updateConnection();
          // Reseteaza buffer-ul
          this._buffer.splice(0);
          // Reseteaza statusul de acknowledged
          this._receiver._ack = 0;
        }
      }
      // daca `sursa` nu mai are de transmis atatea caractere cate a cerut destinatia
      // adica daca dimensiunea ferestrei este mai mare decat numarul de elemente ramase in mesaj
      // atunci trimite caracterele ramase
      this._updateConnection();

      // egaleaza bitul FIN cu 1
      this._sender._fin = 1;
    }
    this._receiver.displayReceivedMessage();
    console.log('');
    console.log('Connection ended !');
  }
}

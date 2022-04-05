/*
2. CRC(Cyclic Redundancy Code)

Se introduce un sir de caractere binare (`mesajul`) si un polinom generator (cu coeficienti 0 si 1).

Se fac urmatoarele verificari:
@ sirurile sa fie binare;
@ lungimea `mesajului` sa fie mai mare decat numarul de coeficienti ai polinomului generator;

Se extinde mesajul cu un numar de 0-uri egal cu gradul polinomului introdus.
Se efectueaza succesiv operatii de XOR intre mesajul extins si coeficientii polinomului pana cand lungimea restului obtinut este strict mai mica decat lungimea sirului de coeficienti.
Se vor afisa rezultatele intermediare ale operatiei de XOR.
Se executa iarasi operatia de XOR intre mesajul extins si restul final obtinut.
Pozitionarea restului se va face sub finalul mesajului extins. Acest rezultat se va afisa.

*/

/*

    1111 1001

    x3 x2 1 -> x1=0 -> 1101  -> grad 3
    __________________________
    extind mesajul initial: 1111 1001 `000` -> 11111001000

    11111001000
    1101
    ------------


    
    --------------------------
    1 1111 0100 1000

*/

const toBinary = function (number) {
  return number.toString(2);
};
const toDecimal = function (binary) {
  return parseInt(binary, 2);
};
const xor = function (a, b) {
  return a ^ b;
};

// crc(mesaj, polinom)
export const crc = function (mesaj, polinom) {
  // mesaj = '10010101'
  const mesaj_extins = mesaj.padEnd(mesaj.length + polinom.length - 1, '0');
  // polinom = '1001';
  let rest_binary = mesaj_extins;
  // rest_binary = '10010101000'
  const polinom_dec = toDecimal(polinom);
  let resultat = 0;

  while (rest_binary.length >= polinom.length) {
    const first4bytes = rest_binary.slice(0, polinom.length);
    console.log('first4bytes', first4bytes);

    const mesaj_dec = toDecimal(first4bytes);

    const resultat_dec = xor(mesaj_dec, polinom_dec);
    console.log(
      'resultat_dec',
      toBinary(resultat_dec).padStart(polinom.length, '0')
    );
    // inlocuiesc primii 4 biti cu rezultatul_dec
    rest_binary = toBinary(resultat_dec) + rest_binary.slice(polinom.length);
    // Eliminam 0-urile de la inceput
    rest_binary = toDecimal(rest_binary);
    rest_binary = toBinary(rest_binary);
    console.log(rest_binary);
  }

  return toBinary(toDecimal(mesaj_extins) ^ toDecimal(rest_binary)); // 100 1010 0001
};

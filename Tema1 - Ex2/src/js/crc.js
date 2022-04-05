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

const toBinary = function (number) {
  return number.toString(2);
};
const toDecimal = function (binary) {
  return parseInt(binary, 2);
};
const xor = function (a, b) {
  return a ^ b;
};

const addToMarkup = function (text) {
  text += text;
  return text;
};

// crc(mesaj, polinom)
export const crc = function (mesaj, polinom) {
  let html = '';
  html += `<p>Mesaj: <span>${mesaj}</span></p>`;
  html += `<p>Polinom generator: <span>${polinom}</span></p>`;
  const mesaj_extins = mesaj.padEnd(mesaj.length + polinom.length - 1, '0');
  html += `<p>Mesaj extins: <span>${mesaj_extins}</span></p>`;
  let rest_binary = mesaj_extins;
  html += `<br>`;
  html += `<p>${rest_binary}</p>`;
  const polinom_dec = toDecimal(polinom);
  let extra_space = `&nbsp;`;
  while (rest_binary.length >= polinom.length) {
    html += `<p style="border-bottom: 5px solid red;">${polinom}</p>`;
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
    html += `<p>${rest_binary}</p>`;
    // console.log(rest_binary);
  }

  html += `<p>R(x) = ${rest_binary}</p>`;
  html += `<br>`;

  const rezultat = toBinary(
    xor(toDecimal(mesaj_extins), toDecimal(rest_binary))
  );
  html += `<p><span style="width=1px;">Mesaj extins initial T(x):</span><span>${mesaj_extins}</span></p>`;
  html += `<p style="border-bottom: 5px solid red;">Rest R(x):<span style="width=1px;"></span><span>${rest_binary}</span></p>`;
  html += `<p><span style="width=1px;">Mesaj extins final T(x):</span><span>${rezultat}</span></p>`;

  return html;
};
// '11111001', '1101'

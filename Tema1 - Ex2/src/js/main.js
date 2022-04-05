import { crc } from './crc';

const genereazaHTML = function (matrice) {
  return `
        <div>
        ${matrice
          .map((linii) => {
            return `${linii.join(' ')}</br>`;
          })
          .join(' ')}
        </div>
    `;
};

const init = function () {
  console.log(crc('11111001', '1101'));
};

init();

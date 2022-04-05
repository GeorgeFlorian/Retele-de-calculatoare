import { type } from 'os';
import { multipluDe7, paritateBidimensionala } from './paritate';

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

const verificaInputul = function (value) {
  const binaryRegex = /^[0-1]+$/;
  mesaj.classList.remove('corect');
  if (isNaN(value)) {
    mesaj.innerText = 'EROARE: Sirul introdus include litere !!!';
    return false;
  }
  if (!value.match(binaryRegex)) {
    mesaj.innerText = 'EROARE: Sirul introdus nu este un numar binar !!!';
    return false;
  }
  if (!multipluDe7(value.length)) {
    mesaj.innerText = 'EROARE: Sirul introdus nu este un multiplu de 7 !!!';
    return false;
  }
  mesaj.classList.add('corect');
  mesaj.innerHTML = 'Sirul introdus este corect !</br> Rezultatul este: ';
  return true;
};

const init = function () {
  const form = document.getElementById('form');
  const rezultat = document.getElementById('rezultat');
  const mesaj = document.getElementById('mesaj');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const value = Object.fromEntries(new FormData(form));
    const sir = value.input;
    if (!verificaInputul(sir)) return;
    const matrice = paritateBidimensionala(sir);
    rezultat.innerHTML = genereazaHTML(matrice);
  });
};

init();
// 1011110011101111111010010000

import { crc } from './crc';

const genereazaHTML = function (html) {
  return `
        <div>
        </div>
    `;
};

const verificaInputul = function (value, sir) {
  const binaryRegex = /^[0-1]+$/;
  mesaj.classList.remove('corect');
  if (isNaN(value)) {
    mesaj.innerText = `EROARE: ${sir} introdus include litere !!!`;
    return false;
  }
  if (!value.match(binaryRegex)) {
    mesaj.innerText = `EROARE: ${sir} introdus nu este un numar binar !!!`;
    return false;
  }
  mesaj.classList.add('corect');
  mesaj.innerHTML = `Sirurile introduse sunt corecte !</br> Rezultatul este: `;
  return true;
};

const init = function () {
  const form = document.getElementById('form');
  const rezultat = document.getElementById('rezultat');
  const mesaj = document.getElementById('mesaj');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const input_data = Object.fromEntries(new FormData(form));
    const { mesaj_binar, polinom } = input_data;
    console.log(mesaj_binar, polinom);
    if (!verificaInputul(mesaj_binar, 'Mesajul')) return;
    if (!verificaInputul(polinom, 'Polinomul')) return;
    if (mesaj_binar.length < polinom.length - 1) {
      mesaj.classList.remove('corect');
      mesaj.innerText =
        'EROARE: Mesajul trebuie sa fie mai lung decat numarul de coeficienti ai polinomului generator !!!';
    }
    form.reset();

    rezultat.innerHTML = crc(mesaj_binar, polinom);
  });
};

init();
// '11111001', '1101'

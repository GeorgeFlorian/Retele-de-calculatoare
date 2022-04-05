export const multipluDe7 = function (numar) {
  if (numar % 7 !== 0) return false;
  return true;
};

const stabilesteParitatea = function (sir_binar) {
  let bit_par = 0;
  for (let i = 0; i < sir_binar.length; i++) {
    bit_par ^= sir_binar[i];
  }
  return bit_par;
};

const construiesteMatricea = function (sir_, calup) {
  return sir_
    .map((e, i) => (i % calup === 0 ? sir_.slice(i, i + calup) : null))
    .filter((e) => e);
};

const obtineColoane = function (matrice) {
  return matrice[0].map((_, index) => matrice.map((coloana) => coloana[index]));
};

export const paritateBidimensionala = function (sir) {
  const calup = 7;
  // Transformam string-ul primit intr-un array
  const sir_binar = sir.split('');
  // Construim matricea
  const matrice = construiesteMatricea(sir_binar, calup);
  // Obtinem coloanele
  const coloane = obtineColoane(matrice);

  //   console.log('matrice1:', matrice);
  //   console.log('coloane:', coloane);

  // Adaugam bitul de paritate la finalul fiecarei linii
  for (let i = 0; i < matrice.length; i++) {
    matrice[i].push(stabilesteParitatea(matrice[i]));
  }
  //   console.log('matrice2:', JSON.stringify(matrice));

  // Adaugam o linie goala
  matrice.push([]);
  // Adaugam bitul de paritate la finalul fiecarei coloane
  for (let i = 0; i < coloane.length; i++) {
    matrice[matrice.length - 1].push(stabilesteParitatea(coloane[i]));
  }
  // Adaugam bitul de paritate pentru linia si coloana create mai sus
  matrice[matrice.length - 1].push(
    stabilesteParitatea(matrice[matrice.length - 1])
  );
  // Returnam un array bidimensional
  return matrice;
};

// 1011110011101111111010010000

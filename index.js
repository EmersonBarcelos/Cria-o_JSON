const SisBanco = require('./modules/sisBanco')

console.log('Entrou')
const bancoObj = new SisBanco()
bancoObj.menu();
console.log('Saiu')
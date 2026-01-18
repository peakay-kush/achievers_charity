const bcrypt = require('bcryptjs');
const password = 'admin@achievers';
const hash = bcrypt.hashSync(password, 10);
console.log('Password:', password);
console.log('Hash:', hash);
console.log('Verification:', bcrypt.compareSync(password, hash));

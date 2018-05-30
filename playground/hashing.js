const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var message = 'i am user 3';
// var hash = SHA256(message).toString();

// console.log(hash);


////////

// var data = {
//     id: 10
// }
// var token = jwt.sign(data,"secret msg");
// console.log(token);
// var decoded = jwt.verify(token,"secret1 msg");
// console.log(decoded);


////////


var psw = "whatever";
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(psw,salt, (err,hash)=>{
        console.log(hash);
    })
});

var hashedPsw = "$2a$10$.wW0wZVfecK32wz8b8BZhuURLVfuKyteHsJEMkMI8fAOi4IMXuKPO";

bcrypt.compare(psw, hashedPsw, (err, res)=>{
   console.log(res); 
});
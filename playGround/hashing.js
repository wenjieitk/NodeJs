const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// let data = {
//     id: 10
// };

// let token = jwt.sign(data, '123abc')
// console.log(token);

// let decoded = jwt.verify(token, '123abc');
// console.log(decoded);

let password = '123abc';

// hasing password with bcrypt
bcrypt.genSalt(10, (err,salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash); 
    });
})

let hashedPassword = '$2a$10$22LEXj4NqNQB5kATbxcLTuOjckcEnymkyCtMzlr5YtOG4sD/0dJqS';

bcrypt.compare(password, hashedPassword, (error,res) =>{
    console.log(res);
    
}); 
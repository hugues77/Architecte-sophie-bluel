const formLogin = document.querySelector(".form-login");

formLogin.addEventListener("submit", (event) =>{
    event.preventDefault();

    let email = document.querySelector('input[name="email"]');
    let password = document.querySelector('input[name="password"]');

    // console.log(password.value);
    

})



// curl -X 'POST' \
//   'http://localhost:5678/api/users/login' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "email": "sophie.bluel@test.tld",
//   "password": "S0phie"
// }'
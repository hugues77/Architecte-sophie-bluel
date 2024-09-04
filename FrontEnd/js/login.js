const error = document.querySelector('.error');

async function ConnexionUser(dataUser) {
    try {
        // console.log(dataUser.emailUser); 

        //convertir les données user en JSON
        const dataUserJson = JSON.stringify(dataUser);
        // console.log(dataUserJson);

        //Appel de la fonction fetch
        await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: dataUserJson
        })
        .then(async response =>{
            const data = await response.json();
        //  console.log(data.token);
            if(response.status === 200){
                // error.style.display = 'block';
                // error.textContent = "connexion reussi";
                window.localStorage.setItem("token", data.token)
                // window.localStorage.setItem('userId', data.userId);

                //redirection
                window.location.href="index.html";
            }else{
                // alert('non pas de connexion')
                error.style.display = 'block';
                error.textContent = "identifiant incorrect";
            }
        })

        // console.log(dataUserJson);


    } catch (error) {
        console.log("Problème lors de l'appel de l'APi", error);
    }

}
const formLogin = document.querySelector(".form-login");

formLogin.addEventListener("submit", (event) => {
    //on bloque le comportement par defaut du navigateur
    event.preventDefault();

    //les donnees utilidateurs
    const dataUser = {
        email: event.target.querySelector('input[name="email"]').value.trim(),
        password: event.target.querySelector('input[name="password"]').value.trim()

    }

    //verifier les champs


    if ((dataUser.email === "" || dataUser.password === "")) {
        error.style.display = 'block';
        error.textContent = "Tous les champs sont requis. Merci"

    } else {
        // error.textContent = "vous etes connectés"

        ConnexionUser(dataUser);
    }


})



// curl -X 'POST' \
//   'http://localhost:5678/api/users/login' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "email": "sophie.bluel@test.tld",
//   "password": "S0phie"
// }'
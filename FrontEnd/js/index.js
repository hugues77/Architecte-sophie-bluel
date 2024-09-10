
// function pour Ajout des post 
async function AjoutPost() {
    try {
        //Recuperation des données depuis notre API
        const url = "http://localhost:5678/api/works";
        // console.log(url);
        const req = await fetch(url);
        const response = await req.json();

        // console.log(response);

        //parcourir mes post traveaux
        for (let i = 0; i < response.length; i++) {


            //Création des balises HTML
            const article = response[i];

            const figureElement = document.createElement("figure");
            const imageElement = document.createElement("img");
            const titleElement = document.createElement("figcaption");

            // const idPost = 

            //Associer les valeurs des articles respectifs
            imageElement.src = article.imageUrl;
            titleElement.innerText = article.title;

            //Rattacher nos balises a notre DOM
            const gallery = document.querySelector(".gallery");
            const containerElement = gallery.appendChild(figureElement);

            containerElement.appendChild(imageElement);
            containerElement.appendChild(titleElement);

            //injecter data id dans chaque post
            // figureElement.setAttribute('data-post', article.id);
            // console.log(article.id)
            // figureElement.addEventListener('click', () =>{
            //     alert(article.id);
            // })


            // //rattacher les elements au modal
            // const galleryModal = document.querySelector(".gallery-modal");
            // const containerElementModal = galleryModal.appendChild(figureElement);
            // containerElementModal.appendChild(imageElement);


        }

    } catch (error) {
        console.log('Problème lors de chargement des traveaux', error);
    }
}

// function pour Ajout des post modal
async function AjoutPostModal() {
    try {
        //Recuperation des données depuis notre API
        const url2 = "http://localhost:5678/api/works";
        // console.log(url);
        const req2 = await fetch(url2);
        const response2 = await req2.json();

        // console.log(response2);

        //parcourir mes post traveaux
        for (let i = 0; i < response2.length; i++) {


            //Création des balises HTML
            const articleModal = response2[i];

            const figureElementModal = document.createElement("figure");
            const imageElementModal = document.createElement("img");
            const iElement = document.createElement("i");

            //Associer les valeurs des articles respectifs
            imageElementModal.src = articleModal.imageUrl;
            // titleElementModal.innerText = article.title;

            //Rattacher nos balises a notre DOM


            //rattacher les elements au modal
            const galleryModal = document.querySelector(".gallery-modal");
            const containerElementModal = galleryModal.appendChild(figureElementModal);
            containerElementModal.appendChild(imageElementModal);
            containerElementModal.appendChild(iElement);

            iElement.classList.add("fa-regular", "fa-trash-can");

            const dataValue = articleModal.id;
            iElement.setAttribute('data-id', dataValue);

            //selectionner le bouton supprimer

            iElement.addEventListener('click', async function () {
                // alert('delete post :' + dataValue);
                await fetch("http://localhost:5678/api/works/" + dataValue, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${isLogin}`
                    }
                })
                    .then(response => {
                        //    console.log(response);
                        if (response.ok) {
                            // alert(`le traveaux n° ${dataValue} à été supprimé avec succès `);
                            // window.location.href="index.html";
                            //une fois supprimer le traveau, enlever le post dans le modal et le DOM
                            containerElementModal.innerHTML = "";

                        } else {
                            alert("Echec! une erreur est survenue")
                        }
                    })

            })


        }

    } catch (error) {
        console.log('Problème lors de chargement des traveaux', error);
    }
}
//function pour recuperer des catégories
async function RecupCateg() {
    try {
        //Recuperation des données depuis notre API
        const url = "http://localhost:5678/api/categories";
        // console.log(url);
        const categ = await fetch(url);
        const res = await categ.json();

        //parcourir mes post traveaux
        for (let i = 0; i < res.length; i++) {


            //Création des balises HTML
            const categories = res[i];

            const categElement = document.createElement("div");
            categElement.classList.add('filter');

            //Associer les valeurs des articles respectifs
            categElement.innerText = categories.name;

            //Rattacher nos balises a notre DOM
            const category = document.querySelector(".categories");
            const filterElement = category.appendChild(categElement);

            //creation de la liste des categories pour le select: Ajout photo (Modal)
            const allCategories = document.querySelector('form #all_categorie');
            const optionSelect = document.createElement("option");
            optionSelect.innerText = categories.name;
            optionSelect.value = categories.id;

            // optionSelect.appendChild(allCategories);
            allCategories.appendChild(optionSelect);


            //filtrer mes traveaux par categories
            const urlFilter = "http://localhost:5678/api/works";
            // console.log(url);
            const reqFilter = await fetch(urlFilter);
            const responseFilter = await reqFilter.json();

            categElement.addEventListener('click', function () {
                // const resCateg = responseFilter[i].category.name;
                const resCateg = categories.name;
                const filterTraveaux = responseFilter.filter(function (categ) {
                    return categ.category.name == resCateg;

                })
                //Effacer tous les traveaux dans le DOM
                document.querySelector('.gallery').innerHTML = "";

                //Afficher tous les post filtrés
                //parcourir mes post traveaux
                for (let i = 0; i < filterTraveaux.length; i++) {


                    //Création des balises HTML
                    const articleFiltres = filterTraveaux[i];

                    const figureElementFiltres = document.createElement("figure");
                    const imageElementFiltres = document.createElement("img");
                    const titleElementFiltres = document.createElement("figcaption");

                    //Associer les valeurs des articles respectifs
                    imageElementFiltres.src = articleFiltres.imageUrl;
                    titleElementFiltres.innerText = articleFiltres.title;

                    //Rattacher nos balises a notre DOM
                    const galleryFiltres = document.querySelector(".gallery");
                    const containerElementFiltres = galleryFiltres.appendChild(figureElementFiltres);

                    containerElementFiltres.appendChild(imageElementFiltres);
                    containerElementFiltres.appendChild(titleElementFiltres);

                }

            })


        }

    } catch (error) {
        console.log('Problème lors de chargement des categories', error);
    }
}
//btn filter tous
const filterTous = document.querySelector('.categories .filter_Tous');
filterTous.addEventListener("click", () => {
    //Effacer tous les traveaux dans le DOM
    document.querySelector('.gallery').innerHTML = "";
    AjoutPost();
})

//verifier si user est connecter
const isLogin = window.localStorage.getItem('token');
const loginItem = document.querySelector("ul .login_item");
if (isLogin) {
    loginItem.textContent = "logout";
    loginItem.classList.add('logout_item');

    //on affiche le bouton modifier post
    let showModal = document.querySelector("#portfolio .modif-tr");
    showModal.style.display = "block";
    //deconnexion utilisateur
    const logoutItem = document.querySelector("ul .logout_item");
    logoutItem.addEventListener('click', () => {
        window.localStorage.removeItem('token');
        window.location.href = "index.html";

    })

}

//function pour envoyer des fichier

async function SendTraveaux(token, formData) {

    await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    })
        .then(response => {
            // console.log(response);
            if (response.ok) {
                alert(`le projet a été ajouté avec succès. `);
                // window.location.href="index.html";
                // console.log('succèss')
                AjoutPost();


            } else {
                alert("Echec! une erreur est survenue ")
                // console.log('echec')
            }
        })
        .catch(error => {
            console.log("Une erreur s'est produite lors de l'envoie : ", error);
        })
}

//boite modal
let portfolio = document.querySelector("#portfolio");
const modifTrav = document.querySelector('.modif-tr');

const modalTrav = document.querySelector('section.gallery-photo');
const modalAjout = document.querySelector('section.ajout-photo');

const closeModalTrav = document.querySelector('.icon-x .fa-xmark');

const closeModalAjout = document.querySelector('.icons .fa-xmark');
const showModalTravBtn = document.querySelector('.icons .fa-arrow-left-long');

const modalBtn = document.querySelector('.modal-btn');



modifTrav.addEventListener('click', function () {
    modalTrav.style.display = "block";
    portfolio.classList.add('active');
})

closeModalTrav.addEventListener("click", function () {
    modalTrav.style.display = "none";
    portfolio.classList.remove('active');
})

closeModalAjout.addEventListener('click', () => {
    modalAjout.style.display = "none";
    portfolio.classList.remove('active');
})
showModalTravBtn.addEventListener('click', function () {
    modalTrav.style.display = "block";
    modalAjout.style.display = "none";
    portfolio.classList.add('active');
})
modalBtn.addEventListener('click', () => {
    modalAjout.style.display = "block";
    modalTrav.style.display = "none";
    portfolio.classList.add('active');
})


//function ajout photo dans notre API
const formAddFile = document.querySelector(".ajout-photo .add_gallery");
const imgContainer = document.querySelector(".ajout-photo .img-container");
const errorModal = document.querySelector(".form_error_modal");


const addFileInput = formAddFile.querySelector('#input-add-gallery');
const categFile = formAddFile.querySelector("#all_categorie");

const buttonSendFile = document.querySelector('.btn-valid');

// previsualisation image - preview image
const imageInput = document.getElementById('imageInput');
// const imageURL = URL.createObjectURL(imageInput);


imageInput.addEventListener('change', () =>{
    const uploadFile = imageInput.files[0];
    const imgPreview = document.createElement('img');
    
    imgPreview.src = URL.createObjectURL(uploadFile);
    console.log(imgPreview);
})


//activer le bouton valider; une fois que user ecrit dans l'input
addFileInput.addEventListener('keyup', () => {
    if (addFileInput.value.length > 0) {
        buttonSendFile.classList.add('active');

    } else {
        buttonSendFile.classList.remove('active');
    }
})

//traitement formulaire
formAddFile.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = addFileInput.value;
    const category = categFile.value;
    const image = imageInput.files[0];


    // console.log(image.name);

    // const formData_gallery = new FormData(formAddFile);



    // console.log(imageInput); 

    if (title === "" || category === "" || image == null) {
        // alert('remplir les champs svp');
        errorModal.style.display = "block";
        errorModal.textContent = "Remplir tous  les champs svp";

    } else {
        let imageType = image.type;
        let imageName = image.name;
        let imageSize = image.size;
        //on  verifie l'image
        if (imageSize > 4000000) {
            errorModal.style.display = "block";
            errorModal.textContent = "la taille du fichier ne doit pas depasser 4 Mo";

        } else if (!["image/jpeg", "image/png"].includes(imageType)) {
            errorModal.style.display = "block";
            errorModal.textContent = "le type du fichier n'est pas autorisé";

        } else {
            //envoie du fichier vers l'API  par la method POST
            let tokenUser = localStorage.getItem('token');
            const formData = new FormData();

            formData.append("title", title);
            formData.append("category", category);
            formData.append("image", image);

            // console.log(tokenUser);

            //on exécute la fonction
            const final = SendTraveaux(tokenUser, formData);
            if(final){
                modalAjout.style.display = "none";
                portfolio.classList.remove('active');

                // document.querySelector('.gallery').innerHTML = "";

                // AjoutPost();
                // console.log('super!')
            }
        }
    }
    


})





AjoutPost();
AjoutPostModal();
RecupCateg();




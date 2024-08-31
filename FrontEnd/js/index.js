// import { AjoutPost } from "./functions";
// alert('toto');
// console.log('toto');
// const article = AjoutPost();


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

            //Associer les valeurs des articles respectifs
            imageElement.src = article.imageUrl;
            titleElement.innerText = article.title;

            //Rattacher nos balises a notre DOM
            const gallery = document.querySelector(".gallery");
            const containerElement = gallery.appendChild(figureElement);

            containerElement.appendChild(imageElement);
            containerElement.appendChild(titleElement);

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
            // const btnSuppr = document.querySelectorAll('.gallery-modal i');

            // for(let p=0; p < btnSuppr.length; p++){
            iElement.addEventListener('click', async function () {
                // alert('delete post :' + dataValue);
                const postDelete = await fetch("http://localhost:5678/api/works/" + dataValue, {
                   method: "DELETE"
                })
                .then((response) => alert('traveaux n° '+dataValue + ' a été supprimer avec succès.'))
                console.log(postDelete);
            })
            // }



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

            // verifier si dans la liste des catégories, il y a pas 'tous' et cree la categorie tous


            //Rattacher nos balises a notre DOM
            const category = document.querySelector(".categories");
            const filterElement = category.appendChild(categElement);

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

//boite modal
const modifTrav = document.querySelector('.modif-tr');
const modalTrav = document.querySelector('section.modal-photo');
const closeModalTrav = document.querySelector('.fa-xmark');

modifTrav.addEventListener('click', function () {
    modalTrav.style.display = "block";
})

closeModalTrav.addEventListener("click", function () {
    modalTrav.style.display = "none";

})



AjoutPost();
AjoutPostModal();
RecupCateg();




// import { AjoutPost } from "./functions";
// console.log('toto');
// const article = AjoutPost();


//function pour Ajout des post
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
        }

    } catch (error) {
        console.log('Problème lors de chargement des traveaux', error);
    }
}
AjoutPost();

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

            // if(categElement != 'All'){
            //     let categAll = categElement.innerHTML = 'Tous';
            //     category.appendChild(categAll);
            // }






        }

        //filtrer mes traveaux par categories
        const btnFilterAll = document.querySelectorAll(".categories .filter");

        // for (let i = 0; i < btnFilterAll.length; i++) {
        //     btnFilterAll[i].addEventListener("click", function () {
        //         const filterTraveaux = res.filter(function (categ) {
        //             return categ.name = res.name;

        //         })
        //         document.querySelector('.gallery').innerHTML = "";
        //         // AjoutPost();

        //     })
        // }

        //  console.log(btnFilterAll);

        //Ajout bouton TOUS
        // let tabTous = [
        //     {
        //     'id':4,
        //     'name':'Tous'
        //     }
        // ]
        // let newTab = res.push(tabTous);
        // console.log(newTab);

    } catch (error) {
        console.log('Problème lors de chargement des categories', error);
    }
}



RecupCateg();




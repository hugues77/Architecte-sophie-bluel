//function pour Ajout des post
export async function AjoutPost() {
    try {
        //Recuperation des données depuis notre API
        const url = "http://localhost:5678/api/works";
        console.log(url);
        const req = await fetch(url);
        const response = req.json();

        console.log(response);

        //parcourir mes post traveaux
        for (let i = 0; i < response.lenght; i++) {
            const traveaux = response[i];
        }
    } catch (error) {
        console.log('Problème lors de chargement des traveaux', error);
    }
    return traveaux;
}
export function ajoutListenersAvis() {

    const piecesElements = document.querySelectorAll(".fiches article button");
 
    for (let i = 0; i < piecesElements.length; i++) {
 
     piecesElements[i].addEventListener("click", async function (event) {
 
        const id = event.target.dataset.id;
        // const reponse = await fetch("http://localhost:8081/pieces/" + id + "/avis");
        // const avis = await reponse.json();
        
        const avis = await fetch("http://localhost:8081/pieces/"+ id + "/avis").then(reponse=>reponse.json(),function(){console.log("raté!")});
               
        
        const pieceElement = event.target.parentElement;

        const avisElement = document.createElement("p");
        for (let i = 0; i < avis.length; i++) {
            avisElement.innerHTML += `<b>${avis[i].utilisateur}:</b> ${avis[i].commentaire} <br> ${avis[i].nbEtoiles} étoiles <br>`;
        }
        pieceElement.appendChild(avisElement);
 
     });
 
    }
 
 }

 export function ajoutListenerEnvoyerAvis() {

    // Séquence pour repérer le formulaire (dont la class="formulaire-avis") afin de lui définir un EventListener
    const formulaireAvis = document.querySelector(".formulaire-avis");
    formulaireAvis.addEventListener("submit", function (event) {  // A noter : l'Event est "submit"
    
        // Désactivation du comportement par défaut du navigateur (qui ferait recharger la page et donc ferait
        // resetter le formulaire, donc perdre l'avis enregistré ?)
        event.preventDefault();

        // Création de l’objet du nouvel avis.
        const avis = { // A noter : les sélecteurs utilisés dans .querySelector()
            //pieceId: parseInt(event.target.querySelector("[name=piece-id]").value), <--- pourquoi le parseInt ici ? (ça marche sans)
            pieceId: event.target.querySelector("[name=piece-id]").value, 
            utilisateur: event.target.querySelector("[name=utilisateur]").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
            nbEtoiles: event.target.querySelector("[name=nb-etoiles]").value,
        };

        // Création de la charge utile au format JSON
        //const chargeUtile = JSON.stringify(avis);   // JSON.stringify fait l'inverse de .json()

        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(avis)    //chargeUtile   <--- le cours passe par la variable chargeUtile, mais c'est inutile
            }
        );

        fetch("http://localhost:8081/avis/32", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
            }
        );
    });
 }
 
 
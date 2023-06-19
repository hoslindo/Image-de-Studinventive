/* POUR LE DEBUG */ 
let solution="perso";  // si "cours" --> solution proposée dans le cours, sinon --> solution alternative
function DEBUG(texte) {if (true) console.log(texte)} // pour le debug

export function ajoutListenersAvis() {

    // 1. On récupère toutes les références aux conteneurs du DOM de la classe "fiches article button"
    // dans un tableau.
    const piecesElements = document.querySelectorAll(".fiches article button");
    // 2. On parcoure le tableau pour :
    for (let i = 0; i < piecesElements.length; i++) {
      // Lancer un EventListener("click") sur chaque tel conteneurs
      piecesElements[i].addEventListener("click", async function (event) {  // event identifie l'origine de l'événement
            // "click" dans le DOM (i.e. le conteneur), à partir de quoi on peut récupérer la valeur de l'attribut
            const id = event.target.dataset.toto;  // data-toto de ce conteneur, qui a été fixée dans pièces.js à la
            // valeur du champ id de la bdd .json ; du coup on peut lancer une requête au serveur avec un chemin
            // différencié selon le bouton avis qui a été clické

            const etat=document.querySelector("#avisaffiche"+id);
            
            DEBUG("en amont du if then else")

            if (etat==null) { DEBUG("Entrée branche if");

              const reponse = await fetch("http://localhost:8081/pieces/"+id+"/avis");

              const avis = await reponse.json();

              event.target.textContent="Occulter les avis";
              const pieceElement = event.target.parentElement;


              if (solution==="cours") {
                /*  Solution du cours pour faire afficher les avis */
                const avisElement = document.createElement("p");
                avisElement.id=`avisaffiche`+ id;
                for (let i = 0; i < avis.length; i++) {
                  avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
                }
                pieceElement.appendChild(avisElement); 
              }
              
              else { DEBUG("recours à la solution alternative");
                /* Solution alternative qui écrit du code HTML dans <article> de la pièce concernée */               
                let code="";
                for (let i=0; i < avis.length; i++) {
                  code+=`${avis[i].utilisateur}: ${avis[i].commentaire} <br>`;
                }
                pieceElement.insertAdjacentHTML("beforeend",`<p id="avisaffiche`+ id +`">` + code + `</p>`);
              }
              
              console.log("contenu du conteneur :",pieceElement.innerHTML);



              DEBUG("Sortie if");
          } 
          else { DEBUG("Entrée else");

              event.target.textContent="Afficher les avis";
              etat.remove();

              DEBUG("Sortie else");
          }
          DEBUG("en aval du if then else")  
      });
    }
}
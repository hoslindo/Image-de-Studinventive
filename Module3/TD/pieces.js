/*---------------------------------Code exécuté au chargement de la page web-------------------------*/


/*--------------------------------------CONSTANTES DU CODE-------------------------------------------*/

// Récupération dans la constante pieces des éléments qui sont en bdd dans le fichier pieces-autos.json
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json(); // pieces est un tableau

// Récupération de la référence JS à la balise qui doit servir de parent aux balises qui seront
// créées pour chaque pièce, à savoir celle qui porte l'attribut class "fiches".
const sectionFiches = document.querySelector(".fiches");  // <--la syntaxe est celle du CSS

// Récupération de la référence JS à la balise de la réglette (balise <input type="range"> pour
// pouvoir en récupérer le réglage
const reglette = document.querySelector("#prix-range");

// Récupération de la référence JS à la balise de témoin du niveau de la réglette pour
// pouvoir y afficher le niveau de la réglette
const temoinPrixMax=document.querySelector("#prixMax");

// Récupération de la référence JS à la balise du bouton de tri par prix croissant
const boutonTrierUp = document.querySelector(".btn-trierup");
// Récupération de la référence JS à la balise du bouton de filtrage par prix max
const boutonFiltrerPrix = document.querySelector(".btn-filtrer-prix");
// Récupération de la référence JS à la balise du bouton de tri par prix décroissant
const boutonTrierDown = document.querySelector(".btn-trierdown");
// Récupération de la référence JS à la balise du bouton de filtrage par disponibilité
const boutonFiltrerDispo = document.querySelector(".btn-filtrer-dispo");
/*----------------------------------------FIN CONSTANTES-------------------------------------------*/

/*---------------------------------------VARIABLES DU CODE-----------------------------------------*/

// Le prix "abordable" ; initialisé à la valeur du milieu de la réglette
let prixMax=reglette.value;

// La liste des pièces "abordables" initialisée avec la valeur initiale de prixMax
let noms=triParPrix(prixMax);  
/*-----------------------------------------FIN VARIABLES-------------------------------------------*/

// Renseignement initial du témoin du niveau de la réglette
temoinPrixMax.innerText=prixMax;

// Affichage des ebcarts des pièces dans le grid de .fiches
genererPieces(pieces,noms);

/*---------------------------Fin du code exécuté au chargement de la page web----------------------*/


/*-----------------------------------FONCTIONS (routines) DU CODE----------------------------------*/

// Fonction de tri des pièces pour constituer une liste des noms des pièces "abordables", i.e.
// excluant celles de prix > prixMax. La fonction retourne la liste (un tableau) des noms des
// pièces ; elle présuppose l'existence du tableau pieces accessible en tant que variable globale.
function triParPrix(prix){
    let listeNoms = [];
    for (let i of pieces) {
        if (i.prix <= prix) { listeNoms.push(i.nom) }
    }
    return listeNoms
}

// Fonction constituant la branche de DOM pour l'affichage de la liste des pièces "abordables"
function ListeDesPiecesAbordables(listeDesNoms){
    // Création de la branche de DOM pour afficher les pièces "abordables" :
    // 1/ Création de la balise liste (i.e. <ul>) :
    const abordablesElements = document.createElement('ul');
    // 2/ Création de la balise élément de liste (i.e. <li>) pour chaque pièce
    // "abordable" en tant qu'enfant de la balise <ul> grâce à une boucle for :
    for(let i=0; i < listeDesNoms.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = listeDesNoms[i];
    abordablesElements.appendChild(nomElement)
    }
    // Insertion de cette branche de DOM dans le DOM du documents :
    document.querySelector('.abordables').appendChild(abordablesElements)
}

// Fonction constituant la branche de DOM pour l'affichage :
// 1) de la liste des pièces "abordables" dans la première case du grid .fiches
// 2) d'une pièce (la première de listeDesPieces) dans la deuxième case du grid .fiches
// 3) d'une pièce (la deuxième de listeDesPieces) dans la troisième case du grid .fiches
// 4) à N) etc.
// listeDesPieces est un tableau de pieces, tel qu'issu de la bdd JSON, éventuellement trié ou filtré
// listeDesNoms est un tableau de pieces.nom (un tableau de string) issu du tri selon le prix
function genererPieces(listeDePieces,listeDeNoms){
    // 1) :
    // Réinitialisation de balise parent de la branche de DOM, de façon à provoquer un
    // rechargement de la page web ; la réinitialisation réécrit ce qui s'y trouve déjà de
    // sorte que la fonction ListesDesPiecesAbordables puisse procéder au rattachement de
    // la branche de DOM
    sectionFiches.innerHTML = "<div class='abordables'>Pièces abordables:</div>";
    // Constitution et rattachement de la branche de DOM pour l'affichage de la liste des pièces
    // "abordables" par l'appel à la fonction
    ListeDesPiecesAbordables(listeDeNoms);

    // 2) à N) :
    for (let article of listeDePieces) {
    /* -----------------------------------------------------------------------------------------
    Pour chaque éléments (='article') du tableau listeDePieces, il faut :

    A/  Créer les balises du DOM qui vont réaliser le rendu des éléments (les pièces) du tableau
        listeDePieces. Il a été choisi ici de constituer pour chaque pièce un encart matérialisé
        en HTML par une balise <article>, qui a comme balises enfants une balise <img> pour
        l'image de l'élément, <h2> pour le nom de l'élément, <p> pour les autres items de l'élément.

    B/  Insérer ces balises créées pour un élément du tableau listeDePieces dans le DOM existant,
        i.e. celui qui est programmé dans le .html. Il a été choisi ici d'insérer les balises
        <article> créées dans le DOM en tant que enfants du conteneur .fiches dont la référence
        JS a été recueillie plus haut dans la constante sectionFiches.
        
        NB Le .css (style.css) inclut des instructions portant sur ces balises, même si 
           celles-ci ne sont pas présentent dans le .html initial (en l'occurrence index.html).

           Le conteneur .fiches est une balise <section class="fiches"></section>.
    ----------------------------------------------------------------------------------------- */

    // Pour chaque éléments (='article') du tableau listeDePieces :

    // Phase A : Création du code HTML pour l'élément 'article'
        
        // 1.1 Création de la balise <img> pour afficher l'image de l'article
        const imageElement = document.createElement("img");
        // 1.2 Assignation de l'attribut src (grâce à la méthode .src)
        imageElement.src = article.image;
        // Ce code JS assigne à imageElement le code HTML:
        // <img src='article.image'> 

        // 2.1 Création de la balise <h2> pour afficher le nom de l'article
        const nomElement = document.createElement("h2");
        // 2.2 Détermination de son contenu (grâce à la méthode .innerText)
        nomElement.innerText = article.nom;
        // Ce code JS assigne à nomElement le code HTML:
        // <h2>'article.nom'</h2>

        // 3.1 Création de la balise <p> pour contenir le prix de l'article
        const prixElement = document.createElement("p");
        // 3.2 Détermination de son contenu (grâce à la méthode .innerText)
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix <= prixMax ? "€" : "€€€"})`;  // syntaxe alternative pour: "Prix: " + article.prix + " €";
        // Ce code JS assigne à prixElement le code HTML:
        // <p>`Prix: ${article.prix} € (${article.prix < priMax ? "€" : "€€€"})`</p>

        // 4.1 Création de la balise <p> pour contenir la catégorie de l'article si elle existe 
        const categorieElement = document.createElement("p");
        // 4.2 Détermination de son contenu (grâce à la méthode .innerText)
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        // Ce code JS assigne à categorieElement le code HTML:
        // <p>'article.categorie ?? "(aucune catégorie)"'</p>

        // 5.1 Création de la balise <p> pour contenir la description de l'article si elle existe 
        const descriptionElement = document.createElement("div");
        // 5.2 Détermination de son contenu (grâce à la méthode .innerText)
        descriptionElement.innerText = article.description ?? "(aucune description)";
        // Ce code JS assigne à descriptionElement le code HTML:
        // <div>'article.description ?? "(aucune description)"'</div>
        
        // 6.1 Création de la balise <p> pour contenir la disponibilité de l'article 
        const stockElement = document.createElement("p");
        // 6.2 Détermination de son contenu (grâce à la méthode .innerText)
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        // Ce code JS assigne à stockElement le code HTML:
        // <p>'article.disponibilite ?? "En stock" : "Ruptude de stock"'</p>
        
    // Phase B : Insertion du code HTML ainsi créé dans le DOM du .html
    
        // 1 Création de la balise <article> destinée à être le parent des balises précédemment
        // créées pour chaque article de pieces
        const pieceElement = document.createElement("article");

        // 2 Affectation des balises créées en tant qu'enfants de la balise <article>
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);

        // 3 Affectation de la balise <article> ainsi créée en tant qu'enfant de sectionFiches 
        sectionFiches.appendChild(pieceElement);

    }
}
/*----------------------------------------FIN FONCTIONS-------------------------------------------*/


/*------------------------- MISE EN PLACE DES TRAITEMENTS D'ÉVÉNEMENTS----------------------------*/

// Événement : action sur la réglette
// Cet événement doit provoquer la mise à jour du témoin de réglette, et la mise à jour de la liste
// dans la première case du grid .fiche
reglette.addEventListener("input", function () {
    prixMax=reglette.value;
    temoinPrixMax.innerText=prixMax;
    noms=triParPrix(prixMax);
    genererPieces(pieces,noms);
    //console.log("noms :",noms);
})

// Événement clic sur le bouton trier par prix croissants
// Cet événement doit faire afficher les encarts des pièces dans le grid de .fiche selon
// l'ordre croissant des prix
boutonTrierUp.addEventListener("click", function () {
    const piecesTrieesUp = Array.from(pieces);
    piecesTrieesUp.sort(function (a, b) {
        return a.prix - b.prix;
    });
    genererPieces(piecesTrieesUp,noms);
    //console.log("pièces triées par prix ^ :",piecesTrieesUp);
})

// Événement clic sur le bouton filtrer par prix
// Cet événement doit exclure de l'affichage les encarts des pièces dont le prix est supérieur à prixMax
boutonFiltrerPrix.addEventListener("click", function () {
   const piecesFiltreesPrix = pieces.filter(function (piece) {
       return piece.prix <= prixMax;
   });
   //document.querySelector(".fiches").innerHTML = "";
   genererPieces(piecesFiltreesPrix,noms);
   //console.log("pièces au coût <=",prixMax," :",piecesFiltreesPrix);
})

// Événement clic sur le bouton trier par prix décroissants
// Cet événement doit faire afficher les encarts des pièces dans le grid de .fiche selon
// l'ordre décroissant de prix
boutonTrierDown.addEventListener("click", function () {
    const piecesTrieesDown = Array.from(pieces); // nécessaire car affectation par référence
    piecesTrieesDown.sort(function (a, b) {
        return b.prix - a.prix;
    });
    genererPieces(piecesTrieesDown,noms);
    //console.log("pièces triées par prix v :",piecesTrieesDown);
})

// Événement clic sur le bouton filtrer par disponibilité par prix croissants
// Cet événement doit faire afficher les encarts des pièces dans le grid de .fiche selon un ordre croissant
boutonFiltrerDispo.addEventListener("click", function () {
   const piecesFiltreesDispo = pieces.filter(function (piece) {
       return piece.disponibilite === true;
   }); 
   genererPieces(piecesFiltreesDispo,noms);
   //console.log("pièces disponibles :",piecesFiltreesDispo);
})
/*--------------------------------------FIN TRAITEMENTS ÉVÉNEMENTS-----------------------------------*/

   <h1>Clone Twitter</h1>
    <h2>Projet Passerelle 3 de la formation Rocket / Believemy</h2>
    <br />
    <h3>Les Consignes</h3>
    <ul>
      <li>connexion</li>
      <li>déconnexion</li>
      <li>
        création d'un tweet / sans besoin de faire fonctionner les hashtags et
        les mentions
      </li>
      <li>abonnement à un compte</li>
      <li>affichage des tweets des comptes</li>
      <li>affichage des profils</li>
      <li>partager un tweet</li>
      <li>répondre à un tweet</li>
      <li>supprimer un tweet</li>
    </ul>
    <br />
    <h3>Les technos utilisées :</h3>
    <p>
      Le projet tourne sur notre apprentissage de <b>React</b> qui reste au
      coeur de l'exercice.
    </p>
    <p>
      Pour des raisons de rapidité d'installation puis d'initialisation, nous
      utilisons ici <b>Vite</b>.
    </p>
    <p>Le style est géré par <b>Tailwind</b>.</p>
    <p>
      Le système d'authentification et de base de données utilisent
      <b>Firebase</b> Auth et RealTime.
    </p>
    <p>Les notifications par Toast sont régies par <b>Sonner</b>.</p>
    <p>Les stores passent par le package <b>Zustand</b>.</p>
    <p>
      La librairie <b>he</b> (pour html entities) décode les données reçues de
      l'api de la partie blog (à droite de l'écran en format pc)
    </p>
    <br />
    <h3>La logique pas à pas :</h3>
    <p>L'arborescence des fichiers est la suivante :</p>
    <img
      src="https://mycloud.barpat.fun/public/assets/Images/bureautique/DocCloneTwitter/tree-condensed.png"
      alt="tree"
    />
    <br />
    <p>L'arborescence déployée :</p>
    <img
      src="https://mycloud.barpat.fun/public/assets/Images/bureautique/DocCloneTwitter/tree.png"
      alt="tree"
    />
    <br />
    <h3>Les fichiers de bases</h3>
    <h4>- main.jsx</h4>
    <p>
      notre fichier racine : renvoie le composant App englobé dans un provider
      (UserContextProvider)
    </p>
    <p>Ce provider gère en grande partie l'utilisateur connecté.</p>
    <h4>- App.jsx</h4>
    <p>
      notre composant principal : il englobe les routes et les composants
      principaux.
    </p>
    <p>
      Il renvoie la bonne données au travers de notre Layout ou renvoie la page
      d'erreur au besoin.
    </p>
    <h4>- firebase-config.js :</h4>
    <p>Le lien entre notre application et Firebase</p>
    <p>Contient également en constante l'URL de notre projet sur Firebase</p>
    <p>
      Cette URL est utilisée dans tout notre projet. En cas de changement de DB,
      un seul changement sera ici nécessaire.
    </p>
    <p>
      Pour des soucis évidents de sécurité, les clés sont conservées dans un
      fichier .env.local
    </p>
    <h4>- le Context</h4>
    <p>le fichier userContext.jsx est dans le dossier context</p>
    <p>Il hydrate l'application à partir de main.jsx.</p>
    <p>
      Il gère les données de connexion et permet de stockées les données de
      l'utilisateur connecté dans une SessionStorage.
    </p>
    <p>
      Ce choix a été fait pour éviter de solliciter la DB en permanence afin de
      gagner en fluidité.
    </p>
    <p>
      La déconnexion et la suppression du SessionStorage se gère également ici
    </p>
    <h4>- les stores</h4>
    <p>2 fichiers utilisés pour le moment</p>
    <p>
      <b>useModalStore.jsx</b> gère l'état des modales (enregistrement,
      connexion, écriture d'un tweet)
    </p>
    <p>
      <b>useTwitStore.jsx</b> gère l'état du tableau contenant les twit afin de
      devancer l'appel à la DB et gagner en fluidité.
    </p>
    <p>
      <b>[maj, setMaj]</b> est une dépendance liée à un useEffect rappelant
      l'ensemble des Tweets de la DB.
    </p>
    <br />
    <h3>L'affichage</h3>
    <h4>Le Layout</h4>
    <p>Notre affichage s'inspire simplement du site originel</p>
    <p><u>-En mode smartphone :</u></p>
    <p>
      une navbar (<b>Footer.jsx</b>) en bas d'écran avec un bouton sorti de la
      barre faisant apparaitre une modale destinée à l'écriture d'un tweet
    </p>
    <p><u>A partir de 640px de large :</u></p>
    <p>La navbar (<b>Header.jsx</b>) devient verticale à gauche de l'écran</p>
    <p>Seuls les logos apparaissent</p>
    <p><u>A partir de 1024px :</u></p>
    <p>
      Une barre verticale à droite apparait permettant d'ajouter du contenu.
    </p>
    <p>
      Pour l'exercice, j'envoie 4 articles aléatoirement de mon blog issu du
      projet passerelle 2.
    </p>
    <p><u>A partir de 1280px :</u></p>
    <p>La navbar se complète avec une annotation à coté des logos d'action.</p>
    <br />
    <p>
      <b>Tout ceci entoure la partie principale qui affiche les tweets !</b>
    </p>
    <br />
    <h4>La logique d'affichage des pages</h4>
    <p>le contenu affiché est stocké dans 3 dossiers :</p>
    <p><b>1) commonsComponents :</b></p>
    <p>
      Des composants réutilisables comme les cadres des Tweets / ReTweets, un
      loader.
    </p>
    <p>Les modales :</p>
    <ul>
      <li>
        <b>ModalConnection.jsx</b> pour permettre à l'utilisateur enregitré de
        se connecter.
      </li>
      <li>
        <b>ModalRegister.jsx</b> pour permettre l'inscription et accéder à plus
        de fonctionnalités.
      </li>
      <li>
        <b>ModalFormPost.jsx</b> pour permettre au connecté d'écrire un tweet.
      </li>
    </ul>
    chaque modal contient sa logique et son affichage.
    <p><b>2) private :</b></p>
    <p>contient les pages réservées aux personnes connectées.</p>
    <ul>
      <li>
        <b>favoritePage</b> affiche uniquement la liste des tweets des personnes
        suivies par l'utilisateur
      </li>
      <p>
        un composant NoFavorites indique que l'utilisateur ne suit actuellement
        personne.
      </p>
      <li>
        <b>profilPage</b> affiche les informations personnelles de
        l'utilisateur. Il peut :
      </li>
      <ul>
        <li>Supprimer son compte</li>
        <li>Voir et modifier son avatar</li>
        <li>Voir ses informations (mail et date d'inscription)</li>
        <li>Voir et modifier sa biographie</li>
        <li>Voir la liste des utilisateurs qu'il suit</li>
      </ul>
    </ul>
    <p><b>3) public</b></p>
    <p>contient les pages accessibles à tous</p>
    <ul>
      <li>
        <b>homePage</b> contient l'ensemble des tweets classées de manière
        antéchronologique.
      </li>
      <p>
        cliquer sur un nom pour voir la fiche info de l'utilisateur ainsi que
        tous les tweets de cet utilisateur.
      </p>
      <p>cliquer sur un tweet pour voir les commentaires.</p>
      <p>le connecté peut en plus :</p>
      <ul>
        <li>reTweeter un tweet</li>
        <li>supprimer un de ses propres tweets</li>
      </ul>
      <br>
      <li><b>oneTwit</b> affiche un tweet unique avec ses commentaires.</li>
      <p>le connecté peut en plus :</p>
      <ul>
        <li>ajouter un commentaire</li>
        <li>retweeter</li>
        <li>supprimer le tweet s'il en est l'auteur</li>
      </ul>
      <br>
      <li><b>allTwitsOfOneUser</b> contient la fiche info d'un utilisateur.</li>
      <p>le connecté pourra s'y abonner / désabonner</p>
      <p>S'en suit la liste de tous les tweets de l'utilisateur</p>
    </ul>
    <br>
    <p><b>Je voulais initilament entrer dans le détails de tous les composants et en expliquer le fonctinnement, les fonctions, les states... <br>mais je trouve déjà ce readme hautement imbuvable !😅</b></p>
    <p><b>On se limitera à ce document et à la vidéo de présentation :</b></p>
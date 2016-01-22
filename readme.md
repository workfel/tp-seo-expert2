# TP BLACK HAT
####### With Jeremy CAPO


# Documentation

##  wp-spam
C'est le module générique qui envoie un commentaire sur un site de type WORDPRESS. Avec une génération aléatoire 
d'un utilisateur depuis une API.

## CMMSSpamer

Le module casper CMMSSpamer.js permet d'envoyer un commentaire sur la page. Il utilise le module wp-spam.
Pour choisir le site il suffit de modifier les valeurs dans le fichier config.js.
1 . wpSiteToSpam : C'est le site à spammer
2 . wpCommentaireToSpam : C'est le commentaire
3 . ownWebSite : C'est le lien vers votre site pour générer des backlinks


Ensuite vous lancer le script.

```sh
 casperjs CMSSpamer.js
```

### Résultat

A la fin du script on renvoie un json pour l'utilisateur. 

```json
{
  "webSite": "http://framork.blogspot.fr/",
  "url": "https://framokbet.wordpress.com/2016/01/14/test-de-framok/",
  "user": "herbert mitchell",
  "email": "herbert.mitchell@example.com",
  "commentaire": "Le commentaire",
  "id": 1453452883856
}
```

webSite : C'est lien backlink
url : C'est l'adresse ou vous avez spammer
user : C'est le nom de la personne qui à commenter sur le site
email: C'est l'email de la personne qui à commenter sur le site
commentaite : C'est le commentaire envoyé
id : C'est l'identifiant de la capture d'écran généré.

Toute c'est information peuvent être utile pour un site web par exemple qui montrerai l'historique de
nos spam. Biensur un site non référencé :) .


## CMMSniffer

Le module casper CMSSniffer.js permet de faire une recherche google et d'envoyer un commentaire sur sa page.
Pour choisir la recherche il suffit de modifier les valeurs dans le fichier config.js.
1 . keyWord : C'est la recherche google
1 . CMSSnifferCommentaire : C'est le commentaire
3 . ownWebSite : C'est le lien vers votre site pour générer des backlinks

Ensuite vous lancer le script.

```sh
 casperjs CMSSniffer.js
```

Le script va retourner une liste de liens et chaques liens va lui même faire appel au script wp-spam. 
Donc envoyer des commentaires à tous les sites pour faire du backlink automatisé.

Il va créer un capture big-google.png qui montre le résultat de la recherche google.



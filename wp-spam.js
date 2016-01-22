/**
 * Created by johan on 14/01/2016.
 */


//var casperSpam = require("casper").create({
//    viewportSize: {width: 1200, height: 800}
//});
var config = require('./config');
var require = patchRequire(require);
var commentaire, contents;


function _spamWebSite(url, comment, cb) {

    //var promise = new Promise(function (resolve, reject) {

    try {


        var uuid = new Date().getTime();
        //var uuid = require('node-uuid');

        console.log('URL :', url);

        var casperSpam = require("casper").create({});
        var scrap = require('casper').create();

        var urlToSpam = url;
        var user = null;

        var allFields = {};
        allFields.webSite = config.ownWebSite;
        allFields.url = url;

        scrap.start().then(function () {
            this.open('http://api.randomuser.me/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
        });
        scrap.then(function () {
            contents = JSON.parse(scrap.getPageContent());

            user = contents.results[0].user;

            allFields.user = user.name.first + ' ' + contents.results[0].user.name.last;
            allFields.email = user.email;
            require('utils').dump(user.name);
        });

        //scrap.thenOpen('http://www.rouflaquette.com/easytrolling/');

        casperSpam.start(function () {
            this.viewport(1600, 1200);
        });

        casperSpam.start();
        casperSpam.userAgent('Mozilla/4.0 (compatible; MSIE 5.00; Windows 98)');
        casperSpam.thenOpen(urlToSpam);


        // depuis la première instance, on lance le 2eme casper qui va aller scraper un commentaire stupide
        casperSpam.then(function () {
            //commentaire = scrap.getHTML("div#container textarea");

            allFields.commentaire = comment;

            this.echo(allFields.commentaire);
        });

        casperSpam.then(function () {
            console.log("page loaded");
        });

        // on remplit le formulaire en tapant touche après touche, on utilise le sélecteur css3 pour la démo
        casperSpam.then(function () {

            //if (this.exists('form#commentform')) {
            this.fillSelectors('form#commentform', {
                'textarea[name="comment"]': allFields.commentaire,
                'input[name="email"]': allFields.email,
                'input[name="author"]': allFields.user,
                'input[name="url"]': allFields.webSite
            });
            //}


        });


        casperSpam.then(function () {


            this.click('#commentform input[type="submit"]');


            var id = uuid;
            allFields.id = id;
            this.capture(id + '.png');
            this.echo('Spam on ' + urlToSpam + ' finished');
            this.echo('------------------------------------------');
            //resolve(allFields);
            cb(allFields);

        });


        casperSpam.run(function () {
        });
        scrap.run(function () {
        });

        setTimeout(function () {
            casperSpam.exit();
        }, 5000);

    } catch (err) {
        throw  err;
    }

}


//_spamWebSite("http://un-week-end-une-recette.com/gateau-de-fruit-a-pain-au-gingembre-confit/", function (result) {
//_spamWebSite(config.wpSiteToSpam, config.wpCommentaireToSpam, function (result) {
//    console.log(JSON.stringify(result));
//});
//    .then(function(resule){
//    console.log(resule);
//})

module.exports.spamWebSite = _spamWebSite;
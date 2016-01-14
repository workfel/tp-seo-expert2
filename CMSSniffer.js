var links = [];
var casper = require('casper').create();
var fs = require('fs');
var config = require('./config');

var Promise = require('promise');


//casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

function getLinks() {
    var links = document.querySelectorAll('h3.r a');

    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href');
    });
}

casper.start('http://google.fr/', function () {
    // search for 'casperjs' from google form
    this.fill('form[action="/search"]', {q: config.keyWord}, true);

});

casper.then(function () {
    this.capture('big-google.png');

    // aggregate results for the 'casperjs' search
    links = this.evaluate(getLinks);
    // now search for 'phantomjs' by filling the form again
    //this.fill('form[action="/search"]', {q: 'powered by wordpress'}, true);
});

casper.then(function () {
    this.echo(links.length + ' links found:');

    _spam(links, function () {
        this.echo(' - finished ').exit();
    });


});

casper.run(function () {

});

//

function _spam(links, cb) {

    //var CMSSpamer = require('./CMSSpamer');
    //console.log("Begin to spam");
    // console.log(links.join('\n-'));

    var querystring = require('querystring');

    //var url = querystring.parse(links[0].split('/url?')[1]);

    //console.log(JSON.stringify(url.q));
    //cb();
    //_spamWebSite(url.q).then(function (result) {
    //    console.log(result);
    //    cb();
    //});

    try {

        var fitst = false;
        links.forEach(function (link) {


            if (!fitst) {
                fitst = true;
                var url = querystring.parse(link.split('/url?')[1]);

                //console.log(JSON.stringify(url.q));
                //console.log(url.q);

                _spamWebSite(url.q, function (result) {
                    console.log(JSON.stringify(result));
                });
            }

        });
    } catch (err) {
        console.log("ERROR");
        console.log(err);
    }


    //var allPromise = links.forEach(function (link) {
    //    _spamWebSite(link);
    //});
    //
    //Promise.all(allPromise).then(function (results) {
    //    console.log(results);
    //}, function errro(err) {
    //    console.log(err);
    //});


}

function _spamWebSite(url, cb) {

    //var promise = new Promise(function (resolve, reject) {

    try {

        var uuid = require('node-uuid');

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
        casperSpam.userAgent('Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8A293 Safari/6531.22.7');
        casperSpam.thenOpen(urlToSpam);


        // depuis la première instance, on lance le 2eme casper qui va aller scraper un commentaire stupide
        casperSpam.then(function () {
            //commentaire = scrap.getHTML("div#container textarea");

            allFields.commentaire = "Sympas ton site. J'adore!";

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


            //this.wait(2000, function () {
            //if (this.exists('#commentform input[type="submit"]')) {
            this.click('#commentform input[type="submit"]');


            var id = uuid.v1();
            allFields.id = id;
            this.capture(id + '.png');
            this.echo('Spam on ' + urlToSpam + ' finished');
            this.echo('------------------------------------------');
            //resolve(allFields);
            cb(allFields);
            //}
            //});
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

    //});

    //return promise;


}
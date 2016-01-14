var links = [];
var casper = require('casper').create();
var fs = require('fs');
var config = require('./config');

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

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
    this.echo(' - ' + links.join('\n - ')).exit();
});

//casper.then(function () {
//    // aggregate results for the 'casperjs' search
//    links = this.evaluate(getLinks);
//    // now search for 'phantomjs' by filling the form again
//    this.fill('form[action="/search"]', {q: 'laisser un message'}, true);
//});

//casper.then(function () {
//    // aggregate results for the 'phantomjs' search
//    //links = links.concat(this.evaluate(getLinks));
//});

casper.run(function () {
    // echo results in some pretty fashion
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});
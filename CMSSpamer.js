/**
 * Created by johan on 14/01/2016.
 */


//var casperSpam = require("casper").create({
//    viewportSize: {width: 1200, height: 800}
//});
var config = require('./config');
var require = patchRequire(require);

var Spammer = require('./wp-spam');


Spammer.spamWebSite(config.wpSiteToSpam, config.wpCommentaireToSpam, function (result) {
    console.log(JSON.stringify(result));
});

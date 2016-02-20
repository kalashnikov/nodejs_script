/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

/**
 * This script will capture a screenshot of a twitter account page
 * Usage: $ casperjs screenshot.js <twitter-account> <filename.[jpg|png|pdf]>
 */

var casper = require("casper").create({
    viewportSize: {
        width: 1024,
        height: 768
    }
});

var twitterAccount = casper.cli.get(0);
var filename       = casper.cli.get(1);

if (!twitterAccount || !filename || !/\.(png|jpg|pdf)$/i.test(filename)) {
    casper
        .echo("Usage: $ casperjs screenshot.js <twitter-account> <filename.[jpg|png|pdf]>")
        .exit(1)
    ;
}

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36');

casper.start("https://twitter.com/" + twitterAccount, function() {
    //this.waitForSelector("div.js-adaptive-photo[data-preloading='true']", (function() {
    //this.waitForSelector("div.permalink-tweet[data-screen-name='543life']", (function() {
    //this.waitForResource("div.AdaptiveMedia-photoContainer img", (function() {
    this.waitUntilVisible("div.AdaptiveMedia-photoContainer img", (function() {
        this.click(document.querySelector('div.AdaptiveMedia-photoContainer'));
        this.captureSelector(filename, "div.permalink-tweet-container");
        this.echo("Saved screenshot of " + (this.getCurrentUrl()) + " to " + filename);
    }), (function() {
        this.echo(casper.getElementInfo("div.AdaptiveMedia-doublePhoto").html);
        this.die("Timeout reached. Fail whale?");
        this.exit();
    }), 12000);
});

casper.run();

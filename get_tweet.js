var links = [];
var casper = require('casper').create();

//capture and captureSelector functions adapted from CasperJS - https://github.com/n1k0/casperjs
capture = function(targetFile, clipRect) {
  var clipRect = {top: 0, left:0, width: 40, height: 40};
  try {
    casper.page.render(targetFile);
  } catch (e) {
    console.log('Failed to capture screenshot as ' + targetFile + ': ' + e, "error");
  }
  return this;
}

captureSelector = function(targetFile, selector) {
  var selector = selector;
  return capture(targetFile, casper.page.evaluate(function(selector) {  
    try { 
      var clipRect = document.querySelector(selector).getBoundingClientRect();
      return {
        top: clipRect.top,
        left: clipRect.left,
        width: clipRect.width,
        height: clipRect.height
      };
    } catch (e) {
      console.log("Unable to fetch bounds for element " + selector, "warning");
    }
  }, { selector: selector }));
}


function genPNG() {
  address = phantom.args[0];
  casper.page.viewportSize = { width: 200, height: 200 };
  casper.page.paperSize = { width: 1024, height: 768, border: '0px' }
  captureSelector('1.png','div.permalink-tweet-container');
}

casper.start('https://twitter.com/543life/status/697397535669878784', function() {
  links = this.evaluate(genPNG);
});

casper.run(function() {


});

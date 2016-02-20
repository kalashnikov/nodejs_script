var casper = require('casper').create();

casper.start('http://sports.sina.com.cn/t/2014-02-26/08307041192.shtml')

casper.then(function(){
  this.echo(this.getHTML('#HdFigure1_1', true))
})

casper.run();

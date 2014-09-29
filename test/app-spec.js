var http = require('http'),
    assert = require('assert'),
    mocha = require('mocha')

var opts = {
  host: 'localhost',
  port: 3030,
  path: '/send',
  method: 'POST',
  headers: {'content-type':'application/x-www-form-urlencoded'}
}

var outerData = "";

var req = http.request(opts, function (res) {
  var data = "";
  res.setEncoding('utf8')
  res.on('data', function(d) {
    data += d;
    outerData = data;
  })
})

describe('Post', function(){
  describe('posting a tweet', function(){
    
    it('should return a success message when tweet is posted', function(){
      req.write('tweet=test');
      req.on('end', function(){ 
        assert.equal('{"status":"ok","message":"Tweet received"}', outerData);
      });
      req.end();
    });

    it('should return an error message when the tweet is empty', function(){
      req.write("tweet=");
      req.on('end', function () {
        assert.equal('{"status": "nok", "message": "no tweet received"');
      });
    });
  });
});



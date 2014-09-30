var http = require('http');
var assert     = require('assert');
var mocha    = require('mocha');
var chai       = require('chai')
var should     = chai.should();
var expect     = chai.expect;

var opts = {
  host: 'localhost',
  port: 3030,
  path: '/send',
  method: 'POST',
  headers: {'content-type':'application/x-www-form-urlencoded', 'access': 'application/json'}
}

var outerData = "";

var req = http.request(opts, function (res) {
  var data = "";
  res.setEncoding('utf8')
  res.on('data', function(d) {
    console.log(data);
    data += d;
    console.log(data);
    outerData = data;
    done();
  });
});

describe('posting a tweet', function(){
  it('should return a success message when tweet is posted', function(done){
    var testReq = http.request(opts, function (res) {
      res.setEncoding('utf8');
      res.on('data', function(d) {
        expect(d).to.equal('{"status":"ok","message":"Tweet received"}');
      done();
      })
    }) 
    testReq.write("tweet=hello");
    testReq.end();
  })
  


  it('should return an error message when the tweet is empty', function(done){
    var testReq2 = http.request(opts, function (res) {
        res.setEncoding('utf8');
        res.on('data', function(d) {
          expect(d).to.equal('{"status":"nok","message":"no tweet received"}');
        done();
        })
      }) 
      testReq2.write("tweet=");
      testReq2.end();
    });
});


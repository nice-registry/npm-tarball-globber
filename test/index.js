var assert = require('assert')
var getDocs = require('..')

describe("getFiles", function() {

  this.timeout(15000)

  it("creates an object with filenames as keys and contents as values", function(done){
    getDocs("domready", function(err, files){
      assert(!err)
      assert.equal(typeof(files), "object")
      assert(files["package/README.md"])
      assert(files["package/ready.js"])
      done()
    })
  })

  it("allows a glob as a second optional argument", function(done){
    getDocs("ghwd", "package/**/*.md", function(err, files){
      assert(!err)
      assert.equal(typeof(files), "object")
      assert(files["package/README.md"])
      assert(files["package/README.md"].match("# ghwd"))
      done()
    })
  })

})

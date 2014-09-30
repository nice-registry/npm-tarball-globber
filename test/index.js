var assert = require('assert')
var getDocs = require('..')

describe("getFiles", function() {

  this.timeout(15000)

  it("calls back with an object containing name, version, and files", function(done){
    getDocs("domready", function(err, pkg){
      assert(!err)
      assert.equal(typeof(pkg), "object")
      assert.equal(pkg.name, "domready")
      assert(pkg.version)
      assert(pkg.files)
      assert(pkg.files["README.md"])
      assert(pkg.files["ready.js"])
      done()
    })
  })

  it("creates an object with filenames as keys and contents as values", function(done){
    getDocs("once", function(err, pkg){
      assert(!err)
      assert(pkg.files["README.md"])
      done()
    })
  })

  it("allows a glob as a second optional argument", function(done){
    getDocs("ghwd", "**/*.md", function(err, pkg){
      assert(!err)
      assert(pkg.files["README.md"])
      assert(pkg.files["README.md"].match("# ghwd"))
      for (filename in pkg.files) {
        assert(!!filename.match(/\.md$/))
      }
      done()
    })
  })

})

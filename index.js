var fmt = require("util").format
var fs = require("fs")
var path = require("path")
var superagent = require("superagent")
var tarball = require("tarball-extract")
var glob = require("glob")

var getFiles = module.exports = function(packageName, globPattern, callback) {

  // globPattern is optional
  if (typeof globPattern === "function") {
    callback = globPattern
    globPattern = "**/*.*"
  }

  var registryUrl = fmt("https://registry.npmjs.org/%s", packageName)

  superagent.get(registryUrl, function(err, res) {
    if (err) return callback(err)

    var pkg = res.body
    var version = pkg["dist-tags"].latest
    var tarballUrl = pkg.versions[version].dist.tarball
    var tarballFilename = "/tmp/" + path.basename(tarballUrl)
    var tarballExtractionDir = tarballFilename
      .replace(".tar.gz", "")
      .replace(".tgz", "")

    tarball.extractTarballDownload(
      tarballUrl,
      tarballFilename,
      tarballExtractionDir,
      {},
      function(err, result) {
        glob(globPattern, {cwd: tarballExtractionDir}, function (er, filenames) {
          var files = {}
          filenames.forEach(function(filename) {
            files[filename] = fs.readFileSync(path.resolve(tarballExtractionDir, filename)).toString()
          })
          return callback(err, files)
        })
      }
    )

  })

}

var getFiles = require('./')

// Get all the files in the `minimist` package
getFiles("minimist", function(err, files){
  console.log(err, Object.keys(files))
})

// Use globs to load only the files you need.
// See https://github.com/isaacs/minimatch#usage
getFiles("npm", "package/html/**/*.html", function(err, files){
  console.log(err, Object.keys(files))
})

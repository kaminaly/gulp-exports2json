var gutil = require('gulp-util');
var through = require('through2');

module.exports = function (option) {

  function transform(file, encoding, callback) {
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-export2json', 'Streaming not supported'));
      return callback();
    }

    var obj = require(require('path').relative(__dirname, file.path));
    delete require.cache[file.path];
    if(!!(obj && obj.constructor && obj.call && obj.apply)){
      console.log('function!!');
      obj = obj();
    }
    file.contents = new Buffer(JSON.stringify(obj));

    var fp = file.path.replace(/\.[^./]*$/, '.json');
    if (file.path == fp) fp += '.json';
    file.path = fp;

    this.push(file);

    callback();
  }

  function flush(callback) {
    callback();
  }

  return through.obj(transform, flush);
};

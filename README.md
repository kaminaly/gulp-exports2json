# gulp-exports2json

> this plugin converts module.exports(object/function) to json.

## Install

```bash
$ npm install gulp-exports2json
```

## Usage
```js
var exports2json = require('gulp-exports2json'),
    gulp = require('gulp');

gulp.task('exports2json', function() {
  return gulp
    .src(['src/**/json/*.js'])
    .pipe(exports2json())
    .pipe(gulp.dest('dist'));
});
```

## License
[MIT](http://opensource.org/licenses/MIT)

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var module$1 = require('module');
var ejs = _interopDefault(require('ejs'));
var ejsLint = _interopDefault(require('ejs-lint'));
var caller = _interopDefault(require('caller'));
var ezFile = require('ez-file');

function render(templatePath, data) {
  var absolutePath = ezFile.resolve(templatePath, caller());
  var templateContent = ezFile.file(absolutePath);

  try {
    return ejs.render(templateContent, Object.assign({}, data,
      {require: module$1.createRequireFromPath(absolutePath),
      include: createInclude(absolutePath, data)}));
  } catch (error) {
    console.error(error);
    console.error(ejsLint(templateContent));
  }
}

function createInclude(parentPath, data) {
  return function (includePath, includeData) {
    var templatePath = ezFile.resolve(includePath, parentPath);
    return render(templatePath, Object.assign({}, data,
      includeData));
  };
}

exports.render = render;
//# sourceMappingURL=index.js.map

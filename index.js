/**
 * Module dependencies
 */

var slug = require('./deps/slug');

/**
 * Export `slug`
 *
 * Usage:
 *
 *  blog
 *    .attr('title')
 *    .use(slug('title'));
 */

module.exports = function(attrs, format) {
  if(typeof attrs == 'string')
    attrs = [attrs];

  if(format === undefined) {
    format = '';
    for(var i = 0; i < attrs.length; ++i) {
      format += ':' + attrs[i] + '-';
    }
    format = format.slice(0, -1);
  }

  var makeSlugString = function(obj) {
    var string;

    if(typeof format == 'function') {
      string = format(obj);
    } else {
      string = format;
      var toSub = format.match(/(:\w+)/g);
      toSub.forEach(function(sub) {
        var attr = sub.slice(1),
            val = obj[attr]() || '';
        string = string.replace(sub, val);
      });
    }
    obj.slug(slug(string));
  };

  return function(model) {
    model.attr('slug', { type : 'string' });

    // bind given `attr` changes to slug changes
    attrs.forEach(function(attr) {
      model.on('change:' + attr, makeSlugString);

      // create a slug if it's not set manually and if the model is new
      model.on('saving', function(obj) {
        if(obj.isNew() && !obj.slug()) makeSlugString(obj);
      });
    });

  };
};

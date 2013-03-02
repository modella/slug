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

module.exports = function(attr) {
  return function(model) {
    model.attr('slug', { type : 'string' });

    // bind given `attr` changes to slug changes
    model.on(('change ' + attr), function(obj, title) { obj.slug(slug(title)); });

    // create a slug if it's not set manually and if the model is new
    model.on('saving', function(obj) {
      if(obj.isNew() && !obj.slug()) obj.slug(slug(obj[attr]()));
    });
  };
};

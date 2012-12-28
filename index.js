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
    model.on('saving', function(obj) {
      if(obj.isNew()) obj.slug(slug(obj[attr]()));
    });
  };
};

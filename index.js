/**
 * Module dependencies
 */

var slug = require('slug');

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
      obj.slug(slug(obj[attr]()));
    });
  };
};

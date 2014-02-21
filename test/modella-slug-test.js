var modella = require('modella'),
    expect = require('expect.js'),
    slug = require('../');

describe('modella-slug', function() {
  describe('simple attributes', function() {
    var User;
    before(function() {
      User = modella('User')
          .attr('username');
      User.use(slug('username'));
    });

    it('works with instantiation', function() {
      var bob = new User({username: 'Bobby ray'});
      expect(bob.slug()).to.be('bobby-ray');
    });

    it('works with change', function() {
      var bob = new User({username: 'Bobby ray'});
      bob.username('stevie ray');
      expect(bob.slug()).to.be('stevie-ray');
    });
  });

  describe('format strings', function() {
    var User;
    before(function() {
      User = modella('User')
          .attr('username')
          .attr('from');
      User.use(slug(['username', 'from'], ':username-in-:from'));
    });

    it('works with instantiation', function() {
      var user = new User({username: 'Bobby ray', from: 'Wisconsin'});
      expect(user.slug()).to.be('bobby-ray-in-wisconsin');
    });

    it('works with change', function() {
      var user = new User({username: 'Bobby ray', from: 'Wisconsin'});
      user.username('joe');
      expect(user.slug()).to.be('joe-in-wisconsin');
      user.from('New York');
      expect(user.slug()).to.be('joe-in-new-york');
    });
  });

  describe('format function', function() {
    var User;
    before(function() {
      User = modella('User')
          .attr('username')
          .attr('address');

      User.use(slug(['username', 'address'], function(user) {
        return user.username() + ' located in ' + user.address().state;
      }));
    });

    it('works with instantiation', function() {
      var user = new User({username: 'Bobby ray', address: {state: 'Wisconsin'}});
      expect(user.slug()).to.be('bobby-ray-located-in-wisconsin');
    });

    it('works with change', function() {
      var user = new User({username: 'Bobby ray', address: {state: 'Wisconsin'}});
      user.username('joe');
      expect(user.slug()).to.be('joe-located-in-wisconsin');
      user.address({state: 'New York'});
      expect(user.slug()).to.be('joe-located-in-new-york');
    });

  });
});

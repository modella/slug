# model-slug

  create slugs for models

## Installation

In the browser (with component):

    component install modella/slug

On the server (with node.js):

    npm install modella-slug

## Example

```js
var slug = require('slug');

var Blog = model('blog')
  .attr('title')
  .attr('content')
  .use(slug('title'))

  var b = new Blog();
  b.title('A seriously interesting title');
  b.slug();
  // => 'a-seriously-interesting-title'

```

## Complex Example

```js
var slug = require('slug');

var Blog = model('blog')
  .attr('title')
  .attr('author')
  .attr('content')
  .use(slug(['title', 'author'], ':title-by-:author))

  var b = new Blog();
  b.title('Some blog post');
  b.author('Ryan S.');

  b.slug();
  // => 'some-blog-post-by-ryan-s'

```


## License

  MIT

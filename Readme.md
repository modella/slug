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

var blog = model('blog')
  .attr('title')
  .attr('content')
  .use(slug('title'))
```

## License

  MIT

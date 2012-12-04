
# model-slug

  create slugs for models

## Installation

    $ component install matthewmueller/model-slug

## Example

```js
var slug = require('model-slug');

var blog = model('blog')
  .attr('title')
  .attr('content')
  .use(slug('title'))
```

## License

  MIT

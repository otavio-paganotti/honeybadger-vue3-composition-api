# Honeybadger for Vue 3 Composition API

<a href="https://github.com/otavio-paganotti/honeybadger-vue3-composition-api/blob/main/LICENSE"><img src="https://img.shields.io/github/license/otavio-paganotti/honeybadger-vue3-composition-api" alt="License" /></a>

Use Honeybadger with Composition API features in your Vue 3 Application.

This solution is based on original Honeybadger Vue 3 support. Check it out [here](https://github.com/honeybadger-io/honeybadger-vue).

## Installation

```BASH
# For NPM
npm install honeybadger-vue3-composition-api --save

# For Yarn
yarn add honeybadger-vue3-composition-api
```

In your main.js

```javascript
import HoneybadgerVue from 'honeybadger-vue3-composition-api'
import { createApp } from 'vue'
import App from './App' //your root component

const app = createApp(App)

const config = {
  apiKey: 'project api key',
  environment: 'production',
  revision: 'git SHA/project version'
}

app.use(HoneybadgerVue, config)

app.mount('#app')
```

In your `.vue` component with Composition API

```html
<script setup lang="ts">
import { useHoneybadger } from 'honeybadger-vue3-composition-api'

const honeybadger = useHoneybadger();

honeybadger.setContext({
  active_organization: 55,
  custom_configuration: false
});

// ...

try {
  // do some stuf
} catch(error) {
  honeybadger.notify(error);
}
</script>
```

Or regular `.vue` with Options API

```javascript
this.$honeybadger.setContext({
  user_id: 123,
  user_email: 'user@example.com'
});

this.$honeybadger.notify(error);
```

Check all docs from Honeybadger for Vue 3 [Here](https://docs.honeybadger.io/lib/javascript/integration/vue3/).

## License

[Honeybadger Vue 3 Composition API](https://github.com/otavio-paganotti/honeybadger-vue3-composition-api) is licensed under the MIT license.
See the [license](https://github.com/otavio-paganotti/honeybadger-vue3-composition-api/blob/main/LICENSE) file for more details.
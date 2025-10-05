import './assets/styles/global.scss';

import { createApp } from 'vue';
import MarkdownIt from 'vue3-markdown-it';
import 'popper.js'
import 'bootstrap';
import { Tooltip } from 'bootstrap';
new Tooltip(document.body, {
  selector: "[data-bs-toggle='tooltip']",
})

import { router } from './router/router';

import App from './App.vue';
import { initSession } from './store/actions/session.actions';
import { createHeadPlugin } from './compositions/meta/createHead';

(async () => {
  await initSession();

  const app = createApp(App);

  app.use(router);
  app.use(createHeadPlugin()); // page metadata
  app.use(MarkdownIt);

  app.mount('#app');
})();

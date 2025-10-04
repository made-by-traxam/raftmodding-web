import './assets/styles/global.scss';

import { Modal, Tooltip } from 'bootstrap';
import $ from 'jquery'; //TODO: get rid of it!
import { createApp } from 'vue';
import MarkdownIt from 'vue3-markdown-it';

import { router } from './router/router';

import App from './App.vue';
import { initSession } from './store/actions/session.actions';
import { createHeadPlugin } from './compositions/meta/createHead';

(async () => {
  $.extend(Modal);
  $.extend(Tooltip);
  await initSession();

  const app = createApp(App);

  app.use(router);
  app.use(createHeadPlugin()); // page metadata
  app.use(MarkdownIt);

  app.mount('#app');
})();

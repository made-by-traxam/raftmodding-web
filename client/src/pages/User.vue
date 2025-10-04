<template>
  <div class="container">
    <section class="my-5">
      <h1 class="my-3 mw-100 text-break">{{ username }}'s mods</h1>
      <mods-card-deck :mods="mods" group-cls="my-3" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import ModsCardDeck from '../components/ModsCardDeck.vue';
import { useMods } from '../compositions/useMods';
import { useSeoMeta } from '@unhead/vue';

export default defineComponent({
  name: 'UserPage',
  components: { ModsCardDeck },
  setup() {
    const route = useRoute();
    const username = ref(route.params.username as string);
    const defaultQuery = {
      author: username.value,
    };

    useSeoMeta({
      title: username.value,
    });

    return {
      username,
      defaultQuery,
      ...useMods(defaultQuery),
    };
  },
});
</script>

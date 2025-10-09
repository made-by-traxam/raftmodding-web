<template>
  <div class="container">
    <section class="my-5">
      <h1 class="my-3 mw-100 text-break">{{ username }}'s mods</h1>
      <mods-card-deck :mods="mods" :state="loadingState" :reload="loadMods" class="my-3" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import ModsCardDeck, { LoadingState } from '../components/ModsCardDeck.vue';
import { useSeoMeta } from '@unhead/vue';
import { listMods } from '../api';
import { ModDto } from '../../../shared/dto/ModDto';

const route = useRoute();
const username = ref(route.params.username as string);

useSeoMeta({
  title: username.value,
});

const loadingState = ref<LoadingState>('loading');
const mods = ref<ModDto[]>([]);

async function loadMods() {
  const { error, data } = await listMods({ query: { author: username.value } });
  if (error !== undefined) {
    console.error('Failed to load mods:', error);
    loadingState.value = 'error';
  } else {
    mods.value = data as ModDto[]; // TODO avoid cast
    loadingState.value = 'ready';
  }
}
loadMods();
</script>

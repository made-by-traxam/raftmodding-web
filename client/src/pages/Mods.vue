<template>
  <div
    class="container"
    :class="{ 'mt-0': (loadingState !== 'loading') && (!mods || mods.length <= 0) }"
  >
    <section class="my-3">
      <h1>Raft mods directory</h1>
      <p>
        Here is a list of all raft mods that have been published on our site. If
        you are missing something or have a great new idea, feel free to contact
        us on our <a href="/discord" target="_blank">Discord server</a>.
      </p>
    </section>
    <section class="my-3">
      <mod-searcher :default-query="defaultQuery" @search="onSearch" />
    </section>
    <mods-card-deck
      :mods="mods"
      :state="loadingState"
      group-cls="my-3"
      class="search-result"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ModsCardDeck, { LoadingState } from '../components/ModsCardDeck.vue';
import ModSearcher from '../components/ModSearcher.vue';
import { useSeoMeta } from '@unhead/vue';
import { ModDto } from '../../../shared/dto/ModDto';
import { list2, List2Data } from '../api';
import { QueryParams } from '../../../shared/types/QueryParams';

useSeoMeta({
  title: 'Mods',
});

const defaultQuery = {
  sort: '-createdAt',
};

const loadingState = ref<LoadingState>('loading');
const mods = ref<ModDto[]>([]);

async function loadMods(params: QueryParams) {
  const { data, error } = await list2({ query: params } as List2Data); // TODO remove cast, check typing
  if (error !== undefined) {
    console.error('Failed to load mods:', error);
    loadingState.value = 'error';
  } else {
    mods.value = data as ModDto[];
    loadingState.value = 'ready';
  }
}

async function onSearch(query: QueryParams): Promise<void> {
  loadingState.value = "loading";
  await loadMods(query);
}
onSearch(defaultQuery);
</script>

<style scoped lang="scss">
.serarch-result {
  min-height: 50vh;
}
</style>

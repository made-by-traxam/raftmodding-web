<template>
  <div class="mx-auto w-100">
    <div
      v-if="state === 'ready' && mods.length > 0"
      v-for="(modGroup, i) in modGroups"
      :key="`mod-group-${i}`"
      class="row row-cols-sm-1 row-cols-lg-3"
    >
      <div
        v-for="mod in modGroup"
        :key="`mod-${mod.id}`"
        class="col p-3"
      >
        <mod-card
          :mod="mod"
        />
      </div>
      <div class="col p-3" v-if="modGroup.length <= 2">
        <placeholder-mod-card/>
      </div>
      <div class="col p-3" v-if="modGroup.length <= 1">
        <placeholder-mod-card transparent />
      </div>
    </div>
    <div v-else-if="state === 'ready' && mods.length === 0" class="row row-cols-sm-1 row-cols-lg-3">
      <div class="col p-3">
        <div class="card">
          <div class="card-header text-center text-bg-warning py-4">
            <icon name="xmark" size="4x"/>
          </div>
          <div class="card-body">
            <h5 class="card-title fw-bold">No results</h5>
            <p class="card-text">
              Move along, nothing to see here!
              I mean there's litterally nothing here.
              Maybe try another search term?
            </p>
          </div>
        </div>
      </div>
      <div class="col p-3">
        <placeholder-mod-card />
      </div>
      <div class="col p-3">
        <placeholder-mod-card transparent/>
      </div>
    </div>
    <div v-else-if="state === 'error'" class="row row-cols-sm-1 row-cols-lg-3">
      <div class="col p-3">
        <div class="card">
          <div class="card-header text-center text-bg-danger py-4">
            <icon name="triangle-exclamation" size="4x"/>
          </div>
          <div class="card-body">
            <h5 class="card-title fw-bold">Loading failed!</h5>
            <p class="card-text">An error occurred while loading these mods!</p>
            <button v-if="reload !== undefined" @click="reload()" class="btn btn-primary">Try again</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="state === 'loading'" class="row row-cols-sm-1 row-cols-lg-3">
      <div class="col p-3" v-for="i in 3" :key="`placeholder-${i}`">
        <div class="card">
          <div class="card-header text-center py-4">
            <icon name="anchor" size="4x"/>
          </div>
          <div class="card-body">
            <h5 class="card-title fw-bold">Loading...</h5>
            <p class="card-text placeholder-wave">
              <span class="placeholder col-4"></span>{{ ' ' }}
              <span class="placeholder col-7"></span>{{ ' ' }}
              <span class="placeholder col-6"></span>{{ ' ' }}
              <span class="placeholder col-3"></span>
              <button class="btn btn-primary disabled placeholder col-4 mt-3"></button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ModCard from './ModCard.vue';
import PlaceholderModCard from './PlaceholderModCard.vue';
import { type ModDto } from '../../../shared/dto/ModDto';
import Icon from './Icon.vue';

export type LoadingState = 'loading' | 'error' | 'ready';

const { mods, state, reload } = defineProps<{
  mods: ModDto[],
  state: LoadingState,
  reload?: () => void,
}>();

const modGroups = computed(() => {
  const groups = [];
  for (let i = 0; i < mods.length; i += 3) {
    groups.push(mods.slice(i, i + 3));
  }
  return groups;
});
</script>

<template>
  <div class="container" v-if="mod">
    <mod-header :mod="mod" @like="onToggleLike" />
    <section class="my-3">
      <div class="row">
        <div class="col-sm-9 my-3">
          <template v-for="(version, i) in mod.versions">
            <mod-version-details
              v-if="version"
              :key="version.version"
              :version="version"
              :installable="i === 0"
            />
          </template>
        </div>
        <mod-right-table v-if="mod" :mod="mod" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ModDto } from '../../../shared/dto/ModDto';
import ModDetails from '../components/ModDetails.vue';
import ModHeader from '../components/ModHeader.vue';
import ModRightTable from '../components/ModRightTable.vue';
import ModVersionDetails from '../components/ModVersionDetails.vue';
import { useLikes } from '../compositions/useLikes';
import { api } from '../modules/api';
import { useSeoMeta } from '@unhead/vue';
import { getMod } from '../api';
import { toaster } from '../modules/toaster';
import { router } from '../router/router';

const meta = useSeoMeta({
  title: 'Loading mod versions...',
});
const modId = useRoute().params.id as string; // routing ensures this value is present
const mod = ref<ModDto>();
const { onToggleLike } = useLikes(mod as Ref<ModDto>); // TODO: improve typing

async function loadMod() {
  const { data, error } = await getMod({ path: { id: modId } });
  if (error !== undefined) {
    // TODO distinguish between not found and other errors
    toaster.error(`Mod ${modId} not found`);
    await router.replace({name: 'mods'});
  } else {
    meta.patch({
      title: `${mod.value?.title} versions`
    });
    mod.value = data as ModDto; // TODO improve typing
  }
}
loadMod()
</script>
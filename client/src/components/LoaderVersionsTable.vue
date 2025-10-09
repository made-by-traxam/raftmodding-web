<script setup lang="ts">
import { ref } from 'vue';
import { LoadingState, toDateStr } from '../utils';
import { LoaderVersionDto } from '../../../shared/dto/LoaderVersionDto';
import { listLoaderVersions } from '../api';
import Icon from './Icon.vue';

const loaderVersions = ref<LoaderVersionDto[]>([]);
const loaderVersionsState = ref<LoadingState>('loading');

async function loadLoaderVersions() {
  loaderVersionsState.value = 'loading';
  const { data, error } = await listLoaderVersions();
  if (error !== undefined) {
    console.error('Error while loading loader versions:', error);
    loaderVersionsState.value = 'error';
  } else {
    loaderVersions.value = data as LoaderVersionDto[]; // TODO: improve API typing
    loaderVersionsState.value = 'ready';
  }
}
loadLoaderVersions();
</script>

<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">RML version</th>
        <th scope="col">Raft version</th>
        <th scope="col">Release date</th>
        <th scope="col">Changelog</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loaderVersionsState === 'loading'" class="text-center">
        <td colspan="4">
          <icon name="circle-notch" animate="spin" />
          Loading ModLoader versions...
        </td>
      </tr>
      <tr
        v-else-if="loaderVersionsState === 'error'"
        class="table-danger text-center"
      >
        <td colspan="4">
          An error occurred while loading ModLoader versions.
          <button
            @click="loadLoaderVersions"
            class="btn btn-outline-danger btn-sm ms-3"
          >
            Retry
          </button>
        </td>
      </tr>
      <tr
        v-for="(loaderVersion, i) in loaderVersions"
        :key="loaderVersion.rmlVersion"
        :class="{ 'table-success': i === 0 }"
      >
        <th scope="row">{{ loaderVersion.rmlVersion }}</th>
        <td>{{ loaderVersion.raftVersion!.title }}</td>
        <td>
          {{ toDateStr(loaderVersion.timestamp as Date /* TODO: improve typing */) }}
        </td>
        <td>
          <router-link
            :to="{
              name: 'loaderChangelog',
              params: { version: loaderVersion.rmlVersion },
            }"
          >
            Link
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

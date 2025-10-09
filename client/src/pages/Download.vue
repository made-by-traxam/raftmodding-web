<template>
  <div class="container">
    <section>
      <div class="row mt-5">
        <div class="col-1"></div>
        <div class="col-3 d-sm-none d-md-block text-center">
          <icon name="desktop" size="10x" />
        </div>
        <div class="col-sm-8">
          <h1>Raft Mod Loader</h1>
          <p class="lead">It's boring to go alone. Take this!</p>
          <button
            v-if="latestLauncherVersion.state === 'loading'"
            class="btn btn-lg btn-success disabled placeholder"
          >
            <icon name="circle-notch" animate="spin"/> Fetching latest version...
          </button>
          <button
            v-else-if="latestLauncherVersion.state === 'error'"
            class="btn btn-lg btn-danger disabled"
          >
            Download unavailable
          </button>
          <a
            v-else-if="latestLauncherVersion.state === 'ready'"
            class="btn btn-lg btn-success"
            :href="latestLauncherVersion.value.downloadUrl"
            target="_blank"
          >
            Download launcher v{{ latestLauncherVersion.value.version }}
          </a>
          <router-link
            v-if="latestLauncherVersion.state === 'ready'"
            :to="{
              name: 'launcherChangelog',
              params: { version: latestLauncherVersion.value.version },
            }"
            class="btn btn-outline-secondary mx-2"
          >
            <i class="fas fa-list-ul me-2"></i> View changelog
          </router-link>
        </div>
      </div>
      <div class="row mt-15">
        <div class="col-1"></div>
        <div class="col-3 d-none d-md-block"></div>
        <div class="col-sm-8">
          <span class="text-muted pt-2">
            <i class="fas fa-info-circle me-1"></i>
            The Raft Mod Loader only supports the official
            <a
              href="https://store.steampowered.com/app/648800/Raft/"
              target="_blank"
              >Raft Steam release</a
            >
            on Windows 10.
          </span>
        </div>
      </div>
    </section>
    <section class="my-5">
      <div class="row text-center">
        <div class="col-sm-4 p-5">
          <i class="far fa-check-circle fa-7x m-3"></i>
          <h5>Up to date</h5>
          <p class="m-1 text-start">
            Our installer comes with a launcher that always keeps your mod
            loader version up to date - no action required!
          </p>
        </div>
        <div class="col-sm-4 p-5">
          <i class="fas fa-lock fa-7x m-3"></i>
          <h5>Secure</h5>
          <p class="m-1 text-start">
            The RML launcher uses a secure channel to download the mod loader so
            that you don't have to worry about the bad guys.
          </p>
        </div>
        <div class="col-sm-4 p-5">
          <i class="fas fa-plug fa-7x m-3"></i>
          <h5>Easy to use</h5>
          <p class="m-1 text-start">
            Installing and using the RML launcher is as easy as pie. We'll do
            all the setup for you so you can get into modding right away.
          </p>
        </div>
      </div>
    </section>
    <section class="my-5">
      <h2>Frequently asked questions</h2>
      <p>
        We have put together a couple of questions that are asked all the time.
        If you have any further questions, please feel free to ask us on our
        <a href="/discord" target="_blank">Discord server</a>.
      </p>
      <div class="row row-cols-sm-1 row-cols-lg-2 my-3">
        <div class="col p-3">
          <div class="card h-100">
            <div class="card-body m-2">
              <h5 class="mb-3">
                <i
                  >What's the difference between the launcher and the mod
                  loader?</i
                >
              </h5>
              The launcher is a handy piece of software that installs the Raft Mod
              Loader for you. Using the launcher, your mod loader installation is
              automatically kept up to date.<br />The mod loader on the other hand
              modifies parts of the code of Raft so that you can easily play with
              mods.
            </div>
          </div>
        </div>
        <div class="col p-3">
          <div class="card h-100">
            <div class="card-body m-2">
              <h5 class="mb-3">
                <i>Something isn't working! Who can help me?</i>
              </h5>
              If you encounter any bugs or run into problems while installing or
              using our software, please feel free to contact us on our
              <a href="/discord" target="_blank">Discord server</a>.
            </div>
          </div>
        </div>
      </div>
      <div class="row row-cols-sm-1 row-cols-lg-2 my-3">
        <div class="col p-3">
          <div class="card h-100">
            <div class="card-body m-2">
              <h5 class="mb-3"><i>What do I need to play with mods?</i></h5>
              The Raft Mod Loader should work with any Raft installation that was
              bought with Steam.
            </div>
          </div>
        </div>
        <div class="col p-3">
          <div class="card h-100">
            <div class="card-body m-2">
              <h5 class="mb-3"><i>Is the mod loader official?</i></h5>
              No, this project is
              <u>not</u>
              affiliated with, endorsed by or in any way associated with Redbeet
              Interactive or Raft.
            </div>
          </div>
        </div>
      </div>
      <div class="row row-cols-sm-1 row-cols-lg-2 my-3">
        <div class="col p-3">
          <div class="card h-100">
            <div class="card-body m-2">
              <h5 class="mb-3"><i>Where do I get mods?</i></h5>
              Find our best and most popular mods on our
              <router-link :to="{ name: 'home' }">hompage</router-link>
              or head over to the
              <router-link :to="{ name: 'mods' }">mods directory</router-link>
              to browse all mods.
            </div>
          </div>
        </div>
        <div class="col p-3">
          <div class="card h-100">
            <div class="card-body m-2">
              <h5 class="mb-3"><i>Can I make mods myself?</i></h5>
              Sure! Whether you're a programmer, a graphic designer or a modeler,
              we always appreciate your help. To get started with modding, feel
              free to ask us on the
              <a href="/discord" target="_blank">Discord server</a>
              or have a look at our
              <a href="/docs" target="_blank">Documentation</a>
              .
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="my-5">
      <h2>Other launcher versions</h2>
      <p>
        We strongly recommend you to use the latest version that is presented
        above. Support is only provided for that version. If you in any case
        have to use another version, you can find it in the list below. You can
        also find links to the versions' changelogs here.<br />
      </p>
      <div class="wide-content">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Launcher version</th>
              <th scope="col">Release date</th>
              <th scope="col">Download</th>
              <th scope="col">Changelog</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(launcherVersion, i) in launcherVersions"
              :key="launcherVersion.version"
              :class="{ 'table-success': i === 0 }"
            >
              <th scope="row">{{ launcherVersion.version }}</th>
              <td>{{ toDateStr(launcherVersion.timestamp as Date /* TODO: improve typing */) }}</td>
              <td>
                <a
                  v-if="i === 0"
                  :href="launcherVersion.downloadUrl || '#'"
                  target="_blank"
                  >Download</a
                >
                <i
                  v-else
                  class="fas fa-lock"
                  title="This version is outdated and not publicly available anymore. Please download the latest version above!"
                >
                </i>
              </td>
              <td>
                <router-link
                  :to="{
                    name: 'launcherChangelog',
                    params: { version: launcherVersion.version },
                  }"
                  >Link</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p></p>
    </section>
    <section class="my-5">
      <h2>ModLoader versions</h2>
      <p>
        The mod loader is managed by the launcher. This means that you don't
        have to worry about being up-to-date with the mod loader. However, this
        also means that it is impossible to install old versions of the mod
        loader. This list is for documentation purposes only and provides links
        to the changelogs. <br />
      </p>
      <div class="wide-content">
        <LoaderVersionsTable />
      </div>
      <p></p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { LoadingState, toDateStr } from '../utils';
import Icon from '../components/Icon.vue';
import { useSeoMeta } from '@unhead/vue';
import { LauncherVersionDto } from '../../../shared/dto/LauncherVersionDto';
import { listLauncherVersions } from '../api';
import LoaderVersionsTable from '../components/LoaderVersionsTable.vue';

useSeoMeta({
  title: 'Download',
});

const launcherVersions = ref<LauncherVersionDto[]>([]);
const launcherVersionsState = ref<LoadingState>('loading');
async function loadLauncherVersions() {
  launcherVersionsState.value = 'loading';
  const { data, error } = await listLauncherVersions();
  if (error !== undefined) {
    console.error('Error while loading launcher versions:', error);
    launcherVersionsState.value = 'error';
  } else {
    launcherVersions.value = data as LauncherVersionDto[]; // TODO: improve API typing
    launcherVersionsState.value = 'ready';
  }
}
loadLauncherVersions();

type LatestLauncherVersionState = {
  state: 'loading' | 'error';
} | {
  state: 'ready';
  value: LauncherVersionDto;
}

const latestLauncherVersion = computed<LatestLauncherVersionState>(() => {
  if (launcherVersionsState.value !== 'ready') {
    return {
      state: launcherVersionsState.value,
    };
  } else if (launcherVersions.value.length === 0) {
    return {
      state: 'error',
    };
  } else {
    return {
      state: 'ready',
      value: launcherVersions.value[0],
    };
  }
});
</script>

<script setup lang="ts">
import { VAppBar, VAppBarNavIcon, VNavigationDrawer } from "vuetify/components";
import ThemeSwitch from "./ThemeSwitch.vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";

const isOpenDrawer = ref(false);

interface Item {
  title: string;
  url: string;
}

const items: Item[] = [
  { title: "TOP", url: "/" },
  { title: "PLAYGROUND", url: "/playground" },
];
</script>

<template>
  <VAppBar>
    <VAppBarNavIcon variant="text" @click.stop="isOpenDrawer = !isOpenDrawer" />

    <VAppBarTitle>
      <RouterLink to="/" class="app-title-link">Lottie Books</RouterLink>
    </VAppBarTitle>
    <template v-slot:append>
      <ThemeSwitch class="pr-5" />
    </template>
  </VAppBar>
  <VNavigationDrawer v-model="isOpenDrawer" temporary>
    <VList>
      <VListItem
        v-for="item in items"
        :key="item.title"
        :title="item.title"
        :to="item.url"
      />
    </VList>
  </VNavigationDrawer>
</template>

<style scoped>
.app-title-link {
  /* リンクのデフォルト色と下線を消す */
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  cursor: pointer;

  /* ホバー時に少し透明度を変えると「押せる感」が出ます */
  transition: opacity 0.2s;
}

.app-title-link:hover {
  opacity: 0.8;
}
</style>

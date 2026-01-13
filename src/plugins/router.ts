import { createRouter, createWebHashHistory } from "vue-router";

import HelloWorld from "@/components/HelloWorld.vue";
import Top from "@/layouts/Top.vue";
import Playground from "@/layouts/Playground.vue";
import LottieViewer from "@/layouts/LottieViewer.vue";

const routes = [
  {
    path: "/",
    component: Top,
    children: [
      { path: "/:title", component: LottieViewer },
    ],
  },
  { path: "/hello", component: HelloWorld },
  { path: "/playground", component: Playground },
];

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import CuacaWidget from '../components/CuacaWidget.vue';
import LokasiWidget from '../components/LokasiWidget.vue';
import StopwatchWidget from '../components/StopwatchWidget.vue';
import Blackjack from '../components/Blackjack.vue';
import FotoWidget from '../components/FotoWidget.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/cuaca', component: CuacaWidget },
  { path: '/lokasi', component: LokasiWidget },
  { path: '/stopwatch', component: StopwatchWidget },
  { path: '/kartu', component: Blackjack },
  { path: '/foto', component: FotoWidget },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';

// Create Vue instance
const app = createApp(App);

// Defiining API URL as a global property
const apiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000';
app.config.globalProperties.$apiUrl = apiUrl;

// Configure Vuex store
const store = createStore({
  state: {
    capivaras: []
  },
  mutations: {
    setCapivaras(state, capivaras) {
      state.capivaras = capivaras;
    }
  }
});

// Using API to fetch capivaras
app.use(store);

// Monunting App
app.mount('#app');

// Exporting store
export default store;
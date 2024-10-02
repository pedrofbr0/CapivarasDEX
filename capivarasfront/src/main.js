import { createApp } from 'vue';
import App from './App.vue';
import { createStore } from 'vuex';

const app = createApp(App);

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

app.use(store);

// Moounting the app
app.mount('#app');

// Fetching the data when mounted
app.mounted(() => {
  fetch('http://localhost:3000/api/capivaras')
    .then(response => response.json())
    .then(data => {
      store.commit('setCapivaras', data);
    })
    .catch(error => console.error('Erro ao carregar capivaras:', error));
});

export default store

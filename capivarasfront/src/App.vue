<template>
  <div id="app">
    <h1>CAPIVARA-DEX</h1>

    <!-- Tabs to navigate between list and register-->
    <div class="tabs">
      <button
        :class="{ active: currentTab === 'lista' }"
        @click="currentTab = 'lista'"
      >
        Lista
      </button>
      <button
        :class="{ active: currentTab === 'cadastro' }"
        @click="abrirFormulario()"
      >
        Cadastro
      </button>
    </div>

    <!-- Show content according to the tab selected -->
    <div v-if="currentTab === 'lista'">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="lista capivaras..."
        class="search-bar"
      />
      <CapivaraList
        :capivaras="filteredCapivaras"
        @edit-capivara="handleEditCapivara"
        @delete-capivara="fetchCapivaras"
      />
    </div>

    <div v-if="currentTab === 'cadastro'">
      <CapivaraForm :capivara="capivaraToEdit" @add-capivara="fetchCapivaras" />
    </div>
  </div>
</template>

<script>
import CapivaraList from "./components/CapivaraList.vue";
import CapivaraForm from "./components/CapivaraForm.vue";

export default {
  name: "App",
  components: {
    CapivaraList,
    CapivaraForm,
  },
  data() {
    return {
      currentTab: "lista",
      capivaras: [],
      capivaraToEdit: null, // Save Capibara to be edited
      searchTerm: "",
    };
  },
  computed: {
    filteredCapivaras() {
      return this.capivaras.filter((capivara) =>
        capivara.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  mounted() {
    this.fetchCapivaras();
  },
  methods: {
    fetchCapivaras() {
      fetch("http://localhost:3000/api/capivaras")
        .then((response) => response.json())
        .then((data) => {
          this.capivaras = data;
        })
        .catch((error) => console.error("Erro ao carregar capivaras:", error));
    },
    handleEditCapivara(capivara) {
      this.capivaraToEdit = capivara; // Define Capibara to edit
      this.currentTab = "cadastro"; // Alter to register tab
    },
    abrirFormulario() {
      this.capivaraToEdit = null; // clean form to add new Capibara
      this.currentTab = "cadastro";
    },
  },
};
</script>

<style src="./App.css"></style>

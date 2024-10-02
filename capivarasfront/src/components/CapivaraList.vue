<template>
  <div class="capivaras-container">
    <div v-for="capivara in capivaras" :key="capivara.id" class="capivara-card">
      <div class="card-content">
        <h2>{{ capivara.nome }}</h2>
        <ul class="no-bullets">
          <li><strong>Idade:</strong> {{ capivara.idade }}</li>
          <li><strong>Peso (kg):</strong> {{ capivara.peso }}</li>
          <li><strong>Status de Saúde:</strong> {{ capivara.statusSaude }}</li>
          <li><strong>Habitat:</strong> {{ capivara.habitat }}</li>
          <li><strong>Comportamento:</strong> {{ capivara.comportamento }}</li>
          <li v-if="capivara.dieta">
            <strong>Dieta:</strong> {{ capivara.dieta }}
          </li>
          <li v-else><strong>Dieta:</strong> <i>Sem dieta.</i></li>
          <li v-if="capivara.observacoes">
            <strong>Observações:</strong> {{ capivara.observacoes }}
          </li>
          <li v-else><strong>Observações:</strong> <i>Sem obs.</i></li>
        </ul>
      </div>

      <!-- Botões de editar e deletar -->
      <div class="card-buttons">
        <button @click="editCapivara(capivara)">Editar</button>
        <button @click="deleteCapivara(capivara.id)">Deletar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    capivaras: Array,
  },
  methods: {
    editCapivara(capivara) {
      //Emit an event to the parent component with the data of the Capibara to be edited
      this.$emit("edit-capivara", capivara);
    },
    deleteCapivara(id) {
      // Confirm deletion
      if (confirm("Tem certeza que deseja deletar esta capivara?")) {
        fetch(`http://localhost:3000/api/capivaras/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => {
            alert("Capivara deletada com sucesso");
            // Emit an event to the parent component to reload the data
            this.$emit("delete-capivara");
          })
          .catch((error) => console.error("Erro ao deletar capivara:", error));
      }
    },
  },
};
</script>

<style scoped src="./CapivaraList.css"></style>

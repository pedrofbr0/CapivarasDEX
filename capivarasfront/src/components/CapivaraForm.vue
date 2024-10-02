<template>
  <div class="container form-container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <form
          @submit.prevent="adicionarOuEditarCapivara"
          class="shadow p-4 rounded bg-dark-mode"
        >
          <div class="mb-3">
            <label for="nome" class="form-label text-light">Nome</label>
            <input
              type="text"
              class="form-control form-control-dark"
              v-model="capivaraLocal.nome"
              required
            />
          </div>
          <div class="mb-3">
            <label for="idade" class="form-label text-light">Idade</label>
            <input
              type="number"
              class="form-control form-control-dark"
              v-model="capivaraLocal.idade"
              required
            />
          </div>
          <div class="mb-3">
            <label for="peso" class="form-label text-light">Peso (kg)</label>
            <input
              type="number"
              class="form-control form-control-dark"
              v-model="capivaraLocal.peso"
              required
            />
          </div>
          <div class="mb-3">
            <label for="statusSaude" class="form-label text-light"
              >Status de Saúde</label
            >
            <input
              type="text"
              class="form-control form-control-dark"
              v-model="capivaraLocal.status_saude"
              required
            />
          </div>
          <div class="mb-3">
            <label for="habitat" class="form-label text-light">Habitat</label>
            <input
              type="text"
              class="form-control form-control-dark"
              v-model="capivaraLocal.habitat"
              required
            />
          </div>
          <div class="mb-3">
            <label for="comportamento" class="form-label text-light"
              >Comportamento</label
            >
            <input
              type="text"
              class="form-control form-control-dark"
              v-model="capivaraLocal.comportamento"
            />
          </div>
          <div class="mb-3">
            <label for="dieta" class="form-label text-light">Dieta</label>
            <input
              type="text"
              class="form-control form-control-dark"
              v-model="capivaraLocal.dieta"
            />
          </div>
          <div class="mb-3">
            <label for="observacoes" class="form-label text-light"
              >Observações</label
            >
            <input
              type="text"
              class="form-control form-control-dark"
              v-model="capivaraLocal.observacoes"
            />
          </div>
          <button type="submit" class="btn btn-success w-100">
            {{ capivaraLocal.id ? "Atualizar" : "Adicionar" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    capivara: {
      type: Object,
      default: () => ({
        nome: "",
        idade: "",
        peso: "",
        status_saude: "",
        habitat: "",
      }),
    },
  },
  data() {
    return {
      capivaraLocal: { ...this.capivara },
    };
  },
  watch: {
    capivara: {
      handler(newValue) {
        this.capivaraLocal = { ...newValue };
      },
      deep: true,
    },
  },
  methods: {
    adicionarOuEditarCapivara() {
      if (this.capivaraLocal.id) {
        fetch(`http://localhost:3000/api/capivaras/${this.capivaraLocal.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.capivaraLocal),
        })
          .then(() => {
            alert("Capivara atualizada com sucesso!");
            this.$emit("add-capivara");
          })
          .catch((error) =>
            console.error("Erro ao atualizar capivara:", error)
          );
      } else {
        fetch("http://localhost:3000/api/capivaras", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.capivaraLocal),
        })
          .then((response) => response.json())
          .then(() => {
            alert("Capivara adicionada com sucesso!");
            this.$emit("add-capivara");
          })
          .catch((error) =>
            console.error("Erro ao adicionar capivara:", error)
          );
      }
    },
  },
};
</script>

<style src="./CapivaraForm.css"></style>

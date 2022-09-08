<script>
import EditorasApi from "@/api/editoras.js";
const editorasApi = new EditorasApi();
export default {
  data() {
    return {
      editora: {},
      editoras: [],
      site: {},
      nomeeditora: {},
    };
  },
  async created() {
    this.editoras = await editorasApi.buscarTodosOsEditoras();
  },
  methods: {
    async salvar() {
      if (this.editora.id) {
        await editorasApi.atualizarEditora(this.editora);
      } else {
        await editorasApi.adicionarEditora(this.editora);
      }
      this.editoras = await editorasApi.buscarTodosOsEditoras();
      this.editora = {};
    },
    async excluir(editora) {
      await editorasApi.excluirEditora(editora.id);
      this.editoras = await editorasApi.buscarTodosOsEditoras();
    },
    editar(editora) {
      Object.assign(this.editora, editora);
    },
  },
};
</script>
<template>
  <div @keydown.enter="salvar" class="form-input">
    <input
      type="text"
      v-model="editora.nomeeditora"
      placeholder="Nome da Editora"
    />
    <input
      type="text"
      v-model="editora.site"
      placeholder="Link do site da Editora"
    />
    <button @click="salvar">Salvar</button>
  </div>
  <div class="lista-livros">
    <table style="width: 50%">
      <thead>
        <tr>
          <th style="width: 10%">Editora</th>
          <th style="width: 30%">Site</th>
          <th style="width: 10%">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="editora in editoras" :key="editora.id">
          <td>{{ editora.nomeeditora }}</td>
          <td>{{ editora.site }}</td>
          <td>
            <button @click="editar(editora)">Editar</button>
            <button @click="excluir(editora)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

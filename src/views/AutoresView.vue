<script>
import AutoresApi from "@/api/autores.js";
const autoresApi = new AutoresApi();
export default {
  data() {
    return {
      autor: {},
      autores: [],
    };
  },
  async created() {
    this.autores = await autoresApi.buscarTodosOsAutores();
  },
  methods: {
    async salvar() {
      if (this.autor.id) {
        await autoresApi.atualizarAutor(this.autor);
      } else {
        await autoresApi.adicionarAutor(this.autor);
      }
      this.autores = await autoresApi.buscarTodosOsAutores();
      this.autor = {};
    },
    async excluir(autor) {
      await autoresApi.excluirAutor(autor.id);
      this.autores = await autoresApi.buscarTodosOsAutores();
    },
    editar(autor) {
      Object.assign(this.autor, autor);
    },
  },
};
</script>
<template>
  <div @keydown.enter="salvar" class="form-input">
    <input
      type="text"
      v-model="autor.nome"
      @keyup.enter="salvar"
      placeholder="Adicionar nome do Autor"
    />
    <button @click="salvar">Salvar</button>
  </div>
  <div class="lista-livros">
    <table style="width: 25%">
      <thead>
        <tr>
          <th style="width: 15%">Nome do Autor</th>
          <th style="width: 10%">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="autor in autores" :key="autor.id">
          <td>{{ autor.nome }}</td>
          <td>
            <button @click="editar(autor)">Editar</button>
            <button @click="excluir(autor)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

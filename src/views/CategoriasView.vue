<script>
import CategoriasApi from "@/api/categorias.js";
const categoriasApi = new CategoriasApi();
export default {
  data() {
    return {
      categoria: {},
      categorias: [],
      tipo: {},
    };
  },
  async created() {
    this.categorias = await categoriasApi.buscarTodosOsCategorias();
  },
  methods: {
    async salvar() {
      if (this.categoria.id) {
        await categoriasApi.atualizarCategoria(this.categoria);
      } else {
        await categoriasApi.adicionarCategoria(this.categoria);
      }
      this.categorias = await categoriasApi.buscarTodosOsCategorias();
      this.categoria = {};
    },
    async excluir(categoria) {
      await categoriasApi.excluirCategoria(categoria.id);
      this.categorias = await categoriasApi.buscarTodosOsCategorias();
    },
    editar(categoria) {
      Object.assign(this.categoria, categoria);
    },
  },
};
</script>
<template>
  <div @keydown.enter="salvar" class="form-input">
    <input
      type="text"
      v-model="categoria.tipo"
      placeholder="Categoria do livro"
    />

    <button @click="salvar">Salvar</button>
  </div>
  <div class="lista-livros">
    <table style="width: 60%">
      <thead>
        <tr>
          <th style="width: 40%">Categoria</th>
          <th style="width: 10%">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categoria in categorias" :key="categoria.id">
          <td>{{ categoria.tipo }}</td>
          <td>
            <button @click="editar(categoria)">Editar</button>
            <button @click="excluir(categoria)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LivrosApi from "@/api/livros.js";
const livrosApi = new LivrosApi();
import CategoriasApi from "@/api/categorias.js";
const categoriasApi = new CategoriasApi();
import AutoresApi from "@/api/autores.js";
const autoresApi = new AutoresApi();
import EditorasApi from "@/api/editoras.js";
const editorasApi = new EditorasApi();
export default {
  data() {
    return {
      livro: {},
      livros: [],
      titulo: {},
      isbn: {},
      quantidade: {},
      preco: {},
      categorias: [],
      autores: {},
      editoras: {},
    };
  },
  async created() {
    this.livros = await livrosApi.buscarTodosOsLivros();
    this.categorias = await categoriasApi.buscarTodosOsCategorias();
    this.autores = await autoresApi.buscarTodosOsAutores();
    this.editoras = await editorasApi.buscarTodosOsEditoras();
  },
  methods: {
    async salvar() {
      if (this.livro.id) {
        await livrosApi.atualizarLivro(this.livro);
      } else {
        await livrosApi.adicionarLivro(this.livro);
      }
      this.livros = await livrosApi.buscarTodosOsLivros();
      this.livro = {};
    },
    async excluir(livro) {
      await livrosApi.excluirLivro(livro.id);
      this.livros = await livrosApi.buscarTodosOsLivros();
    },
    editar(livro) {
      Object.assign(this.livro, livro);
    },
  },
};
</script>
<template>
  <div @keydown.enter="salvar" class="form-input">
    <input type="text" v-model="livro.titulo" placeholder="Título do livro" />
    <input type="text" v-model="livro.isbn" placeholder="ISBN do livro" />
    <input
      type="text"
      v-model="livro.quantidade"
      placeholder="Quantidade do livro"
    />
    <input type="text" v-model="livro.preco" placeholder="Preço do livro" />
    <select v-model="livro.categoriaId">
      <option
        v-for="categoria in categorias"
        :key="categoria.id"
        :value="categoria.id"
      >
        {{ categoria.tipo }}
      </option>
    </select>
    <select v-model="livro.autorId">
      <option v-for="autor in autores" :key="autor.id" :value="autor.id">
        {{ autor.nome }}
      </option>
    </select>
    <select v-model="livro.editoraId">
      <option v-for="editora in editoras" :key="editora.id" :value="editora.id">
        {{ editora.nomeeditora }}
      </option>
    </select>
    <button @click="salvar">Salvar</button>
  </div>
  <div class="lista-livros">
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>ISBN</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Categoria</th>
          <th>Autor</th>
          <th>Editora</th>
          <th style="width: 10%">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="livro in livros" :key="livro.id">
          <td>{{ livro.titulo }}</td>
          <td>{{ livro.isbn }}</td>
          <td>{{ livro.quantidade }}</td>
          <td>{{ livro.preco }}</td>
          <td>{{ livro.categoria }}</td>
          <td>{{ livro.autorId }}</td>
          <td>{{ livro.editora.nomeeditora }}</td>
          <td>
            <button @click="editar(livro)">Editar</button>
            <button @click="excluir(livro)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

import axios from "axios";
export default class EditorasApi {
  async buscarTodosOsEditoras() {
    const response = await axios.get(
      "https://joaogabriel2info3livraria.herokuapp.com/editoras"
    );
    return response.data;
  }

  async buscarEditora(id) {
    const response = await axios.get(
      `https://joaogabriel2info3livraria.herokuapp.com/editoras/${id}`
    );
    return response.data;
  }

  async adicionarEditora(editora) {
    const response = await axios.post(
      "https://joaogabriel2info3livraria.herokuapp.com/editoras",
      editora
    );
    return response.data;
  }

  async excluirEditora(id) {
    const response = await axios.delete(
      `https://joaogabriel2info3livraria.herokuapp.com/editoras/${id}`
    );
    return response.data;
  }

  async atualizarEditora(editora) {
    const response = await axios.put(
      `https://joaogabriel2info3livraria.herokuapp.com/editoras/${editora.id}`,
      editora
    );
    return response.data;
  }
}

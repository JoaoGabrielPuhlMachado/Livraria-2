<template>
  <header>
    <div class="menu">
      <span class="menu-title" style="cursor: pointer">| | | </span>
      <span class="menu-content">
        <span><RouterLink to="/">Livros</RouterLink></span>
        <span><RouterLink to="/categorias">Categorias</RouterLink></span>
        <span><RouterLink to="/autores">Autores</RouterLink></span>
        <span><RouterLink to="/editoras">Editoras</RouterLink></span>
        <span><RouterLink to="/login">Login</RouterLink></span>
      </span>
    </div>
  </header>
</template>
<style>
.menu {
  position: relative;
  display: block;
}
.menu-content {
  display: none;
}
.menu:hover .menu-title {
  font-weight: bolder;
}

.menu:hover .menu-content {
  display: inline;
}
</style>

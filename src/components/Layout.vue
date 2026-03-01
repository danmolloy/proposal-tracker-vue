<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { performLogout } from '../../auth';

const router = useRouter();

const onLogout = () => {
    performLogout(router);
     router.push('/login');
  
};

</script>

<template >
  <div  class="layout">
  <header class="header">
    <RouterLink to="/">Proposal Tracker</RouterLink>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
          <button @click="onLogout">Log Out</button>

    </nav>
  </header>
  <main class="main">
    <slot></slot>
  </main>
  <footer class="footer">
  </footer>
</div>
</template>

<style>
.layout {
  width: 100vw;
  position: absolute;
  top: 0em;
  left: 0em;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header {
  position: fixed;
  background-color: white;
  height: 4rem;
  border-bottom: solid;
  border-color: black;
  border-width: 1px;
  width: 100vw;
}
.main {
  margin-top: 4rem;
  padding: 2rem;
  min-height: 100vh -9rem;
  background-color: antiquewhite;
  flex: 1;
}
.footer {
  background-color: rgb(227, 254, 245);
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 5rem;
}

</style>
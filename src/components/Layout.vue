<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { performLogout } from '../../auth';
import { onMounted, ref, computed } from 'vue';

const token = ref(localStorage.getItem('user-token'))

const isLoggedIn = computed(() => !!token.value)

const router = useRouter();

const onLogout = () => {
    performLogout(router);
     router.push('/login');
};


</script>

<template >
  <div  class="layout">
  <header class="header">
    <RouterLink to="/" class="logo">Proposal Tracker</RouterLink>
    <nav>
      <RouterLink v-if="!isLoggedIn" to="/login" class="login-btn">Login</RouterLink>
          <button v-else @click="onLogout" class="login-btn">Log Out</button>

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
  border-width: 1px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;
  padding-left: 1rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  z-index: 10;
}
.logo {
  font-size: larger;
  font-weight: 500;
  color: black;
}
.main {
  margin-top: 4rem;
  min-height: 100vh -9rem;
  padding-top: 2rem;
  height:fit-content;
  padding-bottom: 6rem;
  background-color: oklch(98.5% 0.001 106.423);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer {
  background-color: oklch(97% 0.001 106.424);
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 5rem;
}
.login-btn {
  /* Layout & Spacing */
  margin: 4px;
  padding: 6px 16px; /* Increased padding for a better 'pill' or 'block' feel */
  min-width: 5rem;    /* min-width is safer than fixed width */
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Typography */
  font-size: 13px;
  font-weight: 600;
  text-decoration: none; /* In case it's a RouterLink */
  
  /* Colors & Borders */
  color: oklch(62.3% 0.214 259.815);
  background-color: white;
  border: 1.5px solid oklch(62.3% 0.214 259.815);
  border-radius: 6px;

  /* Animation */
  transition: all 0.2s ease-in-out;
}

.login-btn:hover {
  /* Subtle background tint and deeper border */
  background-color: oklch(96% 0.02 260); 
  border-color: oklch(54.6% 0.245 262.881);
  color: oklch(54.6% 0.245 262.881);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.login-btn:active {
  /* Slight push effect when clicked */
  transform: scale(0.96);
}

</style>
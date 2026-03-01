<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';
const baseURL = import.meta.env.VITE_BACKEND_URL;

const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
 try {
    const response = await axios.post(`${baseURL}/login?useCookies=false`, {
      email: email.value,
      password: password.value
    });

    // Save token for persistence
    localStorage.setItem('user-token', response.data.accessToken);
    
    // Immediately set it for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
    
    router.push('/'); 
  } catch (err) {
    alert(JSON.stringify(err))
    alert("Login failed! Check your credentials.");
  }
};

</script>

<template>
  <form @submit.prevent="handleLogin">
    <h1>Login</h1>
    <div>
      <input v-model="email" type="email" placeholder="Email" />
     <input v-model="password" type="password" placeholder="Password" />
  
    
      <button type="submit">Submit</button>
    </div>

  </form>
  <div>
    <RouterLink to="/register">Register as a new user</RouterLink>
  </div>
</template>

<style>
</style>
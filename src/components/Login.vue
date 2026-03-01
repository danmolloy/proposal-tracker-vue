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
  <div class="form">
  <form @submit.prevent="handleLogin" class="form-el">
    <h1>Login</h1>
    
      <input v-model="email" type="email" placeholder="Email"  class="input"/>
     <input v-model="password" type="password" placeholder="Password" class="input" />
  
    
      <button type="submit" class="btn">Submit</button>
    

  </form>
  <div>
    <RouterLink to="/register">Register as a new user</RouterLink>
  </div>
  </div>
</template>

<style>
.form {
  background-color: white;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  padding: 1rem;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
border-radius: 6px;
display: flex;
flex-direction: column;
align-items: center;

}
.form-el {
display: flex;
flex-direction: column;
align-items: center;
}
.input {
  margin: 4px;
  padding: 4px;
  width: 12rem;

}
.btn {

  margin: 4px;
  padding: 4px;
  width: 8rem;
  cursor: pointer;
  background-color: oklch(62.3% 0.214 259.815);
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  border-color: oklch(62.3% 0.214 259.815);
}
.btn:hover {
  background-color: oklch(54.6% 0.245 262.881);
  border-color: oklch(54.6% 0.245 262.881);

}
</style>
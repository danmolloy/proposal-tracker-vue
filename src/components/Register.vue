<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
  <h1>Register</h1>
  <div>

    <label for="email">Email
    <input type="email" id="email"/>
    </label>
  </div>
  <div>
    <label for="password">Password
    <input type="password" id="password"/>
    </label>
  </div>
  <div>
    <label for="password-confirm">Confirm Password
    <input type="password" id="password-confirm"/>
    </label>
  </div>

  <div>
    <button>Submit</button>
  </div>
  <div>
    <p>Already have an account?</p>
    <RouterLink to="/login">Login</RouterLink>
  </div>
</template>

<style>
</style>
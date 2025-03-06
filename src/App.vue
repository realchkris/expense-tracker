<template>

  <!-- Admin login -->
  <button v-if="!isAdmin" @click="loginAsAdmin">Login as Admin</button>
  <button v-if="isAdmin" @click="logoutAdmin">Logout</button>

  <!-- Homepage view -->
  <router-view :isAdmin="isAdmin" />

</template>

<script setup>

import { ref, onMounted } from "vue";

const isAdmin = ref(false);
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD; // Psw for Admin

console.log("Admin Password from .env:", adminPassword);

// Checks if the user is Admin
onMounted(() => {
  isAdmin.value = localStorage.getItem("isAdmin") === "true";
});

const loginAsAdmin = () => {
  const password = prompt("Enter admin password:");
  if (password === adminPassword) {
    localStorage.setItem("isAdmin", "true");
    isAdmin.value = true;
  } else {
    alert("Wrong password! Access denied.");
  }
};

const logoutAdmin = () => {
  localStorage.removeItem("isAdmin");
  isAdmin.value = false;
};

</script>
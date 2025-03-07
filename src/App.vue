<template>

  <div class="bg-gradient-to-t from-slate-300 to-gray-50">

    <!-- Header -->
    <div class="emerald-section relative flex items-center justify-center m-3">

      <!-- Home Button -->
      <div class="flex-1">
        <router-link to="/"
          v-if="!isHome"
          class="btn btn-teal"
        >🏠</router-link>
      </div>

      <h1
        class="text-2xl font-bold text-white text-center flex-1"
      >Expense Tracker</h1>

      <!-- Admin Login Section -->
      <div class="flex-1 flex justify-end space-x-2">

        <button v-if="!isAdmin" @click="loginAsAdmin"
          class="btn btn-teal"
        >Login Admin</button>

        <button v-if="isAdmin" @click="logoutAdmin"
          class="btn btn-red"
        >Logout</button>

      </div>

    </div>

    <!-- Homepage view -->
    <router-view :isAdmin="isAdmin" />
    
  </div>

</template>

<script setup>

import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const isAdmin = ref(false);
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD; // Psw for Admin
const route = useRoute(); // Get current route

// Dynamically check if the user is on the home page
const isHome = ref(route.path === "/");

// Watch for route changes to update isHome
watch(route, () => {
  isHome.value = route.path === "/";
});

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
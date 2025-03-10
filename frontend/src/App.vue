<template>

  <div class="bg-gradient-to-t from-slate-300 to-gray-50 min-h-screen flex flex-col p-3">

    <!-- Header -->
    <div class="emerald-section grid grid-cols-3 items-center gap-2 m-3 p-3">

      <!-- Pic & Home Button -->
      <div class="flex items-center justify-start relative w-16 h-16">

        <router-link to="/"
          v-if="!isHome"
          class="btn btn-teal absolute inset-0 flex items-center justify-center w-16 h-16"
        >

          <img
            src="./assets/home.png"
            class="w-12 h-12 object-contain shrink-0"
          >

        </router-link>

        <img
          v-else
          src="./assets/logo.png"
          class="absolute inset-0 object-contain w-16 h-16"
        >

      </div>

      <!-- Title -->
      <h1
        class="text-2xl font-bold text-white text-center"
      >Expense Tracker</h1>

      <!-- Admin Login Section -->
      <div class="flex justify-end space-x-2">

        <button
          v-if="!isAdmin"
          @click="loginAsAdmin"
          class="btn btn-teal w-16 h-16 flex items-center justify-center shrink-0"
        >
          <img
            src="./assets/administrator.png"
            class="w-12 h-12 object-contain shrink-0"
            alt="Admin Login"
          >
        </button>

        <button
          v-if="isAdmin"
          @click="logoutAdmin"
          class="btn btn-red w-16 h-16 flex items-center justify-center shrink-0"
        >
          <img
            src="./assets/logout.png"
            class="w-12 h-12 object-contain shrink-0"
            alt="Admin Logout"
          >
        </button>

        <!-- <button v-if="!isAdmin" @click="loginAsAdmin"
          class="btn btn-teal"
        >Login Admin</button>

        <button v-if="isAdmin" @click="logoutAdmin"
          class="btn btn-red"
        >Logout</button> -->

      </div>

    </div>

    <!-- Homepage view -->
    <router-view :isAdmin="isAdmin" class="flex-1 min-h-[400px] flex flex-col items-center" />
    
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
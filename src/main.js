import { createApp } from 'vue'

import App from './App.vue'

import './input.css';  // Import global Tailwind styles
import './output.css';  // Needed for Tailwind CSS

import { createPinia } from 'pinia'; // Needed for Pinia
import router from './router'; // Needed for Vue Router

const app = createApp(App);

console.log("Vue App is mounting...");

// Pinia stuff
const pinia = createPinia(); // Create Pinia instance

app.use(pinia); // Register Pinia globally BEFORE mounting
app.use(router); // Uses Router BEFORE mounting
app.mount("#app"); // Mount the app after Pinia is registered
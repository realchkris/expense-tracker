import { createApp } from 'vue'

// import App from './App.vue' // Imports the Local version
// import App from './AppAPI.vue' // Imports the API version
import App from './AppRouter.vue' // Imports the Router version

import './output.css';  // Needed for Tailwind CSS
import { createPinia } from 'pinia'; // Needed for Pinia
import router from './router'; // Needed for Vue Router

const app = createApp(App);

// Pinia stuff
const pinia = createPinia(); // Create Pinia instance

app.use(pinia); // Register Pinia globally BEFORE mounting
app.use(router); // Uses Router BEFORE mounting
app.mount("#app"); // Mount the app after Pinia is registered
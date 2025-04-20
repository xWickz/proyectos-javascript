import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// Fuentes personalizadas
import "@fontsource/inter";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";

const app = createApp(App)

app.use(router);
app.mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// Importar Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Importar Animate.css
import 'animate.css/animate.min.css';

const app = createApp(App);

app.use(router);

app.mount('#app');

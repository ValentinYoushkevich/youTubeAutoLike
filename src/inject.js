import { createApp } from 'vue'
import Widget from './pages/Widget.vue'

// Создаем контейнер
const container = document.createElement('div')
container.id = 'my-extension-widget'
document.body.appendChild(container)
console.log('Widget added')

// Монтируем Vue
createApp(Widget).mount('#my-extension-widget')

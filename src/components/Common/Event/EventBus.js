import Vue from 'vue'
export default {
    install(Vue) {
      const EventBus = new Vue()
      Vue.prototype.$bus = EventBus
      //console.log("eventBus:",EventBus)
    }
}
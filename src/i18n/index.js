import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    'en': require('./en.json'),
    'ja': require('./ja.json'),
    'cn': require('./cn.json')
  }
})

if (module.hot) {
  module.hot.accept(['./en.json', './ja.json', './cn.json'], () => {
    i18n.setLocaleMessage('en', require('./en.json'))
    i18n.setLocaleMessage('ja', require('./ja.json'))
    i18n.setLocaleMessage('cn', require('./cn.json'))
    console.log('hot reload', this, arguments)
  })
}
export default i18n
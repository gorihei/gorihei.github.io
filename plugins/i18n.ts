export default defineNuxtPlugin((nuxtApp) => {
  const { t } = useI18n()
  
  // Make $t available in templates
  nuxtApp.vueApp.config.globalProperties.$t = t
  
  return {
    provide: {
      t
    }
  }
})

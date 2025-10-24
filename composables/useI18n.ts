import { useStorage } from '@vueuse/core'
import enMessages from '~/locales/en.json'
import jaMessages from '~/locales/ja.json'

type Messages = typeof enMessages
type MessageKey = string

const messages: Record<string, Messages> = {
  en: enMessages,
  ja: jaMessages,
}

export const useI18n = () => {
  // Store locale in localStorage with 'en' as default
  const locale = useStorage('locale', 'en')
  
  const availableLocales = [
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
  ]

  const t = (key: MessageKey, params?: Record<string, any>): string => {
    const keys = key.split('.')
    let value: any = messages[locale.value]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    // Handle parameter replacement
    if (params && typeof value === 'string') {
      return value.replace(/\{(\w+)\}/g, (_, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : `{${paramKey}}`
      })
    }
    
    return typeof value === 'string' ? value : key
  }

  return {
    locale,
    availableLocales,
    t,
  }
}

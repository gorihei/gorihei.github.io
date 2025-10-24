import { useDark, useToggle } from '@vueuse/core'

export const useColorMode = () => {
  // Initialize dark mode with dark as default
  const isDark = useDark({
    initialValue: 'dark',
  })
  
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark,
  }
}

export const useToast = () => {
  const visible = ref(false)
  const message = ref('')
  const type = ref<'success' | 'error'>('success')

  const show = (msg: string, t: 'success' | 'error' = 'success') => {
    message.value = msg
    type.value = t
    visible.value = true

    setTimeout(() => {
      visible.value = false
    }, 3000)
  }

  return {
    visible,
    message,
    type,
    show
  }
}

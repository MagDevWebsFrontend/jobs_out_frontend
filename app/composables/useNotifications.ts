import { reactive } from 'vue';

/**
 * Tipo del helper api (useApi / $fetch wrapper)
 */
type ApiFn = <T = any>(
  url: string,
  options?: {
    method?: string;
    body?: any;
  }
) => Promise<T>;

/**
 * Payload de configuración de notificaciones
 * Ajusta los campos a tu modelo real
 */
export interface NotificationConfigPayload {
  email?: boolean;
  telegram?: boolean;
}

/**
 * Respuesta del endpoint de telegram code
 */
interface TelegramCodeResponse {
  data: {
    code: string;
    bot_link: string;
  };
}

export function useNotifications(api: ApiFn) {
  const state = reactive<{
    loading: boolean;
    error: unknown | null;
  }>({
    loading: false,
    error: null
  });

  async function updateNotificationConfig(
    userId: string,
    payload: NotificationConfigPayload
  ) {
    state.loading = true;
    state.error = null;

    try {
      const res = await api(
        `/api/usuarios/${userId}/notificaciones`,
        {
          method: 'PUT',
          body: payload
        }
      );

      return res;
    } catch (err) {
      state.error = err;
      throw err;
    } finally {
      state.loading = false;
    }
  }

  async function requestTelegramCode(
    userId: string
  ): Promise<TelegramCodeResponse['data']> {
    state.loading = true;
    state.error = null;

    try {
      const res = await api<TelegramCodeResponse>(
        `/api/usuarios/${userId}/telegram-code`,
        {
          method: 'POST'
        }
      );

      return res.data;
    } catch (err) {
      state.error = err;
      throw err;
    } finally {
      state.loading = false;
    }
  }

  return {
    state,
    updateNotificationConfig,
    requestTelegramCode
  };
}

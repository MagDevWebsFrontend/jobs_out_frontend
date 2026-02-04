// ~/composables/useAdminNotifications.ts
import { reactive } from 'vue';

type ApiFn = (url: string, options?: any) => Promise<any>;

export type BroadcastPayload = {
  message: string;
  audience: string;
  channels: string[]; // 'telegram' | 'email' | 'whatsapp'
};

export function useAdminNotifications(api: ApiFn) {
  const state = reactive({
    loading: false,
    error: null as any
  });

  async function sendBroadcast(payload: BroadcastPayload) {
    state.loading = true;
    state.error = null;
    try {
      const res = await api('/api/admin/notifications', {
        method: 'POST',
        body: payload
      });
      state.loading = false;
      return res;
    } catch (err) {
      state.error = err;
      state.loading = false;
      throw err;
    }
  }

  return { state, sendBroadcast };
}

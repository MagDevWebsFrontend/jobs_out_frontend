<template>
  <section class="p-4 sm:p-6">
    <h1 class="text-2xl font-bold mb-4">Usuarios del Sistema</h1>

    <UsersTable
      :users="usersStore.users"
      :loading="usersStore.loading"
      @view="onViewUser"
    />

    <UserDetailModal
      v-if="selectedUser"
      :user="selectedUser"
      @close="selectedUser = null"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from '#shared/types/user'
import { useUsersStore } from '~/stores/admin/users'

import UsersTable from '~/components/admin/UsersTable.vue'
import UserDetailModal from '~/components/admin/UserDetailModal.vue'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
  title: 'Usuarios'
})

const usersStore = useUsersStore()
const selectedUser = ref<User | null>(null)

const onViewUser = (user: User) => {
  selectedUser.value = user
}

onMounted(() => {
  usersStore.fetchUsers(1, 10, '')
})
</script>

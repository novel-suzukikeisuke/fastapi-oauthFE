<template>
  <v-container>
    <h1>ユーザー一覧</h1>
    <v-row>
      <v-col
        v-for="user in users"
        :key="user.id"
        cols="4"
        class="mb-4"
      >
        <v-card>
          <v-card-title>
            <v-icon class="mr-2">{{ user.disabled ? 'mdi-account-off' : 'mdi-account' }}</v-icon>
            {{ user.username }}
          </v-card-title>
          <v-card-subtitle>
            {{ user.email }}
          </v-card-subtitle>
          <v-card-text>
            <div>
              <strong>ID:</strong> {{ user.id }}
            </div>
            <div>
              <strong>ステータス:</strong> <span>{{ user.disabled ? '無効' : '有効' }}</span>
            </div>
            <div>
              <strong>役割:</strong>
              <span v-if="user.role === UserRole.ADMIN">管理者</span>
              <span v-else-if="user.role === UserRole.USER">ユーザー</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <updateDialog :user="user" @userFetch="fetchUsers" />
            <disabledDialog :user="user" @userFetch="fetchUsers" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUser } from '~/composables/useUser';
import updateDialog from '~/components/users/updateDialog.vue';
import disabledDialog from '~/components/users/disabledDialog.vue';
import { UserRole } from '~/constants/userRole';

const { users, fetchUsers } = useUser(); // useUserフックからデータを取得

// ページがマウントされたらユーザー情報を取得
onMounted(fetchUsers);
</script>

<style scoped>
</style>

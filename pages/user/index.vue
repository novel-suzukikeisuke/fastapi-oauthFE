<template>
  <v-container>
    <v-row>
      <v-col
        v-for="user in users"
        :key="user.id"
        cols="12" sm="6" md="4" lg="3"
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
              <strong>ステータス:</strong> <span :class="{'text-danger': user.disabled}">{{ user.disabled ? '無効' : '有効' }}</span>
            </div>
            <div>
              <strong>役割:</strong> {{ user.role }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUser } from '~/composables/useUser';

const { users, error, fetchUsers } = useUser(); // useUserフックからデータを取得

// ページがマウントされたらユーザー情報を取得
onMounted(fetchUsers);
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.3s;
}

.v-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
</style>

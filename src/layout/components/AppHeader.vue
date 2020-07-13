<template>
  <el-row class="header">
    <el-col :span="12">
      <h2>TODO LIST</h2>
    </el-col>
    <el-col :span="12">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-user-solid el-icon--left" />
          {{ email }}
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown" style="text-align: center">
          <el-dropdown-item>
            Thông tin
          </el-dropdown-item>
          <el-button class="btn-logout" icon="el-icon-switch-button" @click="handleLogout()">
            Đăng xuất
          </el-button>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import userServices from '@/lib/userServices'

export default {
  name: 'AppHeader',
  data() {
    return {
      email: userServices.userData().email
    }
  },
  methods: {
    handleLogout() {
      userServices.signOut()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss">
.header {
  display: flex;
  text-align: center;
  align-items: center;
  .el-dropdown-link{
    font-size: 15px;
    cursor: pointer;
  }
}
</style>

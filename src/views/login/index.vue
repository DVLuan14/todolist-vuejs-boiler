<template>
  <el-form>
    <div class="login">
      <div class="screen">
        <div class="tittle"><h1>ĐĂNG NHẬP</h1></div>
        <el-form class="navsi">
          <el-form-item
            prop="email"
            label="Email*"
            class="email"
            :rules="rules"
          >
            <el-input v-model="email" placeholder="Email" type="text" />
          </el-form-item>
          <el-form-item
            prop="password"
            label="Password"
            class="password"
          >
            <el-input v-model="password" placeholder="Password" type="password" />
          </el-form-item>
          <hr>
          <el-form-item v-loading="loading">
            <el-button
              class="btn-signin"
              type="primary"
              style="width: 100%"
              @click="signIn()"
            >Đăng nhập</el-button>
          </el-form-item>
          <el-form-item class="signup">
            <p>Chưa có tài khoản?</p>
            <router-link style="margin-left: 5px" to>
              <p> Đăng ký</p>
            </router-link>
          </el-form-item>
          <div class="footersi"><p>Coppyright @2020</p></div>
        </el-form>
      </div>
    </div>
  </el-form>
</template>
<script>
import authServices from '@/services/auth'
import userServices from '@/lib/userServices'

export default {
  name: 'Login',
  data() {
    return {
      email: 'admin@example.com',
      password: 'password',
      rules: {
        email: ''
      },
      loading: false
    }
  },
  methods: {
    signIn() {
      this.loading = true
      authServices.login({ email: this.email, password: this.password })
        .then((response) => {
          userServices.updateUserData(response.data)
          this.$router.push('/')
        }).catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scope>
.login{
  width: 20%;
  text-align: center;
  align-items: center;
  margin: auto;
  border: 1px solid #cccccc;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 6px 2px 15px #cccccc;
  .signup .el-form-item__content{
    display: flex;
    justify-content: center;
    a{
      text-decoration: none;
      color:#007bff;
    }
  }
}
</style>

<template>
  <el-form
    :data="listItem"
    append-to-body
    border
    width="50%"
    class="smallTodos"
  >
    <el-form-item class="back-home">
      <router-link to="/">
        <el-icon class="el-icon-back" />
        <h4>Trở lại trang chủ</h4>
      </router-link>
    </el-form-item>
    <el-form-item>
      <div class="title">
        <h2>{{ listItem.title }}</h2>
      </div>
      <div v-loading="loading">
        <strong style="float: left">Việc cần làm:</strong>
        <br>
        <div class="list-items">
          <el-form
            v-for="item in listItem"
            :key="item.id"
            prop="content"
          >
            <el-checkbox
              v-model="item.done"
              type="radio"
              @change.native="checkedItems(item, $event)"
            >{{ item.content }}</el-checkbox>
          </el-form>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import todosServices from '@/services/todos'

export default {
  name: 'SmallTodo',
  data() {
    return {
      listItem: [],
      form: {
        content: ''
      },
      loading: false
    }
  },
  beforeMount() {
    this.getListItems()
  },
  methods: {
    async getListItems() {
      this.loading = true
      await todosServices.getItem(this.$route.params.id).then((response) => {
        this.listItem = response.data.map((item) => ({
          ...item,
          isCreating: false,
          isEditing: false
        }))
        this.loading = false
      })
    },
    checkedItems(item) {
      todosServices.checkedTodoItem(this.$route.params.id, item.id, { done: item.done }).then(() => {
        this.loading - false
      })
      this.$message({
        title: 'Thông báo',
        type: 'success',
        message: 'Cập nhật thành công.'
      })
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scope>
.dialog-SmallTodos{
  .el-dialog__header{
    padding: 0;
  }
  .title{
    text-align: center;
  }
  display: block;
  .list-items{
    margin: 10px 0;
  }
}
.smallTodos {
  width: 50%;
  margin: auto;
  margin-top: 20px;
  .back-home .router-link-active{
    display: flex;
    align-items: center;
    height: 15px;
    width: 20%;
    .el-icon-back{
      margin-right: 10px;
    }
  }
}
</style>

<template>
  <el-dialog
    v-if="visible"
    :data="listItems"
    class="dialog-SmallTodos"
    :visible="visible"
    append-to-body
    width="18%"
    style="display: block;"
    @close="handleClose"
  >
    <div class="title">
      <h2>{{ data.title }}</h2>
    </div>
    <div v-loading="loading">
      <strong style="float: left">Việc cần làm:</strong>
      <br>
      <div class="list-items">
        <el-form v-for="item in listItems" :key="item.id">
          <el-checkbox
            v-model="item.done"
            type="radio"
            @change.native="checkedItems(item, $event)"
          >{{ item.content }}</el-checkbox>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose()">Close</el-button>
    </span>
  </el-dialog>
</template>
<script>
import todosServices from '@/services/todos'

export default {
  name: 'SmallTodo',
  props: {
    data: Object,
    visible: Boolean
  },
  data() {
    return {
      listItems: [],
      loading: false
    }
  },
  watch: {
    visible: 'getListItems'
  },
  methods: {
    getListItems() {
      this.loading = true
      todosServices.getItem(this.data.id).then((response) => {
        this.listItems = response.data.map((item) => ({
          ...item,
          isCreating: false,
          isEditing: false
        }))
        this.loading = false
      })
    },
    checkedItems(item) {
      todosServices.checkedTodoItem(this.data.id, item.id, { done: item.done }).then(() => {
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
</style>

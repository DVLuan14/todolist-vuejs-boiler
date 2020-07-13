<template>
  <el-dialog
    v-if="visible"
    class="dialog-edit"
    :visible="visible"
    append-to-body
    width="20%"
    title="Sửa"
    @close="handleClose"
  >
    <div v-loading="loading">
      <el-row type="flex" align="middle">
        <el-form
          ref="form"
          class="form-edit"
          :model="form"
        >
          <el-form-item>
            <el-input
              id="title-input"
              v-model="form.title"
              width="100%"
              class="form-title"
              size="small"
            />
          </el-form-item>
        </el-form>
      </el-row>
      <el-form>
        <strong>Việc cần làm:</strong>
      </el-form>
      <el-form
        v-for="item in listItems"
        :key="item.id"
        :model="selectedItem"
        prop="title"
        class="item-list"
      >
        <span v-if="!item.isCreating">{{ item.content }}</span>
        <el-input
          v-else
          id="title-content-input"
          v-model="selectedItem.content"
          prop="content"
          class="form-content"
          size="small"
        />
        <div v-if="!item.isCreating" style="float: right">
          <el-button class="btn-action" type="text" @click="handleEditTodoItem(item)">
            <el-icon class="el-icon-edit" />
          </el-button>
          <el-button class="btn-action" type="text" @click="handleDeleteTodoItem(item)">
            <el-icon class="el-icon-delete" style="color: red" />
          </el-button>
        </div>
        <div v-if="item.isCreating" class="btn-action-todos">
          <el-button
            class="btn-action"
            type="text"
            @click="handleSaveItem(item)"
          >
            <el-icon class="el-icon-check" />
          </el-button>
          <el-button
            style="color: red"
            class="btn-action"
            type="text"
            @click="handleCancelForm()"
          >
            <el-icon class="el-icon-close" />
          </el-button>
        </div>
      </el-form>
      <el-button type="text" style="float: left" @click="handleCreateItem()">Thêm mới</el-button>
    </div>
    <template>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateTitle(data.id)">Lưu</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import todosServices from '@/services/todos'

export default {
  name: 'EditTodo',
  props: {
    data: Object,
    visible: Boolean
  },
  data() {
    // const validateContent = (rule, value, callback) => {
    //   const exitedRow = this.listItems.find((row) => row.content === value && !row.isEditing)
    //   if (value === '') {
    //     callback(new Error('Công việc không được để trống.'))
    //   } else if (exitedRow) {
    //     callback(new Error('Công việc đã tồn tại.'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      listItems: [],
      form: {
        title: ''
      },
      selectedItem: {
        content: ''
      },
      // rules: {
      //   content: [
      //     { validator: validateContent, trigger: blur }
      //   ]
      // },
      loading: false
    }
  },
  beforeMount() {
    this.getAllItem()
  },
  methods: {
    async getAllItem() {
      this.form.title = this.data.title
      this.loading = true
      await todosServices.getItem(this.data.id).then((response) => {
        this.listItems = response.data.map((item) => ({
          ...item,
          isEditing: false,
          isCreating: false
        }))
        this.loading = false
      })
    },
    async updateTitle(id) {
      this.loading = true
      await todosServices.updateTodo(id, { title: this.form.title }).then(() => {
        this.getAllItem()
        this.handleClose()
        this.$message({
          title: 'Thông báo',
          type: 'success',
          message: 'Cập nhật tiêu đề thành công.'
        })
        this.loading = false
      })
    },
    handleClose() {
      this.$emit('close')
    },
    handleCreateItem() {
      this.handleCancelForm()
      const newItem = {
        content: '',
        isEditing: true,
        isCreating: true
      }
      this.selectedItem.content = newItem.content
      this.listItems.unshift(newItem)
      this.$nextTick(() => {
        const input = document.getElementById('title-content-input')
        if (input) input.select()
      })
    },
    handleEditTodoItem(item) {
      this.handleCancelForm()
      this.selectedItem = item
      this.listItems = this.listItems.map((i) => ({
        ...i,
        isCreating: i.id === item.id
      }))
      this.$nextTick(() => {
        const input = document.getElementById('title-content-input')
        if (input) input.select()
      })
    },
    handleSaveItem(item) {
      if (item.id) {
        this.loading = true
        todosServices.updateItem(this.data.id, item.id,
          { content: this.selectedItem.content }).then(() => {
          this.loading = false
          this.listItems = this.listItems.map((i) => ({
            ...i,
            content: i.id === item.id ? this.selectedItem.content : i.content,
            isCreating: false
          }))
          this.$message({
            title: 'Thông báo',
            type: 'success',
            message: 'Cập nhật thành công.'
          })
        })
      } else {
        todosServices.createItem(
          this.data.id,
          { content: this.selectedItem.content }
        ).then((response) => {
          this.loading = false
          this.listItems = this.listItems.map((i) => ({
            ...i,
            id: i.id ? i.id : response.id,
            isCreating: false
          }))
          this.getAllItem()
          this.$message({
            title: 'Thông báo',
            type: 'success',
            message: 'Thêm mới thành công.'
          })
        })
      }
    },
    handleCancelForm() {
      const currentItem = this.listItems.findIndex((c) => !c.id)
      if (currentItem >= 0) {
        this.listItems.splice(currentItem, 1)
      }
      this.selectedItem = {
        content: ''
      }
      this.listItems = this.listItems.map((item) => ({
        ...item,
        isEditing: false,
        isCreating: false
      }))
    },
    handleDeleteTodoItem(item) {
      todosServices.deleteItem(this.data.id, item.id).then(() => {
        this.getAllItem()
        this.$message({
          title: 'Thông báo',
          type: 'success',
          message: 'Xóa thành công.'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dialog-edit{
  text-align: center;
  display: block;
  .form-edit{
    width: 100%;
  }
  .item-list{
    display: flex;
    justify-content: space-between;
    .btn-action-todos{
      display: flex;
      height: 33px;
      margin-left: 10px;
    }
  }
}
</style>

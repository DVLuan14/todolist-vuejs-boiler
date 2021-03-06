<template>
  <div class="app-container">
    <div class="search">
      <template>
        <el-input
          v-model="input"
          size="mini"
          placeholder="Type to search"
          style="width: 150px"
          @input="searchItem"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>
        <el-button
          icon="el-icon-circle-plus-outline"
          type="success"
          size="mini"
          @click="handleCreateTodo()"
        >Tạo mới</el-button>
      </template>
    </div>
    <el-table v-loading="callingAPI" :data="listTodos" style="width: 100%" border>
      <el-table-column width="80" align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tên công việc">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <el-form
              v-if="scope.row.isCreating"
              ref="form"
              :key="'edit-form'"
              class="form-edit"
              :model="form"
              :rules="rules"
            >
              <el-form-item prop="title">
                <el-input id="title-input" v-model="form.title" class="form-title" size="small" />
              </el-form-item>
              <div v-loading="loading" class="action">
                <el-button class="btn-action" type="text" @click="handleSaveCreate()">
                  <el-icon class="el-icon-check" />
                </el-button>
                <el-button class="btn-action" type="text" @click="handleCancelForm()">
                  <el-icon class="el-icon-close" />
                </el-button>
              </div>
            </el-form>
            <router-link type="primary" :to="{ name: 'details', params: { id: scope.row.id }}">
              <span @click="openSmallTodos(scope.row)">{{ scope.row.title }}</span>
            </router-link>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" class="selecRight" align="center" width="200">
        <template slot-scope="scope">
          <el-row v-if="!scope.row.isCreating">
            <el-button size="mini" icon="el-icon-edit" @click="openEdit(scope.row)">Sửa</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="openDeletePopup(scope.row)"
            >Xóa</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :page-count="totalPage"
      :current-page="currentPage"
      @current-change="changePage"
    />
    <confirm-delete
      :data="selectedRow"
      :visible="visibleDeletePopup"
      @confirm="handleDelete"
      @close="visibleDeletePopup = false"
    />
    <edit-todos
      v-if="visibleEdit"
      :data="selectedRow"
      :visible="visibleEdit"
      @close="visibleEdit = false"
    />
    <!-- <small-todos
      :data="selectedRow"
      :visible="visibleSmallTodos"
      @close="visibleSmallTodos = false"
    /> -->
  </div>
</template>

<script>
import todosServices from '@/services/todos'
import confirmDelete from '@/components/ListTodos/confirmDelete'
import editTodos from '@/components/ListTodos/editTodo'
import axios from 'axios'
import userServices from '@/lib/userServices'
// import smallTodos from './smallTodos.vue'

export default {
  name: 'List',
  components: {
    confirmDelete,
    editTodos
    // smallTodos
  },
  props: {},
  data() {
    const validateTitle = (rule, value, callback) => {
      const existedRow = this.listTodos.find((row) => row.title === value && !row.isEditing)
      if (value === '') {
        callback(new Error('Tiêu đề không được để trống.'))
      } else if (existedRow) {
        callback(new Error('Tiêu đề đã tồn tại.'))
      } else {
        callback()
      }
    }
    return {
      callingAPI: false,
      loading: false,
      input: '',
      listTodos: [],
      form: {
        title: ''
      },
      rules: {
        title: [
          { validator: validateTitle, trigger: 'blur' }
        ]
      },
      visibleDeletePopup: false,
      visibleEdit: false,
      visibleSmallTodos: false,
      selectedRow: null,
      currentPage: 1,
      totalPage: 0
    }
  },
  beforeMount() {
    this.getListTodos()
  },
  methods: {
    async getListTodos() {
      this.callingAPI = true
      await todosServices.getAll({ page: this.currentPage, limit: 5 }).then((res) => {
        this.listTodos = res.data.map((todo) => ({
          ...todo,
          isCreating: false,
          isEditing: false
        }))
        this.totalPage = parseInt(res.headers['x-total-pages'], 0)
        this.callingAPI = false
      }).catch((e) => {
        if (e.status === 422) {
          this.$router.push('/login')
        }
      })
    },
    handleCreateTodo() {
      this.handleCancelForm()
      const newTitle = {
        title: '',
        isCreating: true
      }
      this.form.title = newTitle.title
      this.listTodos.unshift(newTitle)
      this.$nextTick(() => {
        const input = document.getElementById('title-input')
        if (input) input.select()
      })
    },
    handleSaveCreate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          todosServices.createTodo({ title: this.form.title }).then(() => {
            this.getListTodos()
            this.$message({
              title: 'Thông báo',
              type: 'success',
              message: 'Thêm mới thành công.'
            })
          })
        }
      })
    },
    handleCancelForm() {
      const currentTodo = this.listTodos.findIndex((t) => t.isEditing || t.isCreating)
      if (currentTodo < 0) {
        return
      }
      if (this.listTodos[currentTodo].isCreating) {
        this.listTodos.splice(currentTodo, 1)
      }
      this.listTodos = this.listTodos.map((item) => ({
        ...item,
        isEditing: false,
        isCreating: false
      }))
    },
    openSmallTodos(todo) {
      this.$route.params.id
      this.selectedRow = todo
      // this.visibleSmallTodos = true
    },
    openEdit(todo) {
      this.selectedRow = todo
      this.visibleEdit = true
      this.$nextTick(() => {
        const input = document.getElementById('title-input')
        if (input) input.select()
      })
    },
    openDeletePopup(todo) {
      this.selectedRow = todo
      this.visibleDeletePopup = true
    },
    async handleDelete(id) {
      await todosServices.deleteTodo(id).then(() => {
        this.visibleDeletePopup = false
        this.getListTodos()
        this.$message({
          title: 'Thông báo',
          type: 'success',
          message: 'Xóa thành công.'
        })
      })
    },
    async searchItem(keyword) {
      const res = await this.handleSearch(keyword, this.currentPage, 5)
      this.listTodos = res.data
      this.totalPage = parseInt(res.headers['x-total-pages'], 0)
    },
    handleSearch(text) {
      return axios({
        method: 'get',
        url: `https://mockup-api.herokuapp.com/api/v1/todos/search?page=${this.currentPage}&limit=5&q=${text}`,
        headers: {
          Authorization: userServices.userData().auth_token,
          'Content-Type': 'application/json'
        }
      })
    },
    changePage(value) {
      this.loading = true
      this.currentPage = value
      setTimeout(() => {
        this.loading = false
      }, 1000)
      this.getListTodos()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 50%;
  margin: auto;
  .search {
    width: 250px;
    float: right;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .el-table .cell {
    display: flex;
  }
  .form-edit {
    display: flex;
    .action {
      display: flex;
      margin-left: 10px;
      .button {
        font-size: 20px;
      }
      .el-icon-close {
        color: red;
      }
    }
  }
  .pagination {
    text-align: center;
    margin: 10px;
  }
}
.btn-action {
  display: flex;
}
</style>

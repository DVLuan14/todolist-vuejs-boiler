import ENDPOINT from '@/config/endpoint'
import { headers } from '@/lib/common'
import axios from 'axios'

function getAll(params) {
  return axios({
    methods: 'GET',
    url: ENDPOINT.TODOS,
    headers: headers(),
    params
  })
}
function createTodo(params) {
  return axios({
    method: 'POST',
    url: ENDPOINT.TODOS,
    headers: headers(),
    params
  })
}
function deleteTodo(id) {
  return axios({
    method: 'DELETE',
    url: `${ENDPOINT.TODOS}/${id}`,
    headers: headers()
  })
}
function updateTodo(id, data) {
  return axios({
    method: 'PUT',
    url: `${ENDPOINT.TODOS}/${id}`,
    headers: headers(),
    data
  })
}
function getItem(todoid) {
  return axios({
    method: 'GET',
    url: `${ENDPOINT.TODOS}/${todoid}/items`,
    headers: headers()
  })
}
function updateItem(todoId, id, data) {
  return axios({
    method: 'PUT',
    url: `${ENDPOINT.TODOS}/${todoId}/items/${id}`,
    headers: headers(),
    data
  })
}
function createItem(todoId, data) {
  return axios({
    method: 'POST',
    url: `${ENDPOINT.TODOS}/${todoId}/items/`,
    headers: headers(),
    data
  })
}
function deleteItem(todoId, id) {
  return axios({
    method: 'DELETE',
    url: `${ENDPOINT.TODOS}/${todoId}/items/${id}`,
    headers: headers()
  })
}

export default {
  getAll,
  createTodo,
  deleteTodo,
  updateTodo,
  getItem,
  updateItem,
  createItem,
  deleteItem
}

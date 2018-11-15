import axios from 'axios'
import { createError } from './util'

const request = axios.create({
  baseURL: process.env.VUE_ENV === 'server' ? 'http://127.0.0.1:3333' : '/'
})

const handleRequest = (request) => {
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data;

      if (!data) {
        return reject(createError(400, 'no data'));
      }

      if (!data.success) {
        return reject(createError(400, data.message));
      }

      resolve(data.data);
    }).catch(err => {
      const resp = err.response;
      console.log('-----------', resp);
      if (resp.status === 401) {
        reject(createError(401, 'need auth'));
      }
      reject(createError(resp.status, resp.data.message))
    });
  })
}

export default {
  getAllTodos () {
    console.log('getalltodos...')
    return handleRequest(request.get('/api/todos'));
  },
  login (username, password) {
    return handleRequest(request.post('/user/login', {username, password}));
  },
  updateTodo (id, todo) {
    return handleRequest(request.put(`/api/todo/${id}`, todo))
  },
  createTodo (todo) {
    return handleRequest(request.post(`/api/todo`, todo))
  },
  deleteTodo (id, todo) {
    return handleRequest(request.delete(`/api/todo/${id}`, todo))
  },
  deleteAllCompleted (ids) {
    return handleRequest(request.post(`/api/delete/completed`, {ids}))
  }
}

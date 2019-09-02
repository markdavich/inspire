export const _userName = 'Mark-Davich'
export const API = {
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/',
  weather: 'weather',
  quotes: 'quotes',
  images: 'images',
  todos: 'todos',
  getTodos(userName) {
    return `${userName}/${this.todos}`
  },
  putTodo(todoId, userName) {
    return `${userName}/${todoId}`
  },
  deleteTodo(todoId, userName) {
    return `${userName}/${todoId}`
  }
}
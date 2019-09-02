export const API = {
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/',
  weather: 'weather',
  quotes: 'quotes',
  images: 'images',
  todos: 'todos',
  /**
   * 
   * @param {string} userName The users name
   */
  getTodos(userName) {
    return `${userName}/${this.todos}`
  },
  /**
   * 
   * @param {string} todoId _id provided by the schema
   * @param {string} userName 
   */
  putTodo(todoId, userName) {
    return `${userName}/${todoId}`
  },
  /**
   * 
   * @param {string} todoId _id provided by the schema
   * @param {string} userName
   */
  deleteTodo(todoId, userName) {
    return `${userName}/${todoId}`
  }
}
export const API = {
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/',
  weather: 'weather',
  quotes: 'quotes',
  images: 'images',
  todos: 'todos',
  /**
   * @param {string} userName 
   */
  getEndPoint(userName) {
    return `${this.baseURL}${userName}/${this.todos}`
  },
  putEndPoint(todoId, userName) {
    return `${this.getEndPoint(userName)}/${todoId}`
  },
  deleteEndPoint(todoId, userName) {
    return `${this.getEndPoint(userName)}/${todoId}`
  }
}
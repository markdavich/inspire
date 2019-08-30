// {
//   //the server will create these properties for you
//   _id: { type: String, required: true, unique: true }
//   completed: { type: Boolean, required: true, default: false },
//   user: { type: String, required: true },
//   //You will need to provide a description
//   description: { type: String, required: true },
// }

export class TodoStruct {
  constructor(
    {
      _id = '',
      completed = false,
      user = '',
      description = ''

    } = {}
  ) {
    this._id = _id
    this.completed = completed
    this.user = user
    this.description = description
  }
}

export class Todo {
  /**
   * @param {TodoStruct} toDoStruct 
   */
  constructor(toDoStruct) {
    this._id = toDoStruct._id
    this.completed = toDoStruct.completed
    this.user = toDoStruct.user
    this.description = toDoStruct.description
  }

  static get TodoForm() {
    let template = `
            <form id="${Todo.MVC.DOM.todoForm}" onsubmit="${_event(Todo.MVC.METHODS.addTodo)}(event)">
                <div class="list card border-secondary">
                    <div class="card-header header">
                        Do these...
                    </div>
                    <div class="input-group mb-3">
                        <input id="${Todo.MVC.DOM.newTodoItemDescription}" type="text" placeholder="New List Item" class="form-control">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-success form-control">also...</button>
                        </div>
                    </div>
                    <div id="${Todo.MVC.DOM.todosContainer}" class="card-body text-secondary>
                        Todo Items Injected Here
                    </div>
                </div>
            </form>
        `
    return template
  }
  static MVC = {
    CONTROLLER: {
      ROUTE: 'app.controllers.todoController.'
    },
    STATE: {
      todos: 'todos',
      error: 'error'
    },
    METHODS: {
      toggleTodoStatus: 'toggleTodoStatus',
      removeTodo: 'removeTodo',
      addTodo: 'addTodo'
    },
    DOM: {
      todoError: 'todo-error',
      todosContainer: 'todos-container',
      todoForm: 'todo-form',
      todoFormContainer: 'todo-form-container',
      newTodoItemDescription: 'new-todo-item-description'
    }
  }
}

function _route() {
  let result = `${Todo.MVC.CONTROLLER.ROUTE}`
  return result
}

function _event(method) {
  let result = `${_route()}${method}`
  return result
}

function _deleteClick(toDo) {
  let result = `onclick = "${_event(Todo.MVC.METHODS.removeTodo)}(${toDo._id})"`
  return result
}

function _setStatus(toDo) {
  let result = `onchange = "${_event(Todo.MVC.METHODS.toggleTodoStatus)}(${toDo._id})"`
  return result
}

function _getStyle(toDo) {
  let result = toDo.completed ? 'checked' : ''
  return result
}
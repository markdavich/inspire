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
      description = {
        text: '',
        allotedTime: 0,
        timeUsed: 0,
        timerStartedAt: 0,
        timerStoppedAt: 0,
        timerIsRunning: false,
        deadline: 0
      }

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
  get Template() {
    let template = `
      <div class="input-group input-group-sm mb-1">
        <div class="input-group-prepend">
          <div class="input-group-text no-background">
            <input id="check-${this._id}" ${_setStatus(this)} type="checkbox" ${_isChecked(this)}>
          </div>
        </div>
        <input id="text-${this._id}" type="text" class="form-control ${_getStyle(this)} no-background" value="${this.description}" readonly>
        <div class="input-group-append">
          <button type="button" class="btn no-background">
            <div class="icon timer"></div>
          </button>
          <button type="button" class="btn no-background">
            <div class="icon date"></div>
          </button>
          <button ${_deleteClick(this)} type="button" class="btn no-background">
            <div class="icon delete"></div>
          </button>
        </div>
      </div>
    `
    return template
  }

  static get TodoForm() {
    let template = `
        <form class="tile" id="${Todo.MVC.DOM.todoForm}" onsubmit="${_event(Todo.MVC.METHODS.addTodo)}(event)">
          <div id="${Todo.MVC.DOM.todoListTitle}" class="card-header header">
              Do these...
          </div>
          <div class="input-group mb-3">
              <input id="${Todo.MVC.DOM.newTodoItemDescription}" type="text" placeholder="New List Item" class="form-control">
              <div class="input-group-append">
                  <button id="${Todo.MVC.DOM.newTodoItem}" type="submit" class="btn btn-success form-control">also...</button>
              </div>
          </div>
          <div id="${Todo.MVC.DOM.todoItemsTemplate}" class="card-body text-secondary">
              Todo Items Injected Here
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
      todoFormTemplate: 'todo-form-template',
      todoForm: 'todo-form',
      todoItemsTemplate: 'todo-items-template',
      todoError: 'todo-error',
      newTodoItemDescription: 'new-todo-item-description',
      todoListTitle: 'todo-list-title',
      newTodoItem: 'new-todo-item'
    }
  }

  /**
   * 
   * @param {Array.<Todo>} todos 
   */
  static setTitle(todos) {
    let initialValue = 0

    let count = todos.reduce((accumulator, todo) => {
      if (!todo.completed) {
        return accumulator + 1
      } else {
        return accumulator
      }
    }, initialValue)

    document.getElementById(Todo.MVC.DOM.todoListTitle).innerHTML = count === 0 ?
      `Nothing to do` :
      (count === 1 ? 'One thing' : `Do these... (${count})`)
      

    document.getElementById(Todo.MVC.DOM.newTodoItem).innerHTML = count > 0 ?
      'also...' :
      'Do this'
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
  let result = `onclick = "${_event(Todo.MVC.METHODS.removeTodo)}(event, '${toDo._id}')"`
  return result
}

function _setStatus(toDo) {
  let result = `onchange = "${_event(Todo.MVC.METHODS.toggleTodoStatus)}(event, '${toDo._id}')"`
  return result
}

function _getStyle(toDo) {
  let result = toDo.completed ? 'checked' : ''
  return result
}

function _isChecked(toDo) {
  return toDo.completed ? 'checked' : ''
}
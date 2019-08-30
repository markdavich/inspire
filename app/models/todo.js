    // {
    //   //the server will create these properties for you
    //   _id: { type: String, required: true, unique: true }
    //   completed: { type: Boolean, required: true, default: false },
    //   user: { type: String, required: true },
    //   //You will need to provide a description
    //   description: { type: String, required: true },
    // }

export class ToDoStruct {
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

export class ToDo{
  /**
   * @param {ToDoStruct} toDoStruct 
   */
  constructor(toDoStruct) {
    this._id = toDoStruct._id
    this.completed = toDoStruct.completed
    this.user = toDoStruct.user
    this.description = toDoStruct.description
  }

  static get TodoContainer() {
    let template = `
            <form id="${ToDo.MVC.DOM.todoTemplate}" onsubmit="${_event(ToDo.MVC.METHODS.addTodo)}(event)">
                <div class="list card border-secondary">
                    <div class="card-header header">
                        Do these...
                    </div>
                    <div class="input-group mb-3">
                        <input id="${ToDo.MVC.DOM.newTodoItemName}" type="text" placeholder="New List Item" class="form-control">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-success form-control">also...</button>
                        </div>
                    </div>
                    <div id="${ToDo.MVC.DOM.todosContainer}" class="card-body text-secondary>
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
      todos: 'todos',
      todosContainer: 'todos-container',
      todoTemplate: 'todo-form',
      newTodoItemName: 'new-todo-item-name'
    }
  }
}

function _route() {
  return `${ToDo.MVC.CONTROLLER.ROUTE}`
}

function _event(method) {
  return `${_route}${method}`
}

function _deleteClick(toDo) {
  return `onclick = "${_event(ToDo.MVC.METHODS.removeTodo)}(${toDo._id})"`
}

function _setStatus(toDo) {
  return `onchange = "${_event(ToDo.MVC.METHODS.toggleTodoStatus)}(${toDo._id})"`
}

function _getStyle(toDo) {
  return toDo.completed ? 'checked' : ''
}
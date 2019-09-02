import TodoService from "../services/todo-service.js";
import { TodoStruct, Todo } from "../models/todo.js";

const _userName = 'Mark-Davich'

const _todoService = new TodoService()

//TODO Create the render function
function _drawTodos() {
	_drawTodosForm()
	let todos = _todoService.Todos
	let template = ''
	todos.forEach(todo => { template += todo.Template })
	document.getElementById(Todo.MVC.DOM.todoItemsTemplate).innerHTML = template
	document.getElementById(Todo.MVC.DOM.newTodoItemDescription).focus()
}

function _drawTodosForm() {
	let formTemplate = Todo.TodoForm
	document.getElementById(Todo.MVC.DOM.todoFormTemplate).innerHTML = formTemplate
}

//NOTE Keep an eye on your console for any of these errors
function _drawError() {
	console.error('[TODO ERROR]', _todoService.TodoError)
}

export default class TodoController {
	constructor() {
		//TODO Remember to register your subscribers
		_todoService.addSubscriber(Todo.MVC.STATE.error, _drawError)
		_todoService.addSubscriber(Todo.MVC.STATE.todos, _drawTodos)
		_todoService.getTodos(_userName)
		_drawTodosForm()
	}

	addTodo(e) {
		e.preventDefault()
		var form = e.target

		let todo = new TodoStruct()

		todo.description = form[Todo.MVC.DOM.newTodoItemDescription].value
		todo.user = _userName

		// var todo = {
		// 	//TODO build the todo object from the data that comes into this method
		// }
		_todoService.addTodo(todo, _userName)

		form[Todo.MVC.DOM.newTodoItemDescription].focus()
	}

	//NOTE This method will pass an Id to your service for the TODO that will need to be toggled
	toggleTodoStatus(todoId) {
		_todoService.toggleTodoStatus(todoId, _userName)
	}

	//NOTE This method will pass an Id to your service for the TODO that will need to be deleted
	removeTodo(event, todoId) {
		event.preventDefault()
		_todoService.removeTodo(todoId, _userName)
	}



}

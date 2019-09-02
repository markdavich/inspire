import { API } from "../constants/constants.js";
import { TodoStruct, Todo } from "../models/todo.js";

//NOTE your service is all set up for the observer pattern but there is still work to be done

// @ts-ignore
const todoApi = axios.create({
	// baseURL: 'https://bcw-sandbox.herokuapp.com/api/jake/todos/',
	baseURL: API.baseURL,
	timeout: 3000
});

let _state = {
	/** @type {TodoStruct[]} */
	todos: [],
	error: {},
}

let _subscribers = {
	todos: [],
	error: []
}

function _setState(prop, data) {
	_state[prop] = data
	_subscribers[prop].forEach(fn => fn())
}

export default class TodoService {
	get TodoError() {
		return _state.error
	}

/**
* @type {Array.<Todo>} Returns an array of Todo class objects from _state.todos
*/
	get Todos() {
		//NOTE JSDocs can also be: @type {Todo[]}
		return _state.todos.map(todo => new Todo(new TodoStruct(todo)))
	}

	addSubscriber(prop, fn) {
		_subscribers[prop].push(fn)
	}

	getTodos(userName) {
		console.log("Getting the Todo List")
		todoApi.get(API.getTodos(userName))
			.then(response => {
				debugger
				console.log(response)
				//TODO Handle this response from the server
				// response: axios.axios.sandBox => response.data.data == [{TodoStruct}...]
				// response: {data: {data: [{TodoStruct}, {TodoStruct}, {TodoStruct}...]}}
				let newTodos = response.data.data
				_setState(Todo.MVC.STATE.todos, newTodos)
			})
			.catch(err => _setState('error', err.response.data))
	}

	addTodo(todo, userName) {
		todoApi.post(API.getTodos(userName), todo)
			.then(response => {
				console.log(response)
				// response: axios.axios.sandBox => response.data.data == {TodoStruct}
				//TODO Handle this response from the server (hint: what data comes back, do you want this?)
				let newTodo = response.data.data
				let newTodos = [newTodo, ..._state.todos]
				_setState(Todo.MVC.STATE.todos, newTodos)
			})
			.catch(err => _setState('error', err.response.data))
	}

	toggleTodoStatus(todoId, userName) {
		let todo = _state.todos.find(todo => todo._id == todoId)
		//TODO Make sure that you found a todo, 
		//		and if you did find one
		//		change its completed status to whatever it is not (ex: false => true or true => false)

		todoApi.put(API.putEndPoint(todoId, userName), todo)
			.then(response => {
				//TODO do you care about this data? or should you go get something else?
			})
			.catch(err => _setState('error', err.response.data))
	}

	removeTodo(todoId, userName) {
		//TODO Work through this one on your own
		//		what is the request type
		//		once the response comes back, what do you need to insure happens?
		todoApi.delete(API.deleteTodo(todoId, userName))
			.then(response => {
				let todoIndex = _state.todos.findIndex(todo => todo._id === todoId)

				if (todoIndex > -1) {
					let newTodoList = [..._state.todos]
					newTodoList.splice(todoIndex, 1)
					_setState(Todo.MVC.STATE.todos, newTodoList)
				}

				// let newTodosState = [..._state.todos].splice(
				// 	_state.todos.findIndex(todo => todo._id == todoId),
				// 	1
				// )
				// _setState(Todo.MVC.STATE.todos, newTodosState)
			})
			.catch(error => {
				_setState('error', error.response.data)
			})
	}

}

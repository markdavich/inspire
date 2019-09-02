import { Weather, WeatherStruct } from "../models/weather.js";
import { API } from "../constants/constants.js";

// @ts-ignore
const weatherApi = axios.create({
	baseURL: API.baseURL, //"//bcw-sandbox.herokuapp.com/api/weather",
	timeout: 3000
});
//edit
let _state = {
	weather: {}
}

let _subscribers = {
	weather: []
}

function _setState(prop, data) {
	_state[prop] = data
	_subscribers[prop].forEach(fn => fn());
}


export default class WeatherService {
	get Weather() {
		return new Weather(new WeatherStruct(_state.weather))
	}

	addSubscriber(prop, fn) {
		_subscribers[prop].push(fn)
	}

	getWeather() {
		console.log('Calling the Weatherman')
		weatherApi.get().then(res => {
			_setState('weather', new Weather(res.data))
		})
	}
}

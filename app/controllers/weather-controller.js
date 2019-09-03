import WeatherService from "../services/weather-service.js";
import { _userName } from "../constants/constants.js"
import { setSelectedTempUnits } from "../models/weather.js";

var _weatherService = new WeatherService()

//NOTE The weather service and controller are mostly done, 
//		you may wish to check out the model and include some additional data.


//TODO Complete rendering data to the screen
function _drawWeather() {
	console.log("THE WEATHER MAN SAYS:", _weatherService.Weather)
	let template = ''
	let weather = _weatherService.Weather
	document.getElementById('weather-template').innerHTML = weather.Template
	weather.setSunPosition()
}

export default class WeatherController {

	constructor() {
		_weatherService.addSubscriber('weather', _drawWeather)
		_weatherService.getWeather(_userName)
	}

	setTempUnits(event) {
		event.preventDefault()
		setSelectedTempUnits(event.target.value)
		_drawWeather()
	}
}

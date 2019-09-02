export const TEMP_UNITS = {
  CELSUS: '°C',
  FAHRENHEIT: '°F',
  KELVIN: '°K'
}

/** @param {Weather} weather*/
function _celsus(weather) {
  let c = weather.main.temp - 273.15
  return `${Math.round(c)}${TEMP_UNITS.CELSUS}`
}

/** @param {Weather} weather*/
function _fahrenheit(weather) {
  let f = (weather.main.temp - 273.15) * (9 / 5) + 32
  return `${Math.round(f)}${TEMP_UNITS.FAHRENHEIT}`
}

/** @param {Weather} weather*/
function _kelvin(weather) {
  return `${weather.main.temp}${TEMP_UNITS.KELVIN}`
}
/**
 * 
 * @param {Weather} weather 
 * @param {string} units -- TEMP_UNITS: {CELSUS|FAHRENHEIT|KELVIN}
 */
function _temp(weather, units) {
  switch (units) {
    case TEMP_UNITS.CELSUS:
      return _celsus(weather)
    case TEMP_UNITS.FAHRENHEIT:
      return _fahrenheit(weather)
    default:
        return _kelvin(weather)
  }
}

export class WeatherStruct {
  constructor(
    {
      coord = {
        lon: 0,
        lat: 0
      },
      weather = [
        {
          id: 0,
          main: '',
          description: '',
          icon: ''
        }
      ],
      base = '',
      main = {
        temp: 0.00,
        pressure: 0,
        humidity: 0,
        temp_min: 0.00,
        temp_max: 0.00
      },
      visibility = 0,
      wind = {
        speed: 0.00,
        deg: 0
      },
      clouds = {
        all: 0
      },
      dt = 0,
      sys = {
        type: 0,
        id: 0,
        message: 0.0000,
        country: '',
        sunrise: 0,
        sunset: 0
      },
      timezone = 0,
      id = 0,
      name = '',
      cod = 0
    } = {}
  ) {
    this.coord = coord
    this.weather = weather
    this.base = base
    this.main = main
    this.visibility = visibility
    this.wind = wind
    this.clouds = clouds
    this.dt = dt
    this.sys = sys
    this.timezone = timezone
    this.id = id
    this.name = name
    this.cod = cod
  }
}

export class Weather {
  /**
   * @param {WeatherStruct} weatherStruct
   */
  constructor(weatherStruct) {
    console.log('[RAW WEATHER API DATA]', weatherStruct);
    //NOTE Have you ever wanted to know the temperature measured in kelvin? 
    //      That is what this data returns! data.main.temp is the temperature in Kelvin

    //TODO You should probably convert the temperature data to either F or C
    //      check out the other data that comes back and see if there is anything you want to try

    this.coord = weatherStruct.coord
    this.weather = weatherStruct.weather
    this.base = weatherStruct.base
    /** @property temp: Kelvin */
    this.main = weatherStruct.main
    this.visibility = weatherStruct.visibility
    this.wind = weatherStruct.wind
    this.clouds = weatherStruct.clouds
    this.dt = weatherStruct.dt
    /**
     * @property sunrise: Sunrise time, unix, UTC
     * @property sunset: Sunset time, unix, UTC
     * */
    this.sys = weatherStruct.sys
    this.timezone = weatherStruct.timezone
    /** City Id */
    this.id = weatherStruct.id
    /** City Name */
    this.name = weatherStruct.name
    this.cod = weatherStruct.cod

    this.iconBase = 'http://openweathermap.org/img/wn/'
  }

  icon() {
    let icon = `<img src="${this.iconBase}${this.weather[0].icon}@2x.png" alt="forecast" width="50" height="50">`
    return icon
  }

  get Template() {
    let template = `
      <div class="input-group">
        <div class="input-group-prepend">
          ${this.icon()}
        </div>
        <select class="temp">
          <option selected>${_fahrenheit(this)}</option>
          <option>${_celsus(this)}</option>
          <option>${_kelvin(this)}</option>
        </select>
      </div>
    `
    return template
  }
}

// http://openweathermap.org/img/wn/10d@2x.png

// https://bcw-sandbox.herokuapp.com/api/weather

const iconExample = {
  "coord": {
    "lon": -116.2,
    "lat": 43.62
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  icon: function () {
    return `http://openweathermap.org/img/wn/${this.weather[0].icon}@2x.png`
  }
}

  


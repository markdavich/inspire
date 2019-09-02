export const TEMP_UNITS = {
  CELSUS: 'C',
  FAHRENHEIT: 'F',
  KELVIN: 'K'
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
   * 
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
  }

  get Template() {
    let template = `
      <h1>This is the weather</h1>
    `
    return template
  }
}


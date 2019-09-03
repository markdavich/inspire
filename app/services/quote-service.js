import { QuoteStruct, Quote } from "../models/quote.js";
import { API } from "../constants/constants.js";

// @ts-ignore
const _quoteApi = axios.create({
	baseURL: API.baseURL,
	timeout: 3000
});

let _state = {
	quote: {}
}

let _subscribers = {
	quote: []
}

function _setState(propertyToSet, newValue) {
	_state[propertyToSet] = newValue
	_subscribers[propertyToSet].forEach(func => func())
}

//TODO create methods to retrieve data trigger the update window when it is complete
export default class QuoteService {
	get Quote() {
		return new Quote(new QuoteStruct(_state.quote))
	}

	addSubscriber(propertyToSet, functionToRun) {
		_subscribers[propertyToSet].push(functionToRun)
	}

	getQuote() {
		_quoteApi.get(API.quotes)
			.then(response => {
				_setState('quote', response.data)
			})
	}
}

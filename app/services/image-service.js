import { ImageModel, ImageStruct } from "../models/image-model.js";
import { API } from "../constants/constants.js";

// @ts-ignore
const _imgApi = axios.create({
	baseURL: API.baseURL,
	timeout: 3000
});

let _state = {
	images: {}
}

let _subscribers = {
	images: []
}

function _setState(propertyToSet, newValue) {
	_state[propertyToSet] = newValue
	_subscribers[propertyToSet].forEach(func => func())
}

//TODO create methods to retrieve data trigger the update window when it is complete
export default class ImageService {

	get Image() {
		return new ImageModel (new ImageStruct(_state.images))
	}

	addSubscriber(propertyToSet, functionToRun) {
		_subscribers[propertyToSet].push(functionToRun)
	}

	getImage() {
		_imgApi.get(API.images)
			.then(response => {
				console.log('ImageService.getImage');
				console.log(response)
				_setState('images', response.data)
			})
	}
}

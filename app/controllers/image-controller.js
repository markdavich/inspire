import ImageService from "../services/image-service.js";

const _imageService = new ImageService()

function _drawImage() {
  document.getElementById('bg-image').style.backgroundImage = _imageService.Image.Url
}

//TODO Create methods for constructor, and rendering the image to the page 
//      (you may wish to set it as a background image)
export default class ImageController {
  constructor() {
    _imageService.addSubscriber('images', _drawImage)
    _imageService.getImage()
  }

}


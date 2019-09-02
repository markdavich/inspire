export class ImageStruct{
  constructor(
    {
      id = 0,
      url = '',
      large_url = '',
      source_id = 0,
      copyright = '',
      site = ''
} = {}
  ) {
    this.id = id
    this.url = url
    this.large_url = large_url
    this.source_id = source_id
    this.copyright = copyright
    this.site = site
  }
}

export class ImageModel {
  /**
   * 
   * @param {ImageStruct} imageStruct 
   */
  constructor(imageStruct) {
    this.id = imageStruct.id
    this.url = imageStruct.url
    this.large_url = imageStruct.large_url
    this.source_id = imageStruct.source_id
    this.copyright = imageStruct.copyright
    this.site = imageStruct.site
  }

  get Url() {
    let url = `url('${this.large_url}')`
    return url
  }
}
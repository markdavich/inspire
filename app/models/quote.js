export class QuoteStruct {
  constructor(
    {
      qotd_date = new Date(),
      quote = {
        id: 0,
        dialogue: false,
        private: false,
        tags: [],
        url: '',
        favorites_count: 0,
        upvotes_count: 0,
        downvotes_count: 0,
        author: '',
        author_permalink: '',
        body: ''
  }
    } = {}
  ) {
    this.qotd_date = qotd_date
    this.quote = quote
  }
}

export class Quote{
  /**
   * 
   * @param {QuoteStruct} quoteStruct 
   */
  constructor(quoteStruct) {
    this.qotd_date = quoteStruct.qotd_date
    this.quote = quoteStruct.quote
  }

  get Template() {
    let template = `
      <p class="quote">${this.quote.body}</p>
      <p class="quote-author">-${this.quote.author}</p>
    `
    return template
  }
}
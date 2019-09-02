import QuoteService from "../services/quote-service.js";
let _qs = new QuoteService()

function drawQuote() {
  document.getElementById('quote-template').innerHTML = _qs.Quote.Template
}

//TODO Create methods for constructor, and rendering the quote to the page 
//      (be sure to review the HTML as an element already was put there for you)
export default class QuoteController {
  constructor() {
    _qs.addSubscriber('quote', drawQuote)
    _qs.getQuote()
  }
}

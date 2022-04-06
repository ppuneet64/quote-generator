//get quotes from api quote,quote-author
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const newQuoteBtn = document.getElementById('new-quote')
const tweetBtn = document.getElementById('tweet')
const loader = document.getElementById('loader')
let quotesData = []

const displayQuote = () => {
    let rendomIndex = Math.floor(Math.random() * quotesData.length)
    let currentQuote = quotesData[rendomIndex]
    quoteText.textContent = currentQuote?.text || 'Quote Text'
    quoteAuthor.textContent = currentQuote?.author || 'Author'
    console.log("currentQuote?.text?.length", currentQuote?.text?.length);
    if (currentQuote?.text?.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
}
const toggleLoader = () => {
    loader.classList.toggle('show-loader')
}
const tweetQuote = () => {
    let tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent
        } - ${quoteAuthor.textContent}`
    window.open(tweetUrl, '_blank')
}
const getQuotes = async () => {
    toggleLoader()
    const API = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(API)
        toggleLoader()
        quotesData = await response.json()
        displayQuote()
    } catch (error) {
        toggleLoader()
        console.log(error);
    }
}
newQuoteBtn.addEventListener("click", () => {
    toggleLoader()
    setTimeout(() => {
        toggleLoader()
        displayQuote()
    }, 1000);
})
tweetBtn.addEventListener("click", tweetQuote)

getQuotes()
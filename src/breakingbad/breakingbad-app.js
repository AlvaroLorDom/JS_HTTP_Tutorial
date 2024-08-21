
/**
 * @returns {Promise<Object>} quote info
 */
const fetchQuote = async() => {
    const url = 'https://api.breakingbadquotes.xyz/v1/quotes';

    const res = await fetch(url);
    const data = await res.json();
    return data[0]
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingBadApp = ( element ) => {
    document.querySelector('#app-title').innerHTML = 'Breaking Bad';

    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.innerText = 'Next quote';

    const renderQuote = ( data ) => {
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author;
        element.replaceChildren( quoteLabel, authorLabel, nextQuoteButton );
    }

    
    const loadPage = async() => {
        element.innerHTML = 'Loading...';
        renderQuote(await fetchQuote());
    }
    loadPage();


    nextQuoteButton.addEventListener('click', loadPage);    
}


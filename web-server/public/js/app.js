const weatherForm = document.getElementById('weather-form');
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

const getWeatherData = async (address) => {
    try {
        const response = await fetch('/weather?address=' + address)
        const data = await response.json()
        // Notice that fetch only catches errors that are thrown by the server we need to catch manually the errors that are thrown by the client
        if (data.error) {
            messageOne.textContent = data.error
            messageTwo.textContent = ''
            return
        }
        messageOne.textContent = data.locationPartialy
        messageTwo.textContent = data.forecast
    } catch (error) {
        console.log(error);
    }
}

weatherForm.addEventListener('submit', (e) => {  // Event listener to listen for the submit event
    e.preventDefault() // prevent the default behaviour of the form which is to refresh the page. Notice this is a default behaviour of the FORm only.

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = 'Please wait...'

    getWeatherData(location)

    // We used async await to get the data from the server and then we used the data to display it on the page
    /*
    fetch('weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                console.log(data.locationPartialy)
                console.log(data.forecast)
            }
        })
    })
    */
})

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}).catch((error) => {
    console.log(error)
})

// fetch is the HTTP request from client side JavaScript will be using the very popular fetch API.
// Fetch is not part of JavaScript, it is a browser based API, which means it's something we can use 
// in all modern browsers, but it's not accessible in node.
// JS So the code we write inside of here isn't going to be something you'll be able to use in a back end node script.
// Here, this script is running in client side JavaScript, so using the fetch API is perfectly fine.
const apiUrl = "https://tripy-express-student-neog.replit.app/destinations";

const destinationInputForm = document.querySelector('#destinationInputForm');
const getDestinationsBtn = document.querySelector('#getDestinationsBtn');
const showDestinationsCard = document.querySelector('#showDestinationsCard')



destinationInputForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const destinationNameInput = document.querySelector('#destinationNameInput');
    const destinationLocationInput = document.querySelector('#destinationLocationInput');
    const destinationDescriptionInput = document.querySelector('#destinationDescriptionInput');
    const destinationRatingInput = document.querySelector('#destinationRatingInput');
    const successMsg = document.querySelector('#successMsg');

    const newDestinationObj = {
        name: destinationNameInput.value,
        location: destinationLocationInput.value,
        description: destinationDescriptionInput.value,
        rating: destinationRatingInput.value
    }

    fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newDestinationObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data) {
                console.log(data);
                successMsg.textContent = "Destination Added Successfully..."
                destinationInputForm.reset();
                showDestinationsCard.innerHTML = '';
            }
        })
        .catch(function (error) {
            console.log("Error", error);
            successMsg.textContent = "Oops, Something went wrong...."
        })
})

getDestinationsBtn.addEventListener('click', function () {

    successMsg.textContent = '';

    fetch(apiUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showDestinationsCard.innerHTML = '';
            createDestinationCard(data)
        })
        .catch(function (error) {
            console.log('Error: ', error);
            showDestinationsCard.textContent = "Unable to fetch data from API"
        })

})



function createDestinationCard(data) {

    for (let i = 0; i < data.length; i++) {
        const card = document.createElement('div')
        card.className = 'card my-3 ';

        const cardBody = document.createElement('div')
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5')
        cardTitle.className = 'card-title';
        cardTitle.textContent = data[i].name;

        const location = document.createElement('p');
        location.className = 'card-text';
        location.innerHTML = `<strong>Location: </strong>${data[i].location}`;


        const description = document.createElement('p');
        description.className = 'card-text';
        description.innerHTML = `<strong>Description: </strong>${data[i].description}`;

        const rating = document.createElement('p');
        rating.className = 'card-text';
        rating.innerHTML = `<strong>rating: </strong>${data[i].rating}`

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(location);
        cardBody.appendChild(description);
        cardBody.appendChild(rating);

        card.appendChild(cardBody);
        showDestinationsCard.appendChild(card)
    }
}
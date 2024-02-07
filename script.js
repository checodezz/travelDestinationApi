const apiUrl = "https://tripy-express-student-neog.replit.app/destinations";

const destinationInputForm = document.querySelector('#destinationInputForm');



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
            }
        })
        .catch(function (error) {
            console.log("Error", error);
            successMsg.textContent = "Oops, Something went wrong...."
        })
})
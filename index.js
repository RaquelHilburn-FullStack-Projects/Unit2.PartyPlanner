document.addEventListener("DOMContentLoaded", function () {
    const partyList = document.getElementById("party-list");
    const partyForm = document.getElementById("party-form");

    // Function to fetch and display the list of parties
    function getParties() {
        fetch("/api/parties") // Replace with your API endpoint
            .then((response) => response.json())
            .then((data) => {
                partyList.innerHTML = ""; // Clear the existing list
                data.forEach((party) => {
                    const partyItem = document.createElement("li");
                    partyItem.innerHTML = `
                        <strong>${party.name}</strong> 
                        (Date: ${party.date}, Time: ${party.time}, Location: ${party.location})<br>
                        Description: ${party.description}
                        <button class="delete-button" data-id="${party.id}">Delete</button>
                    `;
                    partyList.appendChild(partyItem);
                });
            });
    }

    // Function to handle form submission and add a new party
    partyForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const location = document.getElementById("location").value;
        const description = document.getElementById("description").value;

        const newParty = {
            name,
            date,
            time,
            location,
            description,
        };

        fetch("/api/parties", { // Replace with your API endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newParty),
        })
        .then(() => {
            getParties(); // Refresh the party list after adding a new party
            partyForm.reset();
        });
    });

    // Function to handle party deletion
    partyList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-button")) {
            const partyId = e.target.getAttribute("data-id");

            fetch(`/api/parties/${partyId}`, { // Replace with your API endpoint
                method: "DELETE",
            })
            .then(() => {
                getParties(); // Refresh the party list after deletion
            });
        }
    });

    // Initial load of party list
    getParties();
});

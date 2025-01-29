function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get("id"),
        token: params.get("token"),
    };
}

const tabs = document.querySelectorAll('.tab-content');
const tabLinks = document.querySelectorAll('nav a');
let secrets = {};

document.addEventListener('DOMContentLoaded', () => {
    fetchGuest();
    switchTab('tab1');
    switchTab("tab3"); //temporary for testing
    tabLinks.forEach((tabButton, index) => {
        tabButton.addEventListener('click', () => {
            switchTab(`tab${index + 1}`);
        });
    });
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'rsvp-link') {
            e.preventDefault();
            switchTab('tab3');
        }
    });
})

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.getElementById(`${tabId}-btn`).classList.add('active');
}

function fetchGuest() {
    const { id, token } = getUrlParams();
    const requestBody = {
        id: id,
        token: token
    }
    fetch(`http://localhost:8080/guest/validate`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(guest => {
        if(guest && guest.names) {
            fetchSecrets(guest);
            setGuestInformation(guest);
        }
        else {
            document.getElementById("personal-greeting").textContent = "Error"; 
        }
    })
    .catch(error => {
        console.error("Error fetching guest:", error);
    })
}

async function fetchSecrets() {
    try {
        const { id, token } = getUrlParams();
        const requestBody = {
            id: id,
            token: token
        }
        const response = await fetch(`http://localhost:8080/secrets/getSecrets`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        });
        secrets = await response.json();
        setDocumentSecrets(secrets);
        fetchImages(secrets);
        
    } catch (error) {
        console.error('Error fetching secrets:', error);
    }
}

function setGuestInformation(guest) {
    const guestNames = guest.names.split(",").map(name => name.trim());
        document.getElementById("personal-greeting").textContent = getInnerHTML(guest, "personal-greeting", guestNames);
        document.getElementById("personal-introduction").innerHTML = getInnerHTML(guest, "personal-introduction", guestNames);
        document.getElementById("accept-invite").textContent = getInnerHTML(guest, "accept-invite", guestNames);
        generateRSVPform(guest, guestNames);
}

function getInnerHTML(guest, element, guestNames) {
    switch(element) {
        case "personal-greeting":
            if(guestNames.length === 1) {
                return `Hej ${guest.names}!`
            }
            else {
                let names = "";
                for (let i = 0; i < guestNames.length - 1; i++) {
                    names += guestNames[i] + ", ";
                }
                names += ("och " + guestNames[guestNames.length - 1]);
                return `Hej ${names}!`
            }
        case "personal-introduction":
            if(guestNames.length > 1) {
                return `Vad kul att just ni är här! <br>` +
                `Här kan ni se information gällande bröllopet, titta på lite fina bilder, <br>` + 
                `se nedräkningen till vår speciella dag och viktigast av allt: <a href="#" id="rsvp-link">O.S.A!</a>`
            } else {
                return `Vad kul att just du är här! <br>` +
                `Här kan du se information gällande bröllopet, titta på lite fina bilder, <br>` + 
                `se nedräkningen till vår speciella dag och viktigast av allt: <a href="#" id="rsvp-link">O.S.A!</a>`
            }
        case "accept-invite":
            if (guestNames.length === 1) {
               return `Här kan du acceptera din inbjudan!`
            } else {
                return `Här kan ni acceptera era inbjudningar!`
            }
        default:
            return 'Something went wrong!'
    }
}

function generateRSVPform(guest, guestNames) {
    const headerRow = document.createElement("div");
    headerRow.classList.add("rsvp-header");

    const nameHeader = document.createElement("span");
    nameHeader.textContent = "Namn";
    nameHeader.classList.add("header-name");
    headerRow.appendChild(nameHeader);

    const rsvpHeader = document.createElement("span");
    rsvpHeader.textContent = "Kommer du?";
    rsvpHeader.classList.add("header-rsvp");
    headerRow.appendChild(rsvpHeader);

    const sleepoverHeader = document.createElement("span");
    sleepoverHeader.textContent = "Sover du över?";
    sleepoverHeader.classList.add("header-sleepover");
    headerRow.appendChild(sleepoverHeader);

    const allergyHeader = document.createElement("span");
    allergyHeader.textContent = "Matpreferenser";
    allergyHeader.classList.add("header-allergy");
    headerRow.appendChild(allergyHeader);

    document.getElementById("accept-invite-form").appendChild(headerRow);
    let totalGuests = guestNames.length;
    let allGuests = [...guestNames]
    if (guest.plusOne) {
        totalGuests++;
        allGuests.push("+1");
    }
    for (let i = 0; i < totalGuests; i++) {
        const div = document.createElement("div");
        div.classList.add("rsvp-row");

        const nameLabel = document.createElement("span");
        nameLabel.textContent = allGuests[i];
        nameLabel.classList.add("guest-name");

        const rsvpSelect = document.createElement("select");
        rsvpSelect.name = `${allGuests[i]}-rsvp-dropdown`;
        rsvpSelect.classList.add("rsvp-form-select");

        const rsvpOption1 = document.createElement("option");
        rsvpOption1.value = "default";
        rsvpOption1.textContent = "Välj...";
        rsvpSelect.appendChild(rsvpOption1);

        const rsvpOption2 = document.createElement("option");
        rsvpOption2.value = "accept";
        rsvpOption2.textContent = "Självklart kommer jag!";
        rsvpSelect.appendChild(rsvpOption2);

        const rsvpOption3 = document.createElement("option");
        rsvpOption3.value = "decline";
        rsvpOption3.textContent = "Kan tyvärr inte! :(";
        rsvpSelect.appendChild(rsvpOption3);

        const sleepoverSelect = document.createElement("select");
        sleepoverSelect.name = `${allGuests[i]}-sleepover-dropdown`;
        sleepoverSelect.classList.add("rsvp-form-select");

        const sleepoverOption1 = document.createElement("option");
        sleepoverOption1.value = "default";
        sleepoverOption1.textContent = "Välj...";
        sleepoverSelect.appendChild(sleepoverOption1);

        const sleepoverOption2 = document.createElement("option");
        sleepoverOption2.value = "accept";
        sleepoverOption2.textContent = "Ja, gärna!";
        sleepoverSelect.appendChild(sleepoverOption2);

        const sleepoverOption3 = document.createElement("option");
        sleepoverOption3.value = "decline";
        sleepoverOption3.textContent = "Nej tack!";
        sleepoverSelect.appendChild(sleepoverOption3);

        const allergyButton = document.createElement("button");
        allergyButton.name = `${allGuests[i]}-allergy-btn`;
        allergyButton.textContent = "Hantera preferenser";
        allergyButton.classList.add("rsvp-allergy-btn");

        div.appendChild(nameLabel);
        div.appendChild(rsvpSelect);
        div.appendChild(sleepoverSelect);
        div.appendChild(allergyButton);
        document.getElementById("accept-invite-form").appendChild(div);
    }
}

function setDocumentSecrets(secrets) {
    document.getElementById("contactEmail").innerHTML = `Kontakta oss via mail: <br> ${secrets.fredrikEmail} <br> ${secrets.hannahEmail}`;
    document.getElementById("contactPhone").innerHTML = `Kontakta oss via telefon: <br> Fredrik: ${secrets.fredrikPhone} <br> Hannah: ${secrets.hannahPhone}`;
    document.getElementById("location-name").innerHTML = `Vi ska gifta oss på <a href="#" id="location-link" target="_blank">${secrets.weddingLocation}</a>!`;
    document.getElementById("location-link").href = secrets.hostWebURL;
    document.getElementById("location-facts").innerHTML = `<a href="#" id="location-trivia-link" target="_blank">Här</a> kan du läsa mer om ${secrets.weddingLocation}s historia!`;
    document.getElementById("location-trivia-link").href = secrets.hostWebURL;

}

async function fetchImages(secrets) {
    try {
        const requestBody = {
            password: secrets.imagePassword
        }
        const response = await fetch(`http://localhost:8080/secrets/getImage`, {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const base64Images = await response.json();
            sessionStorage.setItem("images", JSON.stringify(base64Images));
            document.getElementById("location-image").src = `data:image/png;base64,${base64Images[1]}`;
            document.getElementById("logo-image").src = `data:image/png;base64,${base64Images[2]}`;
        } else {
            console.error("Failed to fetch the secret image. Status:", response.status);
        }
        
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

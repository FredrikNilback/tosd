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
        if(guest && guest.name) {
            fetchSecrets(guest);
            document.getElementById("personal-greeting").textContent = "Hej " + guest.name + "!";
            document.getElementById("personal-introduction").innerHTML = getInnerHTML(guest, "personal-introduction");
        }
        else {
            document.getElementById("personal-greeting").textContent = "Error"; 
        }
    })
    .catch(error => {
        console.error("Error fetching guest:", error);
        //document.getElementById("personal-greeting").textContent = "Error";
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
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            document.getElementById("location-image").src = imageUrl;
        } else {
            console.error("Failed to fetch the secret image. Status:", response.status);
        }
        
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}


function getInnerHTML(guest, getEnum) {
    switch(getEnum) {
        case "personal-introduction":
            if(guest.namedGuests > 1) {
                return `Vad kul att just ni är här! <br>` +
                `Här kan ni se information gällande bröllopet, titta på lite fina bilder, <br>` + 
                `se nedräkningen till vår speciella dag och viktigast av allt: <a href="#" id="rsvp-link">O.S.A!</a>`
            } else {
                return `Vad kul att just du är här! <br>` +
                `Här kan du se information gällande bröllopet, titta på lite fina bilder, <br>` + 
                `se nedräkningen till vår speciella dag och viktigast av allt: <a href="#" id="rsvp-link">O.S.A!</a>`
            }
    }
    console.log(guest)
}

class SecretHandler {
    constructor(secrets) {
        this.secrets = secrets;
        handleSecrets(this.secrets);
    }
}

function handleSecrets(secrets) {
    fetchImages(secrets);
    document.getElementById("contactEmail").innerHTML = 
    `Kontakta oss via mail: <br>
    <p style="font-family: 'Arial'; font-size: clamp(0.8rem, 1vw, 1rem);">${secrets.contactInformation.fredrikEmail}</p>
    <p style="font-family: 'Arial'; font-size: clamp(0.8rem, 1vw, 1rem);;">${secrets.contactInformation.hannahEmail}</p>`;
    document.getElementById("contactPhone").innerHTML = 
    `Kontakta oss via telefon: <br>
    Fredrik: <span style="font-family: 'Arial'; font-size: clamp(0.8rem, 1vw, 1rem);">${secrets.contactInformation.fredrikPhone}</span> <br>
    Hannah: <span style="font-family: 'Arial'; font-size: clamp(0.8rem, 1vw, 1rem);">${secrets.contactInformation.hannahPhone}</span>`;
    document.getElementById("location-name").innerHTML = `Vi ska gifta oss på <a href="#" id="location-link" target="_blank">${secrets.locationInformation.weddingLocation}</a>!`;
    document.getElementById("location-link").href = secrets.locationInformation.hostWebURL;
    document.getElementById("location-facts").innerHTML = `<a href="#" id="location-trivia-link" target="_blank">Här</a> kan du läsa mer om ${secrets.locationInformation.weddingLocation}s historia!`;
    document.getElementById("location-trivia-link").href = secrets.locationInformation.hostWebURL;
    document.getElementById("rsvp-by-date").innerHTML = `Kom ihåg att senast O.S.A ${secrets.dates.rsvpByDate}`;

    generateCountdownTimer(secrets.dates.weddingDate);
}

function generateCountdownTimer(dateString) {
    document.getElementById("countdown-header").textContent = "Nedräkning till bröllopet!"
    const date = new Date(dateString).getTime();
    updateTime(date);
    setInterval(() => updateTime(date), 15000);
}

function updateTime(date) {
    const now = new Date().getTime();
    const remainder = date - now;

    const days = Math.floor(remainder / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainder % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainder % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("countdown-timer").innerHTML = `${days} Dagar : ${hours} Timmar : ${minutes} Minuter`;
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

export default SecretHandler;

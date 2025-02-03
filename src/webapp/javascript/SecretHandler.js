class SecretHandler {
    constructor(secrets) {
        this.secrets = secrets;
        this.handleSecrets();
    }

    handleSecrets() {
        this.fetchImages(this.secrets);
        document.getElementById("contactEmail").innerHTML = 
        `Kontakta oss via mail: <br>
        <p style="font-family: 'Arial'; font-size: clamp(0.8rem, 1vw, 1rem);">${this.secrets.contactInformation.fredrikEmail}</p>
        <p style="font-family: 'Arial'; font-size: clamp(0.8rem, 1vw, 1rem);;">${this.secrets.contactInformation.hannahEmail}</p>`;
        document.getElementById("contactPhone").innerHTML = 
        `Kontakta oss via telefon: <br>
        Fredrik: <span style="font-family: 'Arial'; font-size: clamp(0.8rem, 1vw, 1rem);">${this.secrets.contactInformation.fredrikPhone}</span> <br>
        Hannah: <span style="font-family: 'Arial'; font-size: clamp(0.8rem, 1vw, 1rem);">${this.secrets.contactInformation.hannahPhone}</span>`;
        document.getElementById("location-name").innerHTML = `Vi ska gifta oss på <a href="#" id="location-link" target="_blank">${this.secrets.locationInformation.weddingLocation}</a>!`;
        document.getElementById("location-link").href = this.secrets.locationInformation.hostWebURL;
        document.getElementById("location-facts").innerHTML = `<a href="#" id="location-trivia-link" target="_blank">Här</a> kan du läsa mer om ${this.secrets.locationInformation.weddingLocation}s historia!`;
        document.getElementById("location-trivia-link").href = this.secrets.locationInformation.locationTriviaURL;
        document.getElementById("rsvp-by-date").innerHTML = `Kom ihåg att senast O.S.A ${this.secrets.dates.rsvpByDate}`;
        document.getElementById("overlay-text-row1").innerHTML = "Hannah & Fredrik";
        document.getElementById("overlay-text-row2").textContent = `${this.secrets.dates.weddingDate.replace(/[-]/g, ".")}`;
    
        this.generateCountdownTimer(this.secrets.dates.weddingDate);
    }
    
    generateCountdownTimer(dateString) {
        document.getElementById("countdown-header").textContent = "Nedräkning till bröllopet!"
        const date = new Date(dateString).getTime();
        this.updateTime(date);
        setInterval(() => this.updateTime(date), 15000);
    }
    
    updateTime(date) {
        const now = new Date().getTime();
        const remainder = date - now;
    
        const days = Math.floor(remainder / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainder % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainder % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("countdown-timer").innerHTML = `${days} Dagar : ${hours} Timmar : ${minutes} Minuter`;
    }
    
    async fetchImages() {
        try {
            const requestBody = {
                password: this.secrets.imagePassword
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
                document.getElementById("main-image").src= `data:image/png;base64,${base64Images[0]}`;
                document.getElementById("logo-image").src = `data:image/png;base64,${base64Images[1]}`;
                document.getElementById("location-image").src = `data:image/png;base64,${base64Images[2]}`;
            } else {
                console.error("Failed to fetch the secret image. Status:", response.status);
            }
            
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }
}

export default SecretHandler;

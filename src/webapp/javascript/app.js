import SecretHandler from './SecretHandler.js';
import GuestHandler from './GuestHandler.js';

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
let secretHandler = null;
let guestHandler = null;

document.addEventListener('DOMContentLoaded', async () => {
    await fetchGuest();
    await switchTab("tab1");
    tabLinks.forEach((tabButton, index) => {
        tabButton.addEventListener("click", () => {
            switchTab(`tab${index + 1}`);
        });
    });
    document.addEventListener("click", (e) => {
        const button = e.target.closest("#rsvp-tab-switch-btn");
        if (button) {
            e.preventDefault();
            switchTab("tab3");
        }
    });
})

async function switchTab(tabId) {
    const lastTab = document.querySelector(".tab-content.active").id;
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    document.getElementById(`${tabId}-btn`).classList.add("active");
    updateMainImage(tabId, lastTab);
}

function updateMainImage(tabId, lastTab) {
    const lastTabNumeral = parseInt(lastTab.match(/\d+/g)) - 1;
    const newTabNumeral = parseInt(tabId.match(/\d+/g)) - 1;
    if (newTabNumeral != lastTabNumeral) {
        const isMobile = window.innerWidth < 1024;
        const mainImageWrapper = document.getElementById("main-image-wrapper");
        let offset;
        if (isMobile) {
            offset = -70 * newTabNumeral;
        } else {
            offset = -25 * newTabNumeral;
        }
        mainImageWrapper.style.transform = `translateX(${offset}%)`;
    }
    let text;
    try {
        switch (newTabNumeral) {
            case 0:
                text = document.getElementById("overlay-text-row1");
                text.innerHTML = `Hannah & <span class="f-fix">F</span>redrik`;
                document.getElementById("overlay-text-row2").textContent = `${secretHandler.secrets.dates.weddingDate.replace(/[-]/g, ".")}`;
                break;
            case 1:
                text = document.getElementById("overlay-text-row1")
                text.textContent = "Bröllopet";
                document.getElementById("overlay-text-row2").innerHTML = `
                    <a href="#vigseln" class="overlay-link">Vigseln</a> | 
                    <a href="#festen" class="overlay-link">Festen</a> | 
                    <a href="#faq" class="overlay-link">FAQ</a>`;
                break;
    
            //  maybe need different text based on number of guests, remove if-else in future if not.
            case 2:
                if (guestHandler.guest.names.split(",").map(name => name.trim()).length === 1) {
                    text = document.getElementById("overlay-text-row1");
                    text.innerHTML = `<span class="f-fix">F</span>ira med oss!`;
                } else {
                    text = document.getElementById("overlay-text-row1");
                    text.innerHTML = `<span class="f-fix">F</span>ira med oss!`;
                }
                document.getElementById("overlay-text-row2").textContent = `O.S.A senast ${secretHandler.secrets.dates.rsvpByDate.replace(/[-]/g, ".")}`;
                break;
            case 3:
                if (guestHandler.guest.names.split(",").map(name => name.trim()).length === 1) {
                    text = document.getElementById("overlay-text-row1");
                    text.innerHTML = `<span class="f-fix">F</span>rågor eller funderingar?`;
                } else {
                    text = document.getElementById("overlay-text-row1");
                    text.innerHTML = `<span class="f-fix">F</span>rågor eller funderingar?`;
                }
                document.getElementById("overlay-text-row2").textContent = "";
                break;
        
            default:
                break;
            }
    } catch (error) {
        document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
        document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
        document.getElementById("tab4").classList.add("active");
        document.getElementById(`${"tab4"}-btn`).classList.add("active");
    }
}

async function fetchGuest() {
    const { id, token } = getUrlParams();
    const requestBody = {
        id: id,
        token: token
    }
    await fetch(`http://localhost:8080/guest/validate`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(async guest => {
        if(guest && guest.names) {
            await fetchSecrets();
            guestHandler = new GuestHandler(guest);
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
        secretHandler = new SecretHandler(secrets);
        
    } catch (error) {
        console.error('Error fetching secrets:', error);
    }
}

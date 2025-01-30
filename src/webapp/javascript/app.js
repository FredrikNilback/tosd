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
        if(guest && guest.names) {
            fetchSecrets();
            new GuestHandler(guest);
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
        new SecretHandler(secrets);
        
    } catch (error) {
        console.error('Error fetching secrets:', error);
    }
}

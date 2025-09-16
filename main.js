const menuItems = document.querySelectorAll('.menu_item');
const sections = document.querySelectorAll('.section');

function activateSection(sectionId) {
sections.forEach(section => {   
    section.classList.remove('active');
});

const targetSection = document.getElementById(sectionId);
if (targetSection) {
    targetSection.classList.add('active');
}

menuItems.forEach(item => {
    if (item.dataset.section === sectionId) {
    item.classList.add('active-nav'); 
    } else {
        item.classList.remove('active-nav');
    }
});
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetSectionId = item.dataset.section; 
        window.location.hash  = targetSectionId; 
    });
});

function handleHashChange() {
    const sectionId = window.location.hash.substring(1) || 'home';
    activateSection(sectionId);
}

window.addEventListener('hashchange', handleHashChange);

document.addEventListener('DOMContentLoaded', handleHashChange);

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new FormData(contactForm);
    const statusMessage = 'Sending...';
    formStatus.innerHTML = statusMessage;

    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbz6h5HHXGhVXQlNeJ6jDu9svOWBDih9ljwJ0SrdLI1Y95tHnB84r0GA2hFttspi2_tsDA/exec';

    fetch(googleScriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            formStatus.innerHTML = 'Thank you! Your message has been sent.';
            contactForm.reset();
        } else {
            throw new Error(data.error || 'Something went wrong.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        formStatus.innerHTML = 'Oops! There was a problem sending your message.';
    });
});
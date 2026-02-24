const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navList = document.getElementById('nav-list');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navList.classList.toggle('open');
    });
}

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
        if (item.dataset.section === sectionId || 
            (sectionId !== 'home' && sectionId !== 'resume' && sectionId !== 'contact' && 
             item.dataset.section === 'projects')) {
            item.classList.add('active-nav'); 
        } else {
            item.classList.remove('active-nav');
        }
    });

    if (navList.classList.contains('open')) {
        navList.classList.toggle('open');

    }
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetSectionId = item.dataset.section; 
        window.location.hash = targetSectionId; 
    });
});

function handleHashChange() {
    document.querySelectorAll('[style*="view-transition-name"]').forEach(el => {
        el.style.removeProperty('view-transition-name');
    });

    const sectionId = window.location.hash.substring(1) || 'home';
    
    const currentActive = document.querySelector('.section.active');
    const currentId = currentActive ? currentActive.id : null;

    const isOpeningProject = currentId === 'projects' && document.getElementById(`${sectionId}-card`) !== null;
    const isClosingProject = sectionId === 'projects' && document.getElementById(`${currentId}-card`) !== null;

    if (!document.startViewTransition || (!isOpeningProject && !isClosingProject)) {
        activateSection(sectionId);
        return; 
    }

    if (isOpeningProject) {
        document.getElementById(`${sectionId}-card`).style.setProperty('view-transition-name', sectionId);
    } else if (isClosingProject) {
        document.getElementById(currentId).style.setProperty('view-transition-name', currentId);
    }

    document.startViewTransition(() => {
        activateSection(sectionId);

        if (isOpeningProject) {
            document.getElementById(sectionId).style.setProperty('view-transition-name', sectionId);
            document.getElementById(`${sectionId}-card`).style.removeProperty('view-transition-name');
        } else if (isClosingProject) {
            document.getElementById(`${currentId}-card`).style.setProperty('view-transition-name', currentId);
            document.getElementById(currentId).style.removeProperty('view-transition-name');
        }
    });
}

window.addEventListener('hashchange', handleHashChange);
document.addEventListener('DOMContentLoaded', handleHashChange);

function updateBackground() {
    const hour = new Date().getHours();
    const main = document.querySelector('main');

    if (hour < 2) {
        main.style.setProperty('--bg-img', "url('images/background/11.png')");
    } else if (hour < 4) {
        main.style.setProperty('--bg-img', "url('images/background/12.png')");
    } else if (hour < 6) {
        main.style.setProperty('--bg-img', "url('images/background/01.png')");
    } else if (hour < 8) {
        main.style.setProperty('--bg-img', "url('images/background/02.png')");
    } else if (hour < 10) {
        main.style.setProperty('--bg-img', "url('images/background/03.png')");
    } else if (hour < 12) {
        main.style.setProperty('--bg-img', "url('images/background/04.png')");
    } else if (hour < 14) {
        main.style.setProperty('--bg-img', "url('images/background/05.png')");
    } else if (hour < 16) {
        main.style.setProperty('--bg-img', "url('images/background/06.png')");
    } else if (hour < 18) {
        main.style.setProperty('--bg-img', "url('images/background/07.png')");
    } else if (hour < 20) {
        main.style.setProperty('--bg-img', "url('images/background/08.png')");
    } else if (hour < 22) {
        main.style.setProperty('--bg-img', "url('images/background/09.png')");
    } else if (hour < 24) {
        main.style.setProperty('--bg-img', "url('images/background/10.png')");
    } 
}

updateBackground();
setInterval(updateBackground, 60000);

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new FormData(contactForm);
    const statusMessage = 'Sending...';
    formStatus.innerHTML = statusMessage;

    const googleScriptURL = 'https://script.google.com/macros/s/AKfycbxV1Wdjh2s4yk1NmZhnbU31PGawezSaxw379ws8efk0MoV9rqHUwxwvlTgLdWDmNoWh1g/exec';

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
        formStatus.innerHTML = 'Oops! There was a problem sending your message.';
    });
});
/* --- MENU AND SECTION LOGIC --- */

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

/* --- TIME OF DAY BACKGROUND CHANGE --- */

function updateBackground() {
    const hour = new Date().getHours();
    const main = document.querySelector('main');

    if (hour < 2) {
        main.style.backgroundImage = "url('images/background/11.png')";
    } else if (hour < 4) {
        main.style.backgroundImage = "url('images/background/12.png')";
    } else if (hour < 6) {
        main.style.backgroundImage = "url('images/background/01.png')";
    } else if (hour < 8) {
        main.style.backgroundImage = "url('images/background/02.png')";
    } else if (hour < 10) {
        main.style.backgroundImage = "url('images/background/03.png')";
    } else if (hour < 12) {
        main.style.backgroundImage = "url('images/background/04.png')";
    } else if (hour < 14) {
        main.style.backgroundImage = "url('images/background/05.png')";
    } else if (hour < 16) {
        main.style.backgroundImage = "url('images/background/06.png')";
    } else if (hour < 18) {
        main.style.backgroundImage = "url('images/background/07.png')";
    } else if (hour < 20) {
        main.style.backgroundImage = "url('images/background/08.png')";
    } else if (hour < 22) {
        main.style.backgroundImage = "url('images/background/09.png')";
    } else if (hour < 24) {
        main.style.backgroundImage = "url('images/background/10.png')";
    } 
}

// function updateBackgroundDemo() {
//     let second = (new Date().getSeconds()) % 60;
//     const main = document.querySelector('main');

//     console.log(second);

//     if (second < 5) {
//         main.style.backgroundImage = "url('images/background/11.png')";
//     } else if (second < 10) {
//         main.style.backgroundImage = "url('images/background/12.png')";
//     } else if (second < 15) {
//         main.style.backgroundImage = "url('images/background/01.png')";
//     } else if (second < 20) {
//         main.style.backgroundImage = "url('images/background/02.png')";
//     } else if (second < 25) {
//         main.style.backgroundImage = "url('images/background/03.png')";
//     } else if (second < 30) {
//         main.style.backgroundImage = "url('images/background/04.png')";
//     } else if (second < 35) {
//         main.style.backgroundImage = "url('images/background/05.png')";
//     } else if (second < 40) {
//         main.style.backgroundImage = "url('images/background/06.png')";
//     } else if (second < 45) {
//         main.style.backgroundImage = "url('images/background/07.png')";
//     } else if (second < 50) {
//         main.style.backgroundImage = "url('images/background/08.png')";
//     } else if (second < 55) {
//         main.style.backgroundImage = "url('images/background/09.png')";
//     } else if (second < 60) {
//         main.style.backgroundImage = "url('images/background/10.png')";
//     } 
// }

updateBackground();
setInterval(updateBackground, 60000);

// updateBackgroundDemo();
// setInterval(updateBackgroundDemo, 1000);

/* --- CONTACT FORM --- */

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
        console.error('Error:', error);
        formStatus.innerHTML = 'Oops! There was a problem sending your message.';
    });
});

/* --- SMOOTH PROJECT CARD EXPANSION --- */

const projectSection = document.getElementById('projects');
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    
    // --- EXPAND ANIMATION ---
    card.addEventListener('click', function() {
        if (this.classList.contains('expanded') || this.classList.contains('is-animating')) return;

        const placeholder = document.createElement('div');
        placeholder.className = 'project-card placeholder'; 
        this.parentNode.insertBefore(placeholder, this);

        const startRect = placeholder.getBoundingClientRect(); 
        const containerRect = projectSection.getBoundingClientRect();

        const startTop = startRect.top - containerRect.top;
        const startLeft = startRect.left - containerRect.left;
        
        this.style.top = `${startTop}px`;
        this.style.left = `${startLeft}px`;
        this.style.width = `${startRect.width}px`;
        this.style.height = `${startRect.height}px`;
        
        this.classList.add('is-animating');

        this.getBoundingClientRect();

        requestAnimationFrame(() => {
            this.style.top = '0px';
            this.style.left = '0px';
            this.style.width = '100%';
            this.style.height = '100%';
            this.style.borderRadius = '32px';
        });

        const onExpandEnd = (e) => {
            if (e.propertyName !== 'width') return; 
            
            this.classList.remove('is-animating');
            this.classList.add('expanded');
            
            this.style.top = ''; 
            this.style.left = '';
            this.style.width = '';
            this.style.height = '';
            this.style.borderRadius = '';

            this.removeEventListener('transitionend', onExpandEnd);
        };
        this.addEventListener('transitionend', onExpandEnd);
    });


    // --- COLLAPSE ANIMATION ---
    const backBtn = card.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', function(e) {
            e.stopPropagation(); 
            
            const placeholder = card.previousElementSibling;
            
            if (!placeholder || !placeholder.classList.contains('placeholder')) {
                card.classList.remove('expanded');
                return;
            }

            const destRect = placeholder.getBoundingClientRect();
            const containerRect = projectSection.getBoundingClientRect();
            
            const destTop = destRect.top - containerRect.top;
            const destLeft = destRect.left - containerRect.left;

            this.parentNode.style.zIndex = '100'; 
            card.style.top = '0px';
            card.style.left = '0px';
            card.style.width = '100%';
            card.style.height = '100%';
            
            card.classList.add('is-animating');
            card.classList.remove('expanded');

            card.getBoundingClientRect();

            requestAnimationFrame(() => {
                card.style.top = `${destTop}px`;
                card.style.left = `${destLeft}px`;
                card.style.width = `${destRect.width}px`;
                card.style.height = `${destRect.height}px`;
                card.style.borderRadius = '20px'; 
            });

            const onCollapseEnd = (e) => {
                if (e.propertyName !== 'width') return;

                card.classList.remove('is-animating');
                
                card.style.top = ''; 
                card.style.left = '';
                card.style.width = '';
                card.style.height = '';
                card.style.borderRadius = '';
                this.parentNode.style.zIndex = '';
                
                placeholder.remove();
                
                card.removeEventListener('transitionend', onCollapseEnd);
            };
            card.addEventListener('transitionend', onCollapseEnd);
        });
    }
});
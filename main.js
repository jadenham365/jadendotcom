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
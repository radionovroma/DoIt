import 'reset-css';
import 'styles/main.scss';
import logo from './assets/DoIt.svg';

const headerLogoDiv = document.querySelector('.nav__logo');
headerLogoDiv.innerHTML = `${logo}`;
const sidebarLogoDiv = document.querySelector('.sidebar__logo');
sidebarLogoDiv.innerHTML = `${logo}`;

const sidebarButton = document.querySelector('.sidebar-button');
const sidebar = document.querySelector('.sidebar-block');

sidebarButton.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

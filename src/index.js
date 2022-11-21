import 'reset-css';
import 'styles/main.scss';
import addingForm from './js/document/addingForm';
import header from './js/document/header';
import sidebar from './js/document/sidebar';
import faviconLink from './assets/favicon.png';

const favicon = document.querySelector('link[rel="icon"]');
favicon.setAttribute('href', `${faviconLink}`);

header.init();
sidebar.init();
addingForm.init();

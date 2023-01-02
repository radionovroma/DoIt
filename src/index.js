import 'reset-css';
import 'styles/main.scss';
import header from './js/document/header';
import sidebar from './js/document/sidebar';
import addingForm from './js/document/addingForm';
import noteList from './js/document/noteList';
import faviconLink from './assets/favicon.png';

const favicon = document.querySelector('link[rel="icon"]');
favicon.setAttribute('href', `${faviconLink}`);

header.init();
sidebar.init();
addingForm.init();
noteList.init();

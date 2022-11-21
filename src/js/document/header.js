import logo from '../../assets/DoIt.svg';

const header = {
  importLogo() {
    const headerLogoDiv = document.querySelector('.nav__logo');
    headerLogoDiv.innerHTML = `${logo}`;
  },
  init() {
    this.importLogo();
  },
};

export default header;

import logo from '../../assets/DoIt.svg';

const sidebar = {
  sidebarBlock: document.querySelector('.sidebar-block'),
  sidebarButton: document.querySelector('.sidebar-button'),
  sidebarWrap: document.querySelector('.sidebar-block__wrap'),
  importLogo() {
    const sidebarLogoDiv = document.querySelector('.sidebar__logo');
    sidebarLogoDiv.innerHTML = `${logo}`;
  },
  unfoldSidebar() {
    this.sidebarButton.addEventListener('click', () => {
      this.sidebarBlock.classList.toggle('active');
    });
  },
  rollbackSidebarByClick() {
    this.sidebarBlock.addEventListener('click', (e) => {
      const withinBoundaries = e.composedPath().includes(this.sidebarWrap);
      if (!withinBoundaries && document.body.clientWidth < 768) {
        this.sidebarBlock.classList.remove('active');
      }
    });
  },
  init() {
    this.importLogo();
    this.unfoldSidebar();
    this.rollbackSidebarByClick();
  },
};

export default sidebar;

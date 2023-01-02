import logo from '../../assets/DoIt.svg';

const header = {
  headerBlock: document.querySelector('.header-block'),
  scrollPosition: 0,
  oldScrollPosition: 0,
  headerBlockTopPosition: -70,
  importLogo() {
    const headerLogoDiv = document.querySelector('.nav__logo');
    headerLogoDiv.innerHTML = `${logo}`;
  },
  editByScroll() {
    window.addEventListener('scroll', () => {
      this.scrollPosition = document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (document.body.clientWidth < 1024) {
        if (this.oldScrollPosition > this.scrollPosition) {
          this.headerBlock.classList.add('scrolled');
          if (this.headerBlockTopPosition < 0) {
            this.headerBlock.style.top = `${this.headerBlockTopPosition += 5}px`;
          }
        } else if (this.oldScrollPosition < this.scrollPosition) {
          if (this.headerBlockTopPosition > -70) {
            this.headerBlock.style.top = `${this.headerBlockTopPosition -= 5}px`;
          }
          if (this.headerBlockTopPosition === -70) {
            this.headerBlock.classList.remove('scrolled');
          }
        }
        // eslint-disable-next-line max-len
        if (document.body.clientHeight <= (this.scrollPosition + document.documentElement.clientHeight) || !this.scrollPosition) {
          this.headerBlock.classList.remove('scrolled');
        }
        this.oldScrollPosition = this.scrollPosition;
      } else if (this.scrollPosition !== 0) {
        this.headerBlock.style.top = '0';
        this.headerBlock.classList.add('scrolled');
      } else {
        this.headerBlock.classList.remove('scrolled');
      }
    });
  },
  dropHeaderTopPosition() {
    window.addEventListener('resize', () => {
      if (document.body.clientWidth < 1024) {
        this.headerBlockTopPosition = 5;
        this.headerBlock.style.top = '0';
      }
    });
  },
  init() {
    this.importLogo();
    this.editByScroll();
    this.dropHeaderTopPosition();
  },
};

export default header;

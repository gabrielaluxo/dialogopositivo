import MicroModal from 'micromodal';

MicroModal.init({
  onClose: (modal) => {
    if (modal.id === 'curso-metodo-go') {
      const youtubeIframe = document.querySelector('[data-video="curso-metodo-go"]');
      const src = youtubeIframe.src;
      const srcdoc = youtubeIframe.srcdoc;

      youtubeIframe.src = src;
      youtubeIframe.srcdoc = srcdoc;
    }
  },
  onShow: (modal) => (document.querySelector('.modal__container').scrollTop = 0),
});

/**
 * =========================================================
 * Lightbulb Animation
 * =========================================================
 */

const lightbulb = document.querySelector('.hero__lightbulb');

const animateLightbulb = () => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) lightbulb.classList.add('hero__lightbulb--animated');
  });
};

if (lightbulb != null) {
  if (window.innerWidth > 768) lightbulb.style.opacity = 1;
  else setTimeout(animateLightbulb, 5000);
}

/**
 * =========================================================
 * Chat Animation
 * =========================================================
 */

const initChatAnimation = () => {
  const chatMessages = [
    {
      mae: 'Não estou conseguindo fazer com que a minha filha obedeça.',
      gabriela: 'Eu posso te ajudar através dos atendimentos de orientação de pais!',
    },
    {
      mae: 'Você poderia me ajudar com o período de desmame e desfralde?',
      gabriela: 'Claro, vamos agendar um atendimento de orientação de pais. É só você clicar no botão abaixo!',
    },
    {
      mae: 'Minha filha grita e chora demais, estou perdida. Me ajuda?',
      gabriela: 'Sim, vamos resolver isso o quanto antes. Que tal agendar um atendimento de orientação de pais?',
    },
  ];

  /**
   * Get chat items.
   */

  const chatGabrielaLuxo = document.querySelector('[data-chat-animation-item="gabriela-luxo"]');
  const chatGabrielaLuxoMessage = chatGabrielaLuxo.querySelector('[data-chat-animation-content="message"]');
  const chatGabrielaLuxoDots = chatGabrielaLuxo.querySelector('[data-chat-animation-content="dots"]');

  const chatMother = document.querySelector('[data-chat-animation-item="mae-e-filho"]');
  const chatMotherDots = chatMother.querySelector('[data-chat-animation-content="dots"]');
  const chatMotherMessage = chatMother.querySelector('[data-chat-animation-content="message"]');
  const chatButton = document.querySelector('[data-chat-animation="button"]');

  const getRandomMessageGroup = () => {
    const randomIndex = Math.floor(Math.random() * chatMessages.length);
    return chatMessages[randomIndex];
  };

  const messageGroup = getRandomMessageGroup();

  /**
   * Set default states.
   */

  chatGabrielaLuxoMessage.textContent = messageGroup.gabriela;
  chatGabrielaLuxo.classList.add('display-none');
  chatGabrielaLuxo.style.top = '5rem';
  chatGabrielaLuxoMessage.classList.add('display-none');

  chatMotherMessage.textContent = messageGroup.mae;
  chatMother.classList.add('display-none');
  chatMotherMessage.classList.add('display-none');
  chatButton.classList.add('display-none');

  /**
   * Set animation timeline.
   */

  setTimeout(() => {
    chatMother.classList.remove('display-none');
    chatMother.classList.add('fade-in-bottom');
  }, 500);

  setTimeout(() => {
    chatMotherDots.classList.add('display-none');
    chatMotherMessage.classList.remove('display-none');
    chatMotherMessage.classList.add('opacity-0');
    chatMotherMessage.classList.add('fade-in');
  }, 2000);

  setTimeout(() => {
    chatGabrielaLuxo.classList.remove('display-none');
    chatGabrielaLuxo.classList.add('fade-in-bottom');
    chatGabrielaLuxo.style.top = '0';
  }, 2500);

  setTimeout(() => {
    chatGabrielaLuxoDots.classList.add('display-none');
    chatGabrielaLuxoMessage.classList.remove('display-none');
    chatGabrielaLuxoMessage.classList.add('opacity-0');
    chatGabrielaLuxoMessage.classList.add('fade-in');
  }, 4000);

  setTimeout(() => {
    chatGabrielaLuxoDots.classList.add('display-none');
    chatButton.classList.remove('display-none');
    chatButton.classList.remove('opacity-0');
    chatButton.classList.add('fade-in-bottom');
  }, 4500);
};

if (document.querySelector('[data-chat-animation]') != null) initChatAnimation();

/**
 * =========================================================
 * Book Animation
 * =========================================================
 */

function initFlipBook(element) {
  bookElement = document.querySelector(`[data-book="${element}"]`);

  const book = bookElement.querySelector('.book');
  const pages = bookElement.querySelectorAll('[data-book-page]');
  const navButton = bookElement.querySelectorAll('[data-book-button]');
  const prevButton = bookElement.querySelector('[data-book-button="prev"]');
  const nextButton = bookElement.querySelector('[data-book-button="next"]');

  let currentLocation = 0;
  let maxLocation = pages.length;
  let indexCounter = pages.length;
  let initialIndexCounter = pages.length;

  if (element == 'desktop') {
    prevButton.addEventListener('click', prevPageHandler);
    nextButton.addEventListener('click', nextPageHandler);
  } else if (element == 'mobile') {
    prevButton.addEventListener('click', prevPageHandlerMobile);
    nextButton.addEventListener('click', nextPageHandlerMobile);
  }

  pages.forEach((page) => {
    page.style.zIndex = initialIndexCounter;
    initialIndexCounter--;
  });

  navButton.forEach((button) => {
    button.addEventListener('click', () => {
      if (currentLocation > 0) openBook();
      if (currentLocation == 0) closeBook(true);
      if (currentLocation == maxLocation) closeBook(false);
      if (currentLocation == maxLocation) indexCounter = 0;
      navState();
    });
  });

  /**
   * Set states.
   */

  function coverPageIndex(page) {
    page.style.zIndex = maxLocation;
    setTimeout(() => {
      page.style.zIndex = 1;
    }, 500);
  }

  function openBook() {
    book.setAttribute('data-book', 'middle-pages');

    if (currentLocation == maxLocation - 1 && book.getAttribute('data-book-direction') == 'backward') {
      coverPageIndex(pages[maxLocation - 1]);

      pages.forEach((page, index) => {
        page.style.zIndex = 1;
      });
    }
  }

  function closeBook(isAtBeginning) {
    if (isAtBeginning) {
      book.setAttribute('data-book', 'cover');
      book.setAttribute('data-book-direction', 'forward');
      book.classList.remove('book--left-view');
      book.classList.remove('book--right-view');
    } else {
      book.setAttribute('data-book', 'back-cover');
      book.setAttribute('data-book-direction', 'backward');
      book.classList.remove('book--left-view');
      book.classList.remove('book--right-view');
    }
  }

  /**
   * Set navigation.
   */

  function navState() {
    if (currentLocation == 0) {
      prevButton.style.opacity = '.5';
      prevButton.disabled = true;
    } else if (currentLocation == maxLocation) {
      nextButton.style.opacity = '.5';
      nextButton.disabled = true;
    } else {
      prevButton.style.opacity = '1';
      prevButton.disabled = false;
      nextButton.style.opacity = '1';
      nextButton.disabled = false;
    }
  }

  navState();

  function nextPage() {
    book.setAttribute('data-book-active-page', currentLocation);
    book.setAttribute('data-book-direction', 'forward');
    pages[currentLocation].style.zIndex = indexCounter;
    pages[currentLocation].classList.add('book__page--flipped');

    currentLocation++;
  }

  function prevPage() {
    currentLocation--;
    indexCounter++;

    book.setAttribute('data-book-active-page', currentLocation);
    book.setAttribute('data-book-direction', 'backward');
    pages[currentLocation].style.zIndex = indexCounter;
    pages[currentLocation].classList.remove('book__page--flipped');
  }

  /**
   * Handler / Destkop.
   */

  function nextPageHandler() {
    if (currentLocation >= 0 && currentLocation < maxLocation) nextPage();
  }

  function prevPageHandler() {
    if (currentLocation > 0 && currentLocation <= maxLocation) prevPage();
  }

  /**
   * Handler / Mobile.
   */

  function nextPageHandlerMobile() {
    if (book.getAttribute('data-book-direction') == 'backward') {
      if (!book.classList.contains('book--right-view')) {
        book.classList.add('book--right-view');
      } else {
        book.classList.remove('book--right-view');
        book.classList.toggle('book--left-view');
        book.classList.contains('book--left-view') ? nextPage() : null;
      }
    } else {
      book.classList.remove('book--right-view');
      book.classList.toggle('book--left-view');
      book.classList.contains('book--left-view') ? nextPage() : null;
    }
  }

  function prevPageHandlerMobile() {
    if (book.getAttribute('data-book-direction') == 'forward') {
      if (!book.classList.contains('book--left-view')) {
        book.classList.add('book--left-view');
      } else {
        book.classList.remove('book--left-view');
        book.classList.toggle('book--right-view');
        book.classList.contains('book--right-view') ? prevPage() : null;
      }
    } else {
      book.classList.remove('book--left-view');
      book.classList.toggle('book--right-view');
      book.classList.contains('book--right-view') ? prevPage() : null;
    }
  }
}

if (document.querySelector('[data-book]') != null) {
  initFlipBook('desktop');
  initFlipBook('mobile');
}

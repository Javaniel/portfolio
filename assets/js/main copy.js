(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

/**
   * Whatsapp button
   */
const floatButton = document.querySelector('.float');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    floatButton.classList.add('visible');
  } else {
    floatButton.classList.remove('visible');
  }
});

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  const lightbox = GLightbox({
  selector: '.portfolio-lightbox'
});

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

document.addEventListener('DOMContentLoaded', () => {
  const portfolioSlider = new Swiper('.portfolio-details-slider', {
    
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('mainImage');
  const lightboxLink = mainImage.closest('a');
  const thumbnails = document.querySelectorAll('.thumbnail');
  let activeIndex = 0;

  function showImage(index) {
    const thumb = thumbnails[index];
    if (!thumb) return;

    activeIndex = index;

    // Actualiza imagen destacada
    const src = thumb.getAttribute('src');
    mainImage.src = src;
    lightboxLink.href = src;

    // Oculta el thumbnail activo
    thumbnails.forEach(t => t.style.display = 'block');
    thumb.style.display = 'none';
  }

  // Evento clic para cada thumbnail
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', (e) => {
      e.preventDefault(); // para evitar que abra el lightbox desde el thumbnail
      showImage(index);
    });
  });

  // Botones prev/next
  document.querySelector('.prev-button').addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + thumbnails.length) % thumbnails.length;
    showImage(activeIndex);
  });

  document.querySelector('.next-button').addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % thumbnails.length;
    showImage(activeIndex);
  });

  // Mostrar la imagen por defecto al cargar
  showImage(0);
});


// === Carrusel de thumbnails ===
const thumbnails = document.querySelectorAll('.thumbnail');
const wrapper = document.querySelector('.thumbnails-wrapper');
const visibleCount = 4;
let activeIndex = 0;

function updateMainImage(index) {
  const mainImage = document.getElementById('mainImage');
  if (mainImage && thumbnails[index]) {
    mainImage.src = thumbnails[index].src;
    activeIndex = index;

    const start = Math.max(0, Math.min(activeIndex - 1, thumbnails.length - visibleCount));
    const scrollOffset = start * (thumbnails[0].offsetHeight + 12); // 12 = gap
    if (wrapper) {
      wrapper.style.transform = `translateY(-${scrollOffset}px)`;
    }
  }
}

function showImage(index) {
  if (!thumbnails[index]) return;
  activeIndex = index;
  mainImage.src = thumbnails[activeIndex].src;
}

document.querySelector('.prev-button').addEventListener('click', () => {
  activeIndex = (activeIndex - 1 + thumbnails.length) % thumbnails.length;
  showImage(activeIndex);
});

document.querySelector('.next-button').addEventListener('click', () => {
  activeIndex = (activeIndex + 1) % thumbnails.length;
  showImage(activeIndex);
});

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    activeIndex = index;
    showImage(activeIndex);
  });
});

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    updateMainImage(index);
  });
});

// Inicializa si hay imágenes
if (thumbnails.length > 0) {
  updateMainImage(0);
}



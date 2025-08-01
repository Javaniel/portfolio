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
  const mainImage = document.getElementById('mainImage');
  const lightboxLink = mainImage.closest('a');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const wrapper = document.querySelector('.thumbnails-wrapper');
  const visibleCount = 4;
  let activeIndex = 0;

  // ====================
  // Lightbox Initialization
  // ====================

  // Recolecta las imágenes del data-gallery
  const galleryLinks = Array.from(document.querySelectorAll('[data-gallery="projectGallery"]'));

  document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
  thumb.addEventListener('click', (e) => {
    // 👇 Evita que el lightbox se dispare desde thumbnails
    e.stopPropagation();
    e.preventDefault();

    showImage(index); // Tu función para cambiar la imagen principal
  });
});


  // Prepara lista única de imágenes sin repetir
  const galleryItems = galleryLinks.map(link => ({
    href: link.getAttribute('href'),
    type: 'image'
  }));

  // Inicializa el GLightbox con la lista
  const glightbox = GLightbox({
    elements: galleryItems
  });
  
  // ====================
  // Mostrar imagen destacada
  // ====================
  function showImage(index) {
    const thumb = thumbnails[index];
    if (!thumb) return;

    activeIndex = index;

    const src = thumb.getAttribute('src');
    mainImage.src = src;
    lightboxLink.href = src;

    // Quitar clase activa de todos y agregar al actual
    thumbnails.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');

    // Scroll thumbnails (ajusta para horizontal en mobile)
    if (window.innerWidth <= 768) {
      // Centra el thumbnail activo en el scroll horizontal
      thumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } else {
      // Vertical scroll para desktop
      const start = Math.max(0, Math.min(activeIndex - 1, thumbnails.length - visibleCount));
      const scrollOffset = start * (thumbnails[0].offsetHeight + 12);
      if (wrapper) {
        wrapper.style.transform = `translateY(-${scrollOffset}px)`;
      }
    }
  }

  // Click en thumbnails
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', (e) => {
      e.preventDefault(); // previene abrir lightbox
      showImage(index);
    });
  });

  // Botones navegación
  document.querySelector('.prev-button').addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + thumbnails.length) % thumbnails.length;
    showImage(activeIndex);
  });

  document.querySelector('.next-button').addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % thumbnails.length;
    showImage(activeIndex);
  });

  // Inicializar con la primera imagen
  showImage(0);
});



// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav-menu')
const navLinks = document.querySelectorAll('.nav-link')
const body = document.body

hamburger.addEventListener('click', (e) => {
  e.stopPropagation()
  navMenu.classList.toggle('active')

  // Animate hamburger
  const spans = hamburger.querySelectorAll('span')
  if (navMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)'
    spans[1].style.opacity = '0'
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)'
    body.style.overflow = 'hidden' // Prevent scrolling when menu is open
  } else {
    spans[0].style.transform = 'none'
    spans[1].style.opacity = '1'
    spans[2].style.transform = 'none'
    body.style.overflow = '' // Restore scrolling
  }
})

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    navMenu.classList.contains('active') &&
    !navMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navMenu.classList.remove('active')
    const spans = hamburger.querySelectorAll('span')
    spans[0].style.transform = 'none'
    spans[1].style.opacity = '1'
    spans[2].style.transform = 'none'
    body.style.overflow = ''
  }
})

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active')
    const spans = hamburger.querySelectorAll('span')
    spans[0].style.transform = 'none'
    spans[1].style.opacity = '1'
    spans[2].style.transform = 'none'
    body.style.overflow = ''
  })
})

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight
      const targetPosition = target.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
    }
  })
})

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar')
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)'
    navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)'
  } else {
    navbar.style.background = '#fff'
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)'
  }
})

// Intersection Observer for Animations (optimized for mobile)
const observerOptions = {
  threshold: 0.05, // Lower threshold for mobile
  rootMargin: '0px 0px -50px 0px',
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1'
      entry.target.style.transform = 'translateY(0)'
    }
  })
}, observerOptions)

// Observe sections for animation
const animatedSections = document.querySelectorAll(
  '.about, .packages, .testimonials, .gallery, .contact'
)
animatedSections.forEach((section) => {
  section.style.opacity = '0'
  section.style.transform = 'translateY(20px)' // Reduced for mobile
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease' // Faster for mobile
  observer.observe(section)
})

// Testimonial Cards Animation (optimized for mobile)
const testimonialCards = document.querySelectorAll('.testimonial-card')
testimonialCards.forEach((card, index) => {
  card.style.opacity = '0'
  card.style.transform = 'translateY(20px)'
  card.style.transition = `opacity 0.5s ease ${
    index * 0.08
  }s, transform 0.5s ease ${index * 0.08}s`

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, observerOptions)

  cardObserver.observe(card)
})

// Gallery Items Animation (optimized for mobile)
const galleryItems = document.querySelectorAll('.gallery-item')
galleryItems.forEach((item, index) => {
  item.style.opacity = '0'
  item.style.transform = 'scale(0.95)'
  item.style.transition = `opacity 0.4s ease ${
    index * 0.04
  }s, transform 0.4s ease ${index * 0.04}s`

  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'scale(1)'
      }
    })
  }, observerOptions)

  galleryObserver.observe(item)
})

// Form Submission Handler
const contactForm = document.querySelector('.contact-form')
if (contactForm) {
  const formButton = contactForm.querySelector('.btn')
  const originalText = formButton.textContent

  formButton.addEventListener('click', (e) => {
    e.preventDefault()

    const inputs = contactForm.querySelectorAll('.form-input')
    let allFilled = true

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false
        input.style.borderColor = '#e74c3c'
      } else {
        input.style.borderColor = '#ddd'
      }
    })

    if (allFilled) {
      formButton.textContent = 'Sending...'
      formButton.disabled = true

      // Simulate form submission
      setTimeout(() => {
        formButton.textContent = 'Message Sent!'
        formButton.style.background = '#27ae60'

        inputs.forEach((input) => {
          input.value = ''
        })

        setTimeout(() => {
          formButton.textContent = originalText
          formButton.style.background = ''
          formButton.disabled = false
        }, 2000)
      }, 1500)
    }
  })

  // Clear error state on input
  const inputs = contactForm.querySelectorAll('.form-input')
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        input.style.borderColor = '#ddd'
      }
    })
  })
}

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]')

function highlightNavigation() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute('id')
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove('active')
        link.style.color = ''
      })
      if (navLink) {
        navLink.classList.add('active')
        navLink.style.color = '#2563eb'
      }
    }
  })
}

// Throttle scroll events for better mobile performance
let scrollTimeout
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout)
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    highlightNavigation()
  })
})

// Initial call to set active link on page load
highlightNavigation()

// Detect touch device and add class to body
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  document.body.classList.add('touch-device')
}

// Prevent horizontal scroll on mobile
let touchStartX = 0
let touchEndX = 0

document.addEventListener(
  'touchstart',
  (e) => {
    touchStartX = e.changedTouches[0].screenX
  },
  { passive: true }
)

document.addEventListener(
  'touchend',
  (e) => {
    touchEndX = e.changedTouches[0].screenX
  },
  { passive: true }
)

// Carousel Functionality
const carousel = {
  slides: document.querySelectorAll('.carousel-slide'),
  prevBtn: document.querySelector('.carousel-prev'),
  nextBtn: document.querySelector('.carousel-next'),
  dotsContainer: document.querySelector('.carousel-dots'),
  currentSlide: 0,
  autoplayInterval: null,
  autoplayDelay: 5000,

  init() {
    if (!this.slides.length) return

    // Create dots
    this.createDots()

    // Show first slide
    this.showSlide(0)

    // Event listeners
    this.prevBtn.addEventListener('click', () => this.previousSlide())
    this.nextBtn.addEventListener('click', () => this.nextSlide())

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousSlide()
      if (e.key === 'ArrowRight') this.nextSlide()
    })

    // Touch swipe support
    let touchStart = 0
    let touchEnd = 0

    const carouselContainer = document.querySelector('.carousel-container')

    carouselContainer.addEventListener(
      'touchstart',
      (e) => {
        touchStart = e.changedTouches[0].screenX
      },
      { passive: true }
    )

    carouselContainer.addEventListener(
      'touchend',
      (e) => {
        touchEnd = e.changedTouches[0].screenX
        this.handleSwipe()
      },
      { passive: true }
    )

    // Start autoplay
    this.startAutoplay()

    // Pause autoplay on hover (desktop only)
    carouselContainer.addEventListener('mouseenter', () => this.stopAutoplay())
    carouselContainer.addEventListener('mouseleave', () => this.startAutoplay())
  },

  createDots() {
    this.slides.forEach((_, index) => {
      const dot = document.createElement('span')
      dot.classList.add('carousel-dot')
      if (index === 0) dot.classList.add('active')
      dot.addEventListener('click', () => this.showSlide(index))
      this.dotsContainer.appendChild(dot)
    })
  },

  showSlide(index) {
    // Remove active class from all slides
    this.slides.forEach((slide) => slide.classList.remove('active'))

    // Remove active class from all dots
    const dots = document.querySelectorAll('.carousel-dot')
    dots.forEach((dot) => dot.classList.remove('active'))

    // Add active class to current slide and dot
    this.slides[index].classList.add('active')
    dots[index].classList.add('active')

    this.currentSlide = index
  },

  nextSlide() {
    let next = this.currentSlide + 1
    if (next >= this.slides.length) next = 0
    this.showSlide(next)
    this.resetAutoplay()
  },

  previousSlide() {
    let prev = this.currentSlide - 1
    if (prev < 0) prev = this.slides.length - 1
    this.showSlide(prev)
    this.resetAutoplay()
  },

  handleSwipe() {
    const swipeThreshold = 50
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide()
      } else {
        this.previousSlide()
      }
    }
  },

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide()
    }, this.autoplayDelay)
  },

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval)
      this.autoplayInterval = null
    }
  },

  resetAutoplay() {
    this.stopAutoplay()
    this.startAutoplay()
  },
}

// Initialize carousel when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => carousel.init())
} else {
  carousel.init()
}
// Hero Background Carousel
const heroCarousel = {
  slides: document.querySelectorAll('.hero-slide'),
  currentSlide: 0,
  autoplayInterval: null,
  autoplayDelay: 4000,

  init() {
    if (!this.slides.length) return

    // Show first slide
    this.showSlide(0)

    // Start autoplay
    this.startAutoplay()
  },

  showSlide(index) {
    // Remove active class from all slides
    this.slides.forEach((slide) => slide.classList.remove('active'))

    // Add active class to current slide
    this.slides[index].classList.add('active')

    this.currentSlide = index
  },

  nextSlide() {
    let next = this.currentSlide + 1
    if (next >= this.slides.length) next = 0
    this.showSlide(next)
  },

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide()
    }, this.autoplayDelay)
  },

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval)
      this.autoplayInterval = null
    }
  },
}

// Initialize hero carousel when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => heroCarousel.init())
} else {
  heroCarousel.init()
}

// Video Modal Functionality
const videoModal = document.getElementById('videoModal')
const watchVideoBtn = document.getElementById('watchVideoBtn')
const closeModal = document.getElementById('closeModal')
const videoFrame = document.getElementById('videoFrame')
const videoURL = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'

// Open modal
watchVideoBtn.addEventListener('click', (e) => {
  e.preventDefault()
  videoModal.classList.add('active')
  videoFrame.src = videoURL
  document.body.style.overflow = 'hidden' // Prevent background scrolling
})

// Close modal function
function closeVideoModal() {
  videoModal.classList.remove('active')
  videoFrame.src = '' // Stop video playback
  document.body.style.overflow = '' // Restore scrolling
}

// Close modal on button click
closeModal.addEventListener('click', closeVideoModal)

// Close modal on overlay click
videoModal.addEventListener('click', (e) => {
  if (
    e.target === videoModal ||
    e.target.classList.contains('video-modal-overlay')
  ) {
    closeVideoModal()
  }
})

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && videoModal.classList.contains('active')) {
    closeVideoModal()
  }
})


// Hamburger menu without dependency on jQuery, for modern standards
const hamburger = document.querySelector("#hamburger");
const navLinks = document.querySelector("#nav-links");
const navItems = document.querySelectorAll("#nav-links a");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("open");
});

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("open");
  });
});

// Header animation
let headerCount = 0;
let headerImage = document.querySelector('#headerImage');
let headerTimer = setInterval(swapHeaderImage, 5000);
let headerImages = [
  'assets/images/carousel-1.png', 'assets/images/carousel-2.png',
  'assets/images/carousel-3.png', 'assets/images/carousel-4.png',
  'assets/images/carousel-5.png', 'assets/images/carousel-6.png',
];
let dots = document.querySelectorAll('.dot');

function swapHeaderImage() {
  resetDots();
  headerCount++;
  if (headerCount >= headerImages.length) {
    headerCount = 0;
  }
  headerImage.style.opacity = 0;

  setTimeout(() => {
    headerImage.setAttribute('src', headerImages[headerCount]);
    headerImage.style.opacity = 1;
    dots[headerCount].classList.add('active');
  }, 300);
}

function setImage(idx) {
  clearInterval(headerTimer);
  resetDots();
  headerCount = idx;
  headerImage.setAttribute('src', headerImages[headerCount]);
  dots[headerCount].classList.add('active');
  headerTimer = setInterval(swapHeaderImage, 5000);
}

function resetDots() {
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
}

// Scroll animation
let scrollElementsSelectors = [
  '.about-line', '.about-heading', '.about-title',
  '.about-paragraph-1', '.about-paragraph-2', '.about-paragraph-3',
  '.about-image', '.checklist li', '.learn-more-box-1',
  '.learn-more-box-2', '.product-line', '.service-line',
  '.gallery-line', '.contact-line'
];

let scrollElements = document.querySelectorAll(scrollElementsSelectors.join(', '));

function handleScroll() {
  for (let i = 0; i < scrollElements.length; i++) {
    let element = scrollElements[i];
    let elementPosition = element.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 1.3;

    if (elementPosition < screenPosition) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  }
}

window.addEventListener("scroll", handleScroll);

// Product section animation
let productButtons = document.querySelectorAll('.order-box');
let checkoutBtn = document.querySelector('#checkoutBtn');
let infoText = document.querySelector('#info');
let itemCount = 0;

for (let i = 0; i < productButtons.length; i++) {
  productButtons[i].addEventListener('click', function () {
    toggleProductSelection(i);
  });
}

function toggleProductSelection(idx) {
  const productButton = productButtons[idx];

  if (productButton.classList.contains('selected')) {
    itemCount--;
    productButton.classList.remove('selected');
    productButton.textContent = 'Add to Cart';
  } else {
    itemCount++;
    productButton.classList.add('selected');
    productButton.textContent = 'Remove';
  }

  updateInfoText();
  toggleCheckoutButton();
}

function updateInfoText() {
  infoText.textContent = `${itemCount} items in your cart!`;
}

function toggleCheckoutButton() {
  if (itemCount >= 2) {
    checkoutBtn.removeAttribute('disabled');
  } else {
    checkoutBtn.setAttribute('disabled', '');
  }
}

checkoutBtn.addEventListener('click', function () {
  window.location.href = 'checkout.html';
});

// product-subsection animation
let scrollImages = document.querySelector('.scroll-images');
let images = document.querySelectorAll('.scroll-images .image-item');

scrollImages.innerHTML += scrollImages.innerHTML;

let scrollSpeed = 0.3;
let scrollPosition = 0;
let totalWidth = scrollImages.scrollWidth / 2;

function animateScroll() {
  scrollPosition -= scrollSpeed;

  if (scrollPosition <= -totalWidth) {
    scrollPosition = 0;
  }

  scrollImages.style.transform = `translateX(${scrollPosition}px)`;
}

setInterval(animateScroll, 8);

// Gallery lightbox animation
let galleryItems = document.querySelectorAll('.gallery-item');
let lightbox = document.querySelector('#lightbox');
let lightboxImg = document.querySelector('#lightbox-img');
let closeBtn = document.querySelector('#close');
let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');

let currentIndex = 0;

for (let i = 0; i < galleryItems.length; i++) {
  galleryItems[i].addEventListener('click', () => {
    const img = galleryItems[i].querySelector('.gallery-image');
    if (img) {
      currentIndex = i;
      openLightbox(img.src);
    }
  });
}

function openLightbox(src) {
  lightbox.classList.add('active');
  lightboxImg.src = src;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  const prevImg = galleryItems[currentIndex].querySelector('.gallery-image');
  if (prevImg) {
    lightboxImg.src = prevImg.src;
  }
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  const nextImg = galleryItems[currentIndex].querySelector('.gallery-image');
  if (nextImg) {
    lightboxImg.src = nextImg.src;
  }
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});
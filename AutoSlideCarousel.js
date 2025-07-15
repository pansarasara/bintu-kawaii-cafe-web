
// AutoSlideCarousel.js
// A responsive carousel that auto-slides and supports drag interactions
// Features:
// - Shows 6 items at once on desktop (responsive on smaller screens)
// - Auto slides with a configurable interval
// - Supports drag interactions with velocity-based movement
// - Pure JavaScript, HTML, CSS with Tailwind classes

class AutoSlideCarousel {
  constructor(container, options = {}) {
    // Container element
    this.container = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;
    
    if (!this.container) {
      console.error('Carousel container not found');
      return;
    }
    
    // Default options
    this.options = {
      itemsToShow: 6,          // Number of items visible at once (desktop)
      autoplaySpeed: 3000,     // Auto slide interval in ms
      transitionSpeed: 500,    // Transition speed in ms
      gap: 16,                 // Gap between items in px
      ...options
    };
    
    // State variables
    this.currentIndex = 0;
    this.items = [];
    this.itemWidth = 0;
    this.trackWidth = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startScrollLeft = 0;
    this.scrollWidth = 0;
    this.autoplayInterval = null;
    this.lastTime = 0;
    this.lastTranslateX = 0;
    this.velocity = 0;
    
    // Create DOM elements
    this.init();
  }
  
  init() {
    // Create main elements
    this.createCarouselDOM();
    
    // Add items
    if (this.options.items && Array.isArray(this.options.items)) {
      this.addItems(this.options.items);
    }
    
    // Add event listeners
    this.addEventListeners();
    
    // Start autoplay
    this.startAutoplay();
    
    // Initial resize
    this.handleResize();
    
    // Add resize listener
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  
  createCarouselDOM() {
    // Create the carousel structure
    this.container.classList.add('relative', 'overflow-hidden');
    
    // Create wrapper
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('carousel-wrapper', 'w-full', 'overflow-hidden');
    
    // Create track
    this.track = document.createElement('div');
    this.track.classList.add(
      'carousel-track', 
      'flex', 
      'items-center',
      'transition-transform',
      'duration-500',
      'ease-out'
    );
    this.track.style.gap = `${this.options.gap}px`;
    
    // Append elements
    this.wrapper.appendChild(this.track);
    this.container.appendChild(this.wrapper);
    
    // Add controls if needed
    this.addControls();
  }
  
  addControls() {
    // Create control buttons (optional)
    const prevButton = document.createElement('button');
    prevButton.classList.add(
      'carousel-prev',
      'absolute',
      'left-2',
      'top-1/2',
      '-translate-y-1/2',
      'z-10',
      'bg-white/80',
      'hover:bg-white',
      'rounded-full',
      'p-2',
      'shadow-md',
      'hidden',
      'sm:flex',
      'items-center',
      'justify-center'
    );
    prevButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    `;
    
    const nextButton = document.createElement('button');
    nextButton.classList.add(
      'carousel-next',
      'absolute',
      'right-2',
      'top-1/2',
      '-translate-y-1/2',
      'z-10',
      'bg-white/80',
      'hover:bg-white',
      'rounded-full',
      'p-2',
      'shadow-md',
      'hidden',
      'sm:flex',
      'items-center',
      'justify-center'
    );
    nextButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    `;
    
    prevButton.addEventListener('click', () => this.prev());
    nextButton.addEventListener('click', () => this.next());
    
    this.container.appendChild(prevButton);
    this.container.appendChild(nextButton);
  }
  
  addItems(items) {
    // Clear existing items
    this.track.innerHTML = '';
    this.items = [];
    
    // Add each item to the track
    items.forEach((item, index) => {
      const itemElement = this.createItemElement(item, index);
      this.track.appendChild(itemElement);
      this.items.push(itemElement);
    });
    
    // Update sizes
    this.calculateSizes();
    
    // Clone items for infinite effect
    this.addClones();
  }
  
  createItemElement(item, index) {
    const itemElement = document.createElement('div');
    itemElement.classList.add(
      'carousel-item', 
      'flex-shrink-0',
      'flex',
      'items-center',
      'justify-center'
    );
    
    // Make sure our carousel item has the right styles
    itemElement.style.transition = 'transform 0.3s ease';
    
    // If item is a string (URL), create an image
    if (typeof item === 'string' && (item.endsWith('.png') || item.endsWith('.jpg') || item.endsWith('.jpeg') || item.endsWith('.svg'))) {
      const img = document.createElement('img');
      img.src = item;
      img.alt = `Carousel item ${index + 1}`;
      img.classList.add('object-contain', 'w-full', 'h-full', 'select-none');
      img.draggable = false; // Prevent native drag
      itemElement.appendChild(img);
    } else if (typeof item === 'object' && item.type === 'image') {
      // If item is an object with image data
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || `Carousel item ${index + 1}`;
      img.classList.add('object-contain', 'w-full', 'h-full', 'select-none');
      img.draggable = false;
      itemElement.appendChild(img);
    } else {
      // For any other content
      itemElement.innerHTML = item.toString();
    }
    
    return itemElement;
  }
  
  calculateSizes() {
    if (!this.items.length) return;
    
    // Calculate new item width
    const containerWidth = this.wrapper.offsetWidth;
    const totalGapsWidth = this.options.gap * (this.options.itemsToShow - 1);
    this.itemWidth = (containerWidth - totalGapsWidth) / this.options.itemsToShow;
    
    // Set item width
    this.items.forEach(item => {
      item.style.width = `${this.itemWidth}px`;
    });
    
    // Calculate track width
    this.trackWidth = (this.itemWidth + this.options.gap) * this.items.length - this.options.gap;
    this.track.style.width = `${this.trackWidth}px`;
  }
  
  addClones() {
    // For infinite scrolling effect
    const numberOfClones = this.options.itemsToShow * 2;
    
    // Add start clones
    for (let i = 0; i < numberOfClones && i < this.items.length; i++) {
      const clone = this.items[this.items.length - 1 - i].cloneNode(true);
      clone.classList.add('clone', 'start-clone');
      this.track.insertBefore(clone, this.track.firstChild);
    }
    
    // Add end clones
    for (let i = 0; i < numberOfClones && i < this.items.length; i++) {
      const clone = this.items[i].cloneNode(true);
      clone.classList.add('clone', 'end-clone');
      this.track.appendChild(clone);
    }
    
    // Recalculate track width
    const allItems = this.track.querySelectorAll('.carousel-item');
    this.trackWidth = (this.itemWidth + this.options.gap) * allItems.length - this.options.gap;
    this.track.style.width = `${this.trackWidth}px`;
    
    // Set initial position (adjusted for clones)
    this.currentIndex = numberOfClones;
    this.goToIndex(this.currentIndex, false);
  }
  
  goToIndex(index, withAnimation = true) {
    const translateX = -1 * index * (this.itemWidth + this.options.gap);
    
    if (!withAnimation) {
      this.track.style.transition = 'none';
      this.track.style.transform = `translateX(${translateX}px)`;
      // Force reflow
      this.track.offsetHeight;
      this.track.style.transition = `transform ${this.options.transitionSpeed}ms ease-out`;
    } else {
      this.track.style.transform = `translateX(${translateX}px)`;
    }
    
    this.currentIndex = index;
  }
  
  startAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
    
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, this.options.autoplaySpeed);
  }
  
  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
  
  next() {
    this.goToIndex(this.currentIndex + 1);
    
    // Handle infinite scroll
    const allItems = this.track.querySelectorAll('.carousel-item');
    if (this.currentIndex >= allItems.length - this.options.itemsToShow) {
      setTimeout(() => {
        const numberOfClones = this.options.itemsToShow * 2;
        this.goToIndex(numberOfClones, false);
      }, this.options.transitionSpeed);
    }
  }
  
  prev() {
    this.goToIndex(this.currentIndex - 1);
    
    // Handle infinite scroll
    if (this.currentIndex < 0) {
      setTimeout(() => {
        const allItems = this.track.querySelectorAll('.carousel-item');
        const numberOfClones = this.options.itemsToShow * 2;
        this.goToIndex(allItems.length - numberOfClones - 1, false);
      }, this.options.transitionSpeed);
    }
  }
  
  addEventListeners() {
    // Mouse and touch events for drag functionality
    this.track.addEventListener('mousedown', this.onDragStart.bind(this));
    this.track.addEventListener('touchstart', this.onDragStart.bind(this), { passive: true });
    
    window.addEventListener('mousemove', this.onDragMove.bind(this));
    window.addEventListener('touchmove', this.onDragMove.bind(this), { passive: false });
    
    window.addEventListener('mouseup', this.onDragEnd.bind(this));
    window.addEventListener('touchend', this.onDragEnd.bind(this));
    
    // Transition end
    this.track.addEventListener('transitionend', this.onTransitionEnd.bind(this));
    
    // Stop autoplay on hover/touch
    this.container.addEventListener('mouseenter', this.stopAutoplay.bind(this));
    this.container.addEventListener('touchstart', this.stopAutoplay.bind(this), { passive: true });
    
    // Resume autoplay when mouse leaves
    this.container.addEventListener('mouseleave', this.startAutoplay.bind(this));
    this.container.addEventListener('touchend', this.startAutoplay.bind(this));
  }
  
  onDragStart(e) {
    if (e.type === 'touchstart') {
      this.startX = e.touches[0].clientX;
    } else {
      this.startX = e.clientX;
      e.preventDefault(); // Prevent text selection during drag
    }
    
    this.isDragging = true;
    this.startTime = Date.now();
    
    // Get current translateX value
    const transformMatrix = window.getComputedStyle(this.track).transform;
    let translateX = 0;
    
    if (transformMatrix !== 'none') {
      const matrix = transformMatrix.match(/^matrix\((.+)\)$/);
      if (matrix) {
        translateX = parseFloat(matrix[1].split(', ')[4]);
      }
    }
    
    this.lastTranslateX = translateX;
    
    // Disable transition during drag
    this.track.style.transition = 'none';
    
    // Stop autoplay while dragging
    this.stopAutoplay();
  }
  
  onDragMove(e) {
    if (!this.isDragging) return;
    
    let currentX;
    if (e.type === 'touchmove') {
      currentX = e.touches[0].clientX;
      // Prevent page scrolling when dragging horizontally
      if (Math.abs(currentX - this.startX) > 5) {
        e.preventDefault();
      }
    } else {
      currentX = e.clientX;
    }
    
    const diff = currentX - this.startX;
    const newTranslateX = this.lastTranslateX + diff;
    
    // Apply the translation
    this.track.style.transform = `translateX(${newTranslateX}px)`;
    
    // Calculate velocity for momentum scrolling
    const now = Date.now();
    const elapsed = now - this.lastTime;
    
    if (elapsed > 5) { // Update every 5ms for smoother calculation
      this.velocity = 0.8 * (diff / elapsed) + 0.2 * this.velocity;
      this.startX = currentX;
      this.lastTranslateX = newTranslateX;
      this.lastTime = now;
    }
  }
  
  onDragEnd() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    
    // Re-enable transitions
    this.track.style.transition = `transform ${this.options.transitionSpeed}ms ease-out`;
    
    // Calculate the nearest item based on position and velocity
    const transformMatrix = window.getComputedStyle(this.track).transform;
    let currentTranslateX = 0;
    
    if (transformMatrix !== 'none') {
      const matrix = transformMatrix.match(/^matrix\((.+)\)$/);
      if (matrix) {
        currentTranslateX = parseFloat(matrix[1].split(', ')[4]);
      }
    }
    
    // Calculate the nearest index based on current position
    let nearestIndex = Math.round(-currentTranslateX / (this.itemWidth + this.options.gap));
    
    // Apply velocity for momentum effect
    // The higher the velocity, the more items we scroll
    const velocityItems = Math.sign(this.velocity) * Math.min(Math.abs(Math.round(this.velocity * 10)), 3);
    nearestIndex -= velocityItems;
    
    // Ensure the index is within bounds
    const allItems = this.track.querySelectorAll('.carousel-item');
    nearestIndex = Math.max(0, Math.min(nearestIndex, allItems.length - this.options.itemsToShow));
    
    // Snap to the nearest item
    this.goToIndex(nearestIndex);
    
    // Reset velocity
    this.velocity = 0;
    
    // Resume autoplay after drag
    this.startAutoplay();
  }
  
  onTransitionEnd() {
    // Handle infinite scroll wrap
    const allItems = this.track.querySelectorAll('.carousel-item');
    const numberOfClones = this.options.itemsToShow * 2;
    
    if (this.currentIndex < numberOfClones) {
      this.goToIndex(allItems.length - numberOfClones - 1 + (this.currentIndex % numberOfClones), false);
    } else if (this.currentIndex >= allItems.length - numberOfClones) {
      this.goToIndex(numberOfClones + ((this.currentIndex - numberOfClones) % (allItems.length - numberOfClones * 2)), false);
    }
  }
  
  handleResize() {
    // Recalculate sizes on window resize
    this.calculateSizes();
    
    // Reposition track
    this.goToIndex(this.currentIndex, false);
  }
  
  // Public methods
  
  // Start the carousel
  play() {
    this.startAutoplay();
  }
  
  // Pause the carousel
  pause() {
    this.stopAutoplay();
  }
  
  // Go to a specific index
  goTo(index) {
    const allItems = this.track.querySelectorAll('.carousel-item');
    const numberOfClones = this.options.itemsToShow * 2;
    const targetIndex = numberOfClones + index;
    
    if (targetIndex < allItems.length - numberOfClones) {
      this.goToIndex(targetIndex);
    }
  }
  
  // Refresh the carousel
  refresh() {
    this.handleResize();
  }
  
  // Destroy the carousel
  destroy() {
    // Stop autoplay
    this.stopAutoplay();
    
    // Remove event listeners
    window.removeEventListener('resize', this.handleResize.bind(this));
    
    this.track.removeEventListener('mousedown', this.onDragStart.bind(this));
    this.track.removeEventListener('touchstart', this.onDragStart.bind(this));
    
    window.removeEventListener('mousemove', this.onDragMove.bind(this));
    window.removeEventListener('touchmove', this.onDragMove.bind(this));
    
    window.removeEventListener('mouseup', this.onDragEnd.bind(this));
    window.removeEventListener('touchend', this.onDragEnd.bind(this));
    
    // Clear the container
    this.container.innerHTML = '';
  }
}

export default AutoSlideCarousel;

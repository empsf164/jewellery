// Main Luxury Store JS
document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.querySelector('header.sticky-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Drawer Overlay & Side Drawers ---
  const overlay = document.querySelector('.drawer-overlay');
  const drawers = document.querySelectorAll('.side-drawer');
  const closeBtns = document.querySelectorAll('.close-drawer-btn');

  // Universal close drawer function
  function closeAllDrawers() {
    drawers.forEach(drawer => drawer.classList.remove('active'));
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (overlay) {
    overlay.addEventListener('click', closeAllDrawers);
  }

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeAllDrawers);
  });

  // Open Drawer trigger helper
  window.openDrawer = function(drawerId) {
    closeAllDrawers();
    const target = document.getElementById(drawerId);
    if (target) {
      target.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  // --- Mobile Hamburger Menu ---
  const hamburgerBtn = document.querySelector('.hamburger-menu');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      openDrawer('mobile-menu-drawer');
    });
  }

  // --- Search Drawer Trigger ---
  const searchTriggers = document.querySelectorAll('.search-trigger');
  searchTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer('search-drawer');
    });
  });

  // --- Mini Cart & Wishlist Trigger ---
  const cartTriggers = document.querySelectorAll('.cart-trigger');
  cartTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer('cart-drawer');
    });
  });

  // --- LocalStorage eCommerce Engine ---
  window.getCart = function() {
    return JSON.parse(localStorage.getItem('luxury_cart')) || [];
  };

  window.saveCart = function(cart) {
    localStorage.setItem('luxury_cart', JSON.stringify(cart));
    updateBadges();
    updateMiniCartUI();
  };

  window.addToCart = function(product, quantity = 1, selectedSize = 'Default', selectedMetal = 'Default') {
    let cart = getCart();
    let existingIndex = cart.findIndex(item => 
      item.id === product.id && 
      item.size === selectedSize && 
      item.metal === selectedMetal
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity,
        size: selectedSize,
        metal: selectedMetal
      });
    }

    saveCart(cart);
    showNotification(`${product.title} added to shopping bag.`);
    openDrawer('cart-drawer');
  };

  window.removeFromCart = function(index) {
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
  };

  window.updateCartQty = function(index, qty) {
    let cart = getCart();
    if (qty <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = qty;
    }
    saveCart(cart);
    // If we're on the cart.html page, we also want to reload the cart content
    if (window.renderFullCart) {
      renderFullCart();
    }
  };

  // Wishlist Functions
  window.getWishlist = function() {
    return JSON.parse(localStorage.getItem('luxury_wishlist')) || [];
  };

  window.saveWishlist = function(wishlist) {
    localStorage.setItem('luxury_wishlist', JSON.stringify(wishlist));
    updateBadges();
  };

  window.toggleWishlist = function(product) {
    let wishlist = getWishlist();
    let index = wishlist.findIndex(item => item.id === product.id);

    if (index > -1) {
      wishlist.splice(index, 1);
      saveWishlist(wishlist);
      showNotification(`${product.title} removed from wishlist.`);
    } else {
      wishlist.push(product);
      saveWishlist(wishlist);
      showNotification(`${product.title} saved to wishlist.`);
    }
    // Refresh Wishlist UI if page is wishlist.html
    if (window.renderWishlistPage) {
      renderWishlistPage();
    }
  };

  // Notification Banner
  window.showNotification = function(message) {
    const notifyContainer = document.getElementById('notification-toast') || createNotificationContainer();
    notifyContainer.textContent = message;
    notifyContainer.classList.add('show');
    setTimeout(() => {
      notifyContainer.classList.remove('show');
    }, 3000);
  };

  function createNotificationContainer() {
    const div = document.createElement('div');
    div.id = 'notification-toast';
    div.style.position = 'fixed';
    div.style.bottom = '20px';
    div.style.right = '20px';
    div.style.backgroundColor = 'var(--color-primary)';
    div.style.color = 'var(--color-background)';
    div.style.padding = '1rem 2rem';
    div.style.fontSize = '0.85rem';
    div.style.letterSpacing = '0.05em';
    div.style.borderLeft = '4px solid var(--color-accent)';
    div.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
    div.style.zIndex = '9999';
    div.style.opacity = '0';
    div.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    div.style.transform = 'translateY(20px)';
    
    // Add custom class to handle styling in css
    div.className = 'luxury-toast';
    document.body.appendChild(div);
    
    // Quick CSS rules inject for toast transition
    const style = document.createElement('style');
    style.innerHTML = `
      .luxury-toast.show {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);

    return div;
  }

  // Update Badges on navbar
  function updateBadges() {
    const cartCountBadges = document.querySelectorAll('.cart-count-badge');
    const wishlistCountBadges = document.querySelectorAll('.wishlist-count-badge');
    
    const cart = getCart();
    const cartTotalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadges.forEach(badge => {
      badge.textContent = cartTotalQty;
      badge.style.display = cartTotalQty > 0 ? 'flex' : 'none';
    });

    const wishlist = getWishlist();
    wishlistCountBadges.forEach(badge => {
      badge.textContent = wishlist.length;
      badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    });
  }

  // Mini Cart UI Drawer Render
  function updateMiniCartUI() {
    const cartItemsWrapper = document.querySelector('.mini-cart-items-wrapper');
    const miniCartTotal = document.querySelector('.mini-cart-total-price');
    const checkoutBtn = document.querySelector('.mini-cart-checkout-btn');
    const cart = getCart();
    
    if (!cartItemsWrapper) return;

    cartItemsWrapper.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsWrapper.innerHTML = `
        <div class="text-center py-5">
          <p class="text-muted">Your luxury shopping bag is currently empty.</p>
        </div>
      `;
      if (miniCartTotal) miniCartTotal.textContent = '$0.00';
      if (checkoutBtn) checkoutBtn.style.display = 'none';
      return;
    }

    if (checkoutBtn) checkoutBtn.style.display = 'block';

    let total = 0;
    cart.forEach((item, idx) => {
      const itemSubtotal = parseFloat(item.price.replace(/[$,]/g, '')) * item.quantity;
      total += itemSubtotal;

      const itemHtml = `
        <div class="d-flex mb-4 align-items-center">
          <img src="${item.image}" alt="${item.title}" style="width: 70px; height: 75px; object-fit: cover; border: 1px solid var(--color-border);" class="me-3">
          <div class="flex-grow-1">
            <h6 class="mb-1 font-editorial" style="font-size: 1.05rem;">${item.title}</h6>
            <small class="d-block text-muted mb-1" style="font-size: 0.75rem;">Metal: ${item.metal} | Size: ${item.size}</small>
            <div class="d-flex justify-content-between align-items-center">
              <span class="font-pricing text-bronze" style="font-size: 0.9rem;">${item.price} x ${item.quantity}</span>
              <div class="d-flex align-items-center">
                <button onclick="updateCartQty(${idx}, ${item.quantity - 1})" class="btn p-1 px-2 border" style="font-size: 0.7rem;">-</button>
                <span class="mx-2" style="font-size: 0.8rem;">${item.quantity}</span>
                <button onclick="updateCartQty(${idx}, ${item.quantity + 1})" class="btn p-1 px-2 border" style="font-size: 0.7rem;">+</button>
              </div>
            </div>
          </div>
          <button onclick="removeFromCart(${idx})" class="btn text-danger ms-2" style="font-size: 0.9rem;"><i class="bi bi-trash"></i></button>
        </div>
      `;
      cartItemsWrapper.innerHTML += itemHtml;
    });

    if (miniCartTotal) {
      miniCartTotal.textContent = `$${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }

  // --- Detail Page Product Interactive Actions ---
  // Switch Thumbnail Image
  const thumbnails = document.querySelectorAll('.thumbnail-img');
  const mainImage = document.querySelector('.detail-main-img img');
  if (thumbnails && mainImage) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const newSrc = this.querySelector('img').getAttribute('src');
        mainImage.setAttribute('src', newSrc);
      });
    });
  }

  // Size Button Toggle
  const sizeBtns = document.querySelectorAll('.size-btn');
  if (sizeBtns) {
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        sizeBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // Metal Selector Toggle
  const metalBtns = document.querySelectorAll('.metal-btn');
  if (metalBtns) {
    metalBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        metalBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Optionally update text display of selected metal
        const label = document.getElementById('selected-metal-label');
        if (label) {
          label.textContent = this.getAttribute('data-metal-name');
        }
      });
    });
  }

  // Appoint Booking Form Action
  const appointForm = document.getElementById('consultation-booking-form');
  if (appointForm) {
    appointForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Premium experience popup
      alert('Thank you. Your private consultation request is received. A boutique concierge representative will contact you via email within 2 hours to confirm your schedule.');
      appointForm.reset();
    });
  }

  // Contact Form Action
  const contactForm = document.getElementById('boutique-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Your inquiry is received. A client advisor will respond within 24 business hours.');
      contactForm.reset();
    });
  }

  // Run initialization updates
  updateBadges();
  updateMiniCartUI();
});

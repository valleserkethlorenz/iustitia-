
(function() {
  function init() {
    const burger = document.getElementById('burger-menu');
    const nav = document.querySelector('.nav-links'); // your <ul class="nav-links">
    if (!burger || !nav) return;

    const BREAKPOINT = 800; // mobile breakpoint

    // Accessibility
    burger.setAttribute('role', 'button');
    burger.setAttribute('tabindex', '0');
    burger.setAttribute('aria-label', 'Menu');
    burger.setAttribute('aria-expanded', 'false');

    let isOpen = false;

    function setOpen(open) {
      isOpen = open;
      nav.classList.toggle('show', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

      // prevent body scroll without hiding scrollbar
      if (isOpen) {
        document.body.classList.add('menu-open');
      } else {
        document.body.classList.remove('menu-open');
      }
    }

    // Toggle menu on click
    burger.addEventListener('click', function() {
      setOpen(!isOpen);
    });

    // Toggle menu on keyboard (Enter / Space)
    burger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        setOpen(!isOpen);
      }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (isOpen && !nav.contains(e.target) && e.target !== burger) {
        setOpen(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && isOpen) {
        setOpen(false);
      }
    });

    // Auto-close on resize above breakpoint
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > BREAKPOINT && isOpen) {
          setOpen(false);
        }
      }, 120);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


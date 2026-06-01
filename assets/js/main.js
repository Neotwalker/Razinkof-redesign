(() => {
  const body = document.body;
  const burger = document.querySelector('[data-burger]');
  const nav = document.querySelector('[data-nav]');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('open');
      body.classList.toggle('menu-open');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('open');
      body.classList.remove('menu-open');
    }));
  }

  const modal = document.querySelector('[data-modal]');
  const openModal = () => {
    modal?.classList.add('open');
    modal?.setAttribute('aria-hidden', 'false');
    body.classList.add('no-scroll');
  };
  const closeModal = () => {
    modal?.classList.remove('open');
    modal?.setAttribute('aria-hidden', 'true');
    body.classList.remove('no-scroll');
  };
  document.querySelectorAll('[data-modal-open]').forEach((btn) => btn.addEventListener('click', openModal));
  document.querySelectorAll('[data-modal-close]').forEach((btn) => btn.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  const form = document.querySelector('[data-form]');
  const success = document.querySelector('[data-success]');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    success?.classList.add('show');
    form.reset();
  });

  document.querySelectorAll('.faq-item button').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const content = item.querySelector('div');
      const isOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach((faq) => {
        faq.classList.remove('active');
        faq.querySelector('div').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  const reviews = document.querySelector('[data-reviews]');
  const showReviews = document.querySelector('[data-show-reviews]');
  showReviews?.addEventListener('click', () => {
    reviews?.classList.toggle('open');
    showReviews.textContent = reviews?.classList.contains('open') ? 'Скрыть' : 'Смотреть больше';
  });

  const cookie = document.querySelector('[data-cookie]');
  const accept = document.querySelector('[data-cookie-accept]');
  if (localStorage.getItem('razinkoff_cookie') === 'ok') cookie?.classList.add('hidden');
  accept?.addEventListener('click', () => {
    localStorage.setItem('razinkoff_cookie', 'ok');
    cookie?.classList.add('hidden');
  });



  const tiltScene = document.querySelector('[data-tilt-scene]');
  if (tiltScene && window.matchMedia('(min-width: 721px)').matches) {
    const layers = tiltScene.querySelectorAll('[data-depth]');
    const moveScene = (event) => {
      const rect = tiltScene.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 10);
        const tx = x * depth;
        const ty = y * depth * -0.7;
        layer.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      });
    };
    const resetScene = () => {
      layers.forEach((layer) => {
        layer.style.transform = 'translate3d(0,0,0)';
      });
    };
    tiltScene.addEventListener('mousemove', moveScene);
    tiltScene.addEventListener('mouseleave', resetScene);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

document.addEventListener('DOMContentLoaded', () => {

  // ========== PRELOADER ==========
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });
  setTimeout(() => {
    if (!preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
    }
  }, 3000);


  // ========== NAVBAR SCROLL ==========
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // ========== MOBILE MENU ==========
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const body = document.body;

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      body.style.overflow = '';
    });
  });


  // ========== INTERSECTION OBSERVER ==========
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Trigger counters when counters row is revealed
        if (entry.target.id === 'counters-row') {
          startCounters();
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections that need reveal animation
  document.querySelectorAll('.reveal-divider, .reveal-left, .reveal-right, .reveal-cards, #counters-row, .cta-content').forEach(el => {
    observer.observe(el);
  });


  // ========== ANIMATED COUNTERS ==========
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    const counters = document.querySelectorAll('.counter-num');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 1500;
      const step = Math.max(Math.floor(duration / target), 20);
      let current = 0;

      const timer = setInterval(() => {
        current += Math.ceil(target / (duration / step));
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, step);
    });
  }


  // ========== PORTFOLIO FILTER ==========
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 350);
        }
      });
    });
  });


  // ========== LIGHTBOX ==========
  const lightbox = document.getElementById('lightbox');
  const backdrop = document.getElementById('lightbox-backdrop');
  const closeBtn = document.getElementById('lightbox-close');
  const lbBadge = document.getElementById('lb-badge');
  const lbTitle = document.getElementById('lb-title');
  const lightboxBody = document.getElementById('lightbox-body');
  const lbMeta = document.getElementById('lb-meta');
  const lbCopy = document.getElementById('lb-copy');

  const projects = {
    1: {
      title: 'Virginia',
      tag: 'لوكسري',
      client: 'Virginia Cosmetics (GCC)',
      scope: 'حملة إطلاق • هوية تواصلية',
      year: '2025',
      desc: 'حملة إطلاق متكاملة لماركة عطور ومستحضرات تجميل فاخرة في السعودية والخليج. تم صياغة هوية تواصلية راقية تعكس الفخامة والتراث العطري الشرقي، مع نصوص تسويقية ثنائية اللغة تخاطب الذوق الرفيع.',
      copy_ar: 'ثنائية الروح والجسد.. عطور تروي تفاصيلك قبل أن تتحدث. عندما يمتزج عبق الشرق العريق بنقاء العصر الحديث، نبتكر سيمفونية عطرية تليق بحضورك الفاخر.',
      copy_en: 'A duality of soul and body... fragrances that narrate your details before you speak. When the essence of the ancient East blends with modern purity, we compose an olfactory symphony worthy of your presence.'
    },
    2: {
      title: 'Lee Parc',
      tag: 'ضيافة',
      client: 'Lee Parc Developments (KSA)',
      scope: 'استراتيجية محتوى • تخطيط شهري',
      year: '2025',
      desc: 'استراتيجية محتوى متكاملة لمجتمع سكني فاخر في الرياض. تصميم محتوى يعكس أسلوب الحياة الهادئ والفاخر مع لمسات معمارية أوروبية، ونصوص تسويقية تجمع بين الدفء المحلي والجمال العالمي.',
      copy_ar: 'حيث تتحدث الطبيعة بلغة الضوء والظل. في لي بارك، صممنا لك مساحات تتنفس الحياة، لتكون ملاذك الهادئ في قلب الرياض النابض.',
      copy_en: 'Where nature speaks in the language of light and shadow. At Lee Parc, we designed living spaces that breathe life, to be your serene sanctuary in the heart of bustling Riyadh.'
    },
    3: {
      title: 'Alwajeeh Telecom',
      tag: 'تكنولوجيا',
      client: 'Alwajeeh Telecom (KSA)',
      scope: 'محتوى موقع • حملات إطلاق',
      year: '2024',
      desc: 'كتابة محتوى موقع إلكتروني وحملات إعلانية لموزع أجهزة اتصال وتقنية في السعودية. نصوص تسويقية موجهة للشباب السعودي مع الحفاظ على الطابع المهني، ورسائل تركز على الثقة والسرعة.',
      copy_ar: 'تواصل بلا حدود، وسرعة تواكب شغفك. نقرب المسافات بأحدث الابتكارات التقنية الموثوقة لتصنع يومك بكل سهولة.',
      copy_en: 'Boundless communication, and speed that matches your passion. We bridge the distance with the latest authentic tech innovations to power your day with absolute ease.'
    },
    4: {
      title: 'Tomato Agency',
      tag: 'تسويق رقمي',
      client: 'Tomato Digital Agency (Egypt)',
      scope: 'هوية صوتية • استراتيجية محتوى',
      year: '2023-2025',
      desc: 'بناء الهوية الصوتية والاستراتيجية المحتوى لمكتب تسويق رقمي. كتابة مقالات قيادة فكرية على لينكد إن وتحليل اتجاهات السوق في الخليج، مع نصوص تسويقية تعكس الخبرة والثقة.',
      copy_ar: 'التسويق لا يتعلق ببيع المنتجات، بل بصياغة تصورات تدوم. في طماطم، لا نطلق حملات فحسب؛ بل نبني الهوية الرقمية التي تقود السوق.',
      copy_en: 'Marketing is not about selling products; it is about crafting perceptions that endure. At Tomato, we do not just launch campaigns; we engineer the digital identity that commands the market.'
    },
    5: {
      title: 'Extra Sales',
      tag: 'خدمات',
      client: 'Extra Sales Digital (Egypt & Iraq)',
      scope: 'محتوى SEO • أدلة تسويقية',
      year: '2023',
      desc: 'إنتاج أدلة تسويقية شاملة ومحتوى SEO متخصص للتسويق الرقمي في مصر والعراق. نصوص متوازنة بين تحسين محركات البحث والأسلوب الجذاب، تهدف لبناء الثقة وجذب العملاء.',
      copy_ar: 'كيف تتصدر نتائج البحث وتجذب العملاء بفاعلية؟ دليلنا الشامل للتسويق الرقمي مصمم لمساعدة الشركات في مصر والعراق على تحويل النقرات إلى أرباح حقيقية.',
      copy_en: 'How to dominate search results and acquire customers effectively? Our comprehensive digital marketing guide is engineered to help businesses in Egypt and Iraq turn clicks into real commercial conversions.'
    },
    6: {
      title: 'AlRasail',
      tag: 'هدايا',
      client: 'AlRasail Corporation (KSA)',
      scope: 'سوشيال ميديا • نصوص منتجات',
      year: '2024',
      desc: 'هوية سوشيال ميديا لعلامة هدايا مؤسسية فاخرة في السعودية. محتوى يعكس فن التقدير والامتنان بأسلوب فاخر ودافئ، مع نصوص تسويقية تخاطب الشركات وتعزز الشراكات التجارية.',
      copy_ar: 'رسائل تُكتب بالود، وهدايا تُصاغ بالامتنان. نوفر لعلامتكم التجارية أرقى حلول الإهداء الفاخرة التي تعزز شراكاتكم وتترك انطباعاً لا يزول.',
      copy_en: 'Messages written with warmth, and gifts crafted with gratitude. We provide your brand with the finest luxury gifting solutions that reinforce your partnerships and leave an everlasting impression.'
    }
  };

  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-project');
      const data = projects[id];
      if (!data) return;

      lbBadge.textContent = data.tag;
      lbTitle.textContent = data.title;
      lightboxBody.innerHTML = `<p>${data.desc}</p>`;
      lbMeta.innerHTML = `
        <div class="lb-meta-item">
          <span class="lb-meta-label">العميل</span>
          <span class="lb-meta-value">${data.client}</span>
        </div>
        <div class="lb-meta-item">
          <span class="lb-meta-label">نطاق العمل</span>
          <span class="lb-meta-value">${data.scope}</span>
        </div>
        <div class="lb-meta-item">
          <span class="lb-meta-label">السنة</span>
          <span class="lb-meta-value">${data.year}</span>
        </div>
      `;
      lbCopy.innerHTML = `
        <span class="lb-copy-label">نموذج من النصوص</span>
        <div class="lb-copy-ar">${data.copy_ar}</div>
        <div class="lb-copy-en">${data.copy_en}</div>
      `;

      lightbox.classList.add('open');
      body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });


  // ========== SMOOTH SCROLL FOR NAV ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

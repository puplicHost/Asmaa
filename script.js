document.addEventListener('DOMContentLoaded', () => {
  // 1. Cinematic Preloader & Page Entrance
  const preloader = document.getElementById('preloader');
  const body = document.body;

  window.addEventListener('load', () => {
    // Wait slightly for the bar animation to finish
    setTimeout(() => {
      preloader.style.transform = 'translateY(-100%)';
      body.style.overflowY = 'auto';
      
      // Trigger Hero animations
      const heroVisual = document.querySelector('.hero-portrait');
      if (heroVisual) {
        heroVisual.style.transform = 'scale(1.0)';
      }
    }, 1500);
  });

  // Fallback in case load event takes too long
  setTimeout(() => {
    if (preloader.style.transform !== 'translateY(-100%)') {
      preloader.style.transform = 'translateY(-100%)';
      body.style.overflowY = 'auto';
    }
  }, 3500);


  // 2. Custom Cursor (Fluid desktop interactions)
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation loop for cursors
  function animateCursors() {
    // Top-left coordinate offsets to center the cursor
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;
    
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    if (cursor) {
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    }
    
    if (follower) {
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
    }

    requestAnimationFrame(animateCursors);
  }
  animateCursors();

  // Hover states
  const hoverElements = document.querySelectorAll('a, button, select, input, textarea, .chronicle-card, .explorer-tab-btn');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      body.classList.add('cursor-hovering');
    });
    el.addEventListener('mouseleave', () => {
      body.classList.remove('cursor-hovering');
    });
  });


  // 3. Magnetic Hover Effect (Awwwards-level polish)
  const magneticTargets = document.querySelectorAll('.magnetic-target');
  
  magneticTargets.forEach(target => {
    target.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      // Calculate mouse position relative to target center
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      // Pull button slightly towards mouse
      this.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
      if (this.querySelector('span')) {
        this.querySelector('span').style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      }
    });

    target.addEventListener('mouseleave', function() {
      // Return to center
      this.style.transform = '';
      if (this.querySelector('span')) {
        this.querySelector('span').style.transform = '';
      }
    });
  });


  // 4. Floating Navbar Transparency on Scroll
  const nav = document.getElementById('luxury-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });


  // 5. Mobile Navigation Overlay
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function toggleMenu() {
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    if (mobileMenu.classList.contains('open')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }

  navToggle.addEventListener('click', toggleMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      body.style.overflow = '';
    });
  });


  // 6. Intersection Observer for Scroll Reveals and Counters
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Trigger stat counter if this is the stats section
        if (entry.target.classList.contains('stats-row')) {
          startCounters();
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document.querySelectorAll('.scroll-reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // Stats Counters Function
  let countersStarted = false;
  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;

    const stats = document.querySelectorAll('.stat-num');
    stats.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const duration = 2000; // 2s duration
      const stepTime = Math.max(Math.floor(duration / target), 30);
      let current = 0;

      const timer = setInterval(() => {
        current += Math.ceil(target / (duration / stepTime));
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = current;
        }
      }, stepTime);
    });
  }


  // 7. Spectrum Industry Explorer Tabs
  const tabBtns = document.querySelectorAll('.explorer-tab-btn');
  const panels = document.querySelectorAll('.explorer-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active states
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Add active state to clicked button
      btn.classList.add('active');

      // Get target sector panel and reveal it
      const targetSector = btn.getAttribute('data-sector');
      const targetPanel = document.getElementById(`sector-${targetSector}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });


  // 8. Chronicles Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const chronicleCards = document.querySelectorAll('.chronicle-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      chronicleCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350); // Matches transitions
        }
      });
    });
  });


  // 9. Case Studies Data & Interactive Drawer Injection
  const caseStudies = {
    virginia: {
      title: "Virginia",
      sector: "Luxury Beauty & Cosmetics",
      client: "Virginia Cosmetics (GCC & Egypt)",
      scope: "Launch Campaign, Copywriting, Brand Storytelling",
      year: "2025",
      overview: "Virginia is an upscale, boutique cosmetics house seeking to capture the highly competitive luxury fragrance market in Saudi Arabia and the GCC. The goal was to establish a sensory, poetic brand voice that makes consumers feel they are purchasing a piece of olfactory heritage.",
      strategy: "I crafted a bilingual narrative focusing on raw premium ingredients (oud, jasmine, sand) and the emotional experience of scent. We positioned the brand around 'sensory signatures'—stories that narrate the wearer's presence before they speak. We created a modular calendar structure that balances product benefits with premium lifestyle mood boards.",
      copy_ar: "ثنائية الروح والجسد.. عطورٌ تروي تفاصيلك قبل أن تتحدث. عندما يمتزج عبق الشرق العريق بنقاء العصر الحديث، نبتكر سيمفونية عطرية تليق بحضورك الفاخر.",
      copy_en: "A duality of soul and body... fragrances that narrate your details before you speak. When the essence of the ancient East blends with modern purity, we compose an olfactory symphony worthy of your luxurious presence."
    },
    leeparc: {
      title: "Lee Parc",
      sector: "Premium Hospitality & Real Estate",
      client: "Lee Parc Developments (Saudi Arabia)",
      scope: "Social Media Strategy, Monthly Content Planning",
      year: "2025",
      overview: "Lee Parc is an upscale residential and lifestyle compound in Riyadh, catering to high-net-worth individuals seeking modern green sanctuaries. The challenge was to maintain active engagement across social media while conveying European architectural standards mixed with local warm hospitality.",
      strategy: "We established a content system divided into three pillars: 'The Architectural Dialogue', 'The Green Sanctuary Lifestyle', and 'The Community Connection'. The copywriting was designed to feel airy, elegant, and peaceful, matching the aesthetics of luxury lifestyle magazines like Kinfolk.",
      copy_ar: "حيث تتحدث الطبيعة بلغة الضوء والظل. في لي بارك، صممنا لك مساحات تتنفس الحياة، لتكون ملاذك الهادئ في قلب الرياض النابض.",
      copy_en: "Where nature speaks in the language of light and shadow. At Lee Parc, we designed living spaces that breathe life, to be your serene sanctuary in the heart of bustling Riyadh."
    },
    alwajeeh: {
      title: "Alwajeeh Telecom",
      sector: "E-Commerce & Digital Retail",
      client: "Alwajeeh Telecom (KSA)",
      scope: "Website Copywriting, Launch Campaigns",
      year: "2024",
      overview: "Alwajeeh Telecom is a prominent distributor of high-end telecommunications and smart home automation devices in Saudi Arabia. They needed website content and ad copy to launch their premium retail stores and e-commerce portal.",
      strategy: "The messaging was optimized for trust, swift tech delivery, and lifestyle integration. I created localized ad hooks focusing on KSA's tech-savvy youth, highlighting customer-first policies and product authenticity.",
      copy_ar: "تواصل بلا حدود، وسرعة تواكب شغفك. نقرب المسافات بأحدث الابتكارات التقنية الموثوقة لتصنع يومك بكل سهولة.",
      copy_en: "Boundless communication, and speed that matches your passion. We bridge the distance with the latest authentic tech innovations to power your day with absolute ease."
    },
    tomato: {
      title: "Tomato Agency",
      sector: "B2B Marketing & Brand Consulting",
      client: "Tomato Digital Agency (Egypt & Remote)",
      scope: "Brand Voice Definition, B2B LinkedIn Strategy",
      year: "2023 - 2025",
      overview: "Tomato Agency is a high-growth marketing firm delivering digital execution to Middle Eastern brands. As their core Content Specialist, I helped establish their own brand voice to attract enterprise clients.",
      strategy: "I designed an authoritative, insight-driven brand tone. Wrote a series of thought leadership articles on LinkedIn analyzing marketing trends in the GCC, showcasing Tomato Agency's strategic execution.",
      copy_ar: "التسويق لا يتعلق ببيع المنتجات، بل بصياغة تصورات تدوم. في طماطم، لا نطلق حملات فحسب؛ بل نبني الهوية الرقمية التي تقود السوق.",
      copy_en: "Marketing is not about selling products; it is about crafting perceptions that endure. At Tomato, we don't just launch campaigns; we engineer the digital identity that commands the market."
    },
    extra: {
      title: "Extra Sales Agency",
      sector: "B2B Sales & Digital Marketing",
      client: "Extra Sales Digital (Egypt & Iraq)",
      scope: "SEO Copywriting, Website Content, Digital Marketing Guides",
      year: "2023",
      overview: "Extra Sales Agency provides digital growth and search positioning services. I was tasked with writing a suite of comprehensive, high-ranking SEO website guides focusing on 'Digital Marketing in Iraq', 'SEO in Egypt', and 'Social Media Agencies in Egypt'.",
      strategy: "I conducted deep search intent mapping and competitor analysis. Wrote content that balanced complex SEO parameters with an engaging, highly readable style to build authority and drive leads.",
      copy_ar: "كيف تتصدر نتائج البحث وتجذب العملاء بفاعلية؟ دليلنا الشامل للتسويق الرقمي مصمم لمساعدة الشركات في مصر والعراق على تحويل النقرات إلى أرباح حقيقية.",
      copy_en: "How to dominate search engine results and acquire customers effectively? Our comprehensive digital marketing guide is engineered to help businesses in Egypt and Iraq turn clicks into real commercial conversions."
    },
    alrasail: {
      title: "AlRasail Ksa",
      sector: "Luxury Gifting & Communication",
      client: "AlRasail Corporation (Saudi Arabia)",
      scope: "Social Media Strategy, Product Copywriting",
      year: "2024",
      overview: "AlRasail KSA is a high-end corporate gifting brand that designs customized, premium gift sets and luxury stationery for GCC corporations. They needed copy that reflected prestige, appreciation, and cultural warmth.",
      strategy: "I structured the brand copy around 'The Art of Appreciation' (فن التقدير). The language focused on elegance, premium materials, and strengthening business partnerships through curated gifts.",
      copy_ar: "رسائل تُكتب بالود، وهدايا تُصاغ بالامتنان. نوفر لعلامتكم التجارية أرقى حلول الإهداء الفاخرة التي تعزز شراكاتكم وتترك انطباعاً لا يزول.",
      copy_en: "Messages written with warmth, and gifts crafted with gratitude. We provide your brand with the finest luxury gifting solutions that reinforce your partnerships and leave an everlasting impression."
    },
    alraddadi: {
      title: "AlRaddadi Telecom",
      sector: "Telecom Retail & E-Commerce",
      client: "AlRaddadi Telecom (Saudi Arabia)",
      scope: "Product Launch Copywriting, Ad Copy",
      year: "2024",
      overview: "AlRaddadi Telecom is a growing retail chain in Saudi Arabia. I created promotional copy, landing page banners, and social media hooks for their device launch events and seasonal offers.",
      strategy: "Focused on instant benefits (installment offers, official warranty, fast delivery) written in a lively, friendly Gulf Arabic dialect to connect with daily retail shoppers.",
      copy_ar: "أحدث الهواتف الذكية بين يديك وبأفضل عروض التقسيط الميسرة! مع الردادي، الموثوقية تبدأ من الضمان وحتى باب بيتك.",
      copy_en: "The latest smart devices in your hands with the best flexible installment plans! With AlRaddadi, reliability starts from the warranty straight to your doorstep."
    },
    hope: {
      title: "Hope Trade",
      sector: "Industrial B2B & Home Automation",
      client: "Hope Trade International (Egypt)",
      scope: "Corporate Profile, B2B Website Copywriting",
      year: "2023",
      overview: "Hope Trade distributes smart home automation systems and architectural hardware. They required a structured corporate profile and website content to pitch to large real estate developers.",
      strategy: "Created an authoritative, engineer-focused corporate voice. The narrative emphasized safety, energy efficiency, state-of-the-art automation integration, and corporate reliability.",
      copy_ar: "التحكم الذكي يبدأ من التخطيط السليم. نقدم أنظمة أتمتة منزلية وحلولاً هندسية متكاملة تمنح مبانيكم الأمان، الكفاءة والرفاهية المطلقة.",
      copy_en: "Smart control begins with sound planning. We deliver integrated home automation and engineering systems that endow your structures with safety, energy efficiency, and absolute comfort."
    }
  };

  const drawer = document.getElementById('project-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerPlaceholder = document.getElementById('drawer-content-placeholder');

  function openDrawer(projectId) {
    const data = caseStudies[projectId];
    if (!data) return;

    // Inject Case Study layout into drawer
    drawerPlaceholder.innerHTML = `
      <div class="case-study-shell">
        <div class="case-meta">
          <span class="case-sector">${data.sector}</span>
          <h3 class="case-title">${data.title}</h3>
          <p class="case-tagline">"${data.scope}"</p>
          
          <div class="case-info-table">
            <div>
              <span class="info-col-label">CLIENT</span>
              <span class="info-col-val">${data.client}</span>
            </div>
            <div>
              <span class="info-col-label">YEAR</span>
              <span class="info-col-val">${data.year}</span>
            </div>
            <div>
              <span class="info-col-label">STRATEGY</span>
              <span class="info-col-val">Localized Copy</span>
            </div>
          </div>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">THE CONTEXT</h4>
          <p>${data.overview}</p>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">THE STRATEGY</h4>
          <p>${data.strategy}</p>
        </div>

        <div class="case-section">
          <h4 class="case-section-title">SELECTED COPY HIGHLIGHT</h4>
          
          <div class="copy-specimen">
            <span class="specimen-label">ARABIC CAMPAIGN SLOGAN</span>
            <div class="specimen-text-ar">${data.copy_ar}</div>
            
            <span class="specimen-label" style="margin-top: 24px;">ENGLISH BRAND CONCEPT</span>
            <div class="specimen-text-en">${data.copy_en}</div>
          </div>
        </div>

        <div class="case-links">
          <p style="font-size: 0.85rem; color: rgba(18, 56, 55, 0.5);">Note: This campaign was launched live in regional markets including Saudi Arabia, Egypt, and other GCC countries.</p>
        </div>
      </div>
    `;

    // Show Drawer
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
    body.classList.add('drawer-open');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
    body.classList.remove('drawer-open');
  }

  // Bind chronicle clicks
  chronicleCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      openDrawer(projectId);
    });
  });

  // Bind close actions
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  
  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // 10. Scroll Spy for Mobile Bottom Navigation
  const mobileTabs = document.querySelectorAll('.mobile-app-tab');
  const scrollSections = document.querySelectorAll('header, section');

  function scrollSpy() {
    let currentSectionId = 'philosophy';
    const scrollPosition = window.scrollY + 250;

    scrollSections.forEach(section => {
      const id = section.getAttribute('id');
      if (id && section.offsetTop <= scrollPosition) {
        currentSectionId = id;
      }
    });

    mobileTabs.forEach(tab => {
      tab.classList.remove('active');
      const href = tab.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        tab.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);
  scrollSpy();

  // 11. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  
  function toggleBackToTop() {
    if (window.scrollY > 600) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

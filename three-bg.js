// Three.js Section Backgrounds - Classic Luxury Design
(function() {
  // Colors from the design system
  const colors = {
    primary: new THREE.Color(0x2F7C7A),
    accent1: new THREE.Color(0xFFD248),
    accent2: new THREE.Color(0xA7BEC1),
    dark: new THREE.Color(0x123837),
    sand: new THREE.Color(0xF1E4CF)
  };

  // ============================================
  // Hero Section (existing)
  // ============================================
  function initHero() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const shapes = [];
    const geometries = [
      new THREE.OctahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.3, 8, 16),
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.DodecahedronGeometry(1, 0),
    ];

    const materials = [
      new THREE.MeshBasicMaterial({ color: colors.primary, wireframe: true, transparent: true, opacity: 0.15 }),
      new THREE.MeshBasicMaterial({ color: colors.accent1, wireframe: true, transparent: true, opacity: 0.12 }),
      new THREE.MeshBasicMaterial({ color: colors.accent2, wireframe: true, transparent: true, opacity: 0.1 }),
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 20;
      mesh.position.z = (Math.random() - 0.5) * 15 - 5;

      const scale = Math.random() * 0.8 + 0.3;
      mesh.scale.set(scale, scale, scale);

      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.008,
        rotSpeedY: (Math.random() - 0.5) * 0.008,
        rotSpeedZ: (Math.random() - 0.5) * 0.005,
        floatSpeed: Math.random() * 0.003 + 0.001,
        floatOffset: Math.random() * Math.PI * 2,
        originalY: mesh.position.y
      };

      shapes.push(mesh);
      scene.add(mesh);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFD248, 0.3);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 8;
    camera.position.y = 1;

    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
      requestAnimationFrame(animate);
      targetX += (mouseX - targetX) * 0.02;
      targetY += (mouseY - targetY) * 0.02;

      shapes.forEach((shape) => {
        shape.rotation.x += shape.userData.rotSpeedX;
        shape.rotation.y += shape.userData.rotSpeedY;
        shape.rotation.z += shape.userData.rotSpeedZ;
        shape.position.y = shape.userData.originalY + 
          Math.sin(Date.now() * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.5;
      });

      camera.position.x += (targetX * 1.5 - camera.position.x) * 0.02;
      camera.position.y += (targetY * 0.8 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ============================================
  // About Section - Floating Particles
  // ============================================
  function initAbout() {
    const canvas = document.getElementById('three-about');
    if (!canvas) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: colors.primary,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add floating lines
    const linesMaterial = new THREE.LineBasicMaterial({ 
      color: colors.accent1, 
      transparent: true, 
      opacity: 0.1 
    });

    for (let i = 0; i < 8; i++) {
      const lineGeometry = new THREE.BufferGeometry();
      const linePoints = [];
      const startY = (Math.random() - 0.5) * 10;
      const startZ = (Math.random() - 0.5) * 5 - 3;
      
      for (let j = 0; j < 50; j++) {
        linePoints.push(
          -10 + j * 0.4,
          startY + Math.sin(j * 0.2) * 2,
          startZ
        );
      }
      
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
      const line = new THREE.Line(lineGeometry, linesMaterial);
      scene.add(line);
    }

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;
      renderer.render(scene, camera);
    }

    animate();

    const resizeObserver = new ResizeObserver(() => {
      const newRect = canvas.parentElement.getBoundingClientRect();
      camera.aspect = newRect.width / newRect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(newRect.width, newRect.height);
    });
    resizeObserver.observe(canvas.parentElement);
  }

  // ============================================
  // Services Section - Orbiting Shapes
  // ============================================
  function initServices() {
    const canvas = document.getElementById('three-services');
    if (!canvas) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Create orbiting rings
    const rings = [];
    for (let i = 0; i < 4; i++) {
      const ringGeometry = new THREE.TorusGeometry(3 + i * 0.8, 0.02, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: i % 2 === 0 ? colors.primary : colors.accent1, 
        transparent: true, 
        opacity: 0.08 + (i * 0.02) 
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + (i * 0.2);
      ring.rotation.z = i * 0.3;
      rings.push(ring);
      scene.add(ring);
    }

    // Create orbiting dots
    const dots = [];
    for (let i = 0; i < 30; i++) {
      const dotGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const dotMaterial = new THREE.MeshBasicMaterial({ 
        color: Math.random() > 0.5 ? colors.accent1 : colors.primary,
        transparent: true,
        opacity: 0.3
      });
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      
      const angle = (i / 30) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      dot.position.x = Math.cos(angle) * radius;
      dot.position.y = Math.sin(angle) * radius;
      dot.position.z = (Math.random() - 0.5) * 2;
      
      dot.userData = {
        angle: angle,
        radius: radius,
        speed: 0.002 + Math.random() * 0.003,
        yOffset: dot.position.y,
        zOffset: dot.position.z
      };
      
      dots.push(dot);
      scene.add(dot);
    }

    camera.position.z = 8;

    function animate() {
      requestAnimationFrame(animate);
      
      rings.forEach((ring, i) => {
        ring.rotation.z += 0.001 * (i % 2 === 0 ? 1 : -1);
      });

      dots.forEach((dot) => {
        dot.userData.angle += dot.userData.speed;
        dot.position.x = Math.cos(dot.userData.angle) * dot.userData.radius;
        dot.position.y = Math.sin(dot.userData.angle) * dot.userData.radius;
        dot.position.z = dot.userData.zOffset + Math.sin(Date.now() * 0.001) * 0.3;
      });

      renderer.render(scene, camera);
    }

    animate();

    const resizeObserver = new ResizeObserver(() => {
      const newRect = canvas.parentElement.getBoundingClientRect();
      camera.aspect = newRect.width / newRect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(newRect.width, newRect.height);
    });
    resizeObserver.observe(canvas.parentElement);
  }

  // ============================================
  // Portfolio Section - Grid Pattern
  // ============================================
  function initPortfolio() {
    const canvas = document.getElementById('three-portfolio');
    if (!canvas) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Create grid of floating squares
    const squares = [];
    const gridSize = 6;
    
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const geometry = new THREE.PlaneGeometry(0.8, 0.8);
        const material = new THREE.MeshBasicMaterial({
          color: (x + y) % 2 === 0 ? colors.primary : colors.accent1,
          transparent: true,
          opacity: 0.04,
          side: THREE.DoubleSide
        });
        const square = new THREE.Mesh(geometry, material);
        
        square.position.x = (x - gridSize / 2) * 1.2;
        square.position.y = (y - gridSize / 2) * 1.2;
        square.position.z = -5;
        
        square.userData = {
          originalX: square.position.x,
          originalY: square.position.y,
          phase: Math.random() * Math.PI * 2
        };
        
        squares.push(square);
        scene.add(square);
      }
    }

    camera.position.z = 8;

    function animate() {
      requestAnimationFrame(animate);
      
      squares.forEach((square) => {
        square.position.z = -5 + Math.sin(Date.now() * 0.001 + square.userData.phase) * 0.5;
        square.rotation.z = Math.sin(Date.now() * 0.0005 + square.userData.phase) * 0.1;
      });

      renderer.render(scene, camera);
    }

    animate();

    const resizeObserver = new ResizeObserver(() => {
      const newRect = canvas.parentElement.getBoundingClientRect();
      camera.aspect = newRect.width / newRect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(newRect.width, newRect.height);
    });
    resizeObserver.observe(canvas.parentElement);
  }

  // ============================================
  // Manifesto Section - Dramatic Glow
  // ============================================
  function initManifesto() {
    const canvas = document.getElementById('three-manifesto');
    if (!canvas) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Create dramatic particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: colors.accent1,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add glowing orbs
    const orbs = [];
    for (let i = 0; i < 5; i++) {
      const orbGeometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.5, 16, 16);
      const orbMaterial = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? colors.accent1 : colors.primary,
        transparent: true,
        opacity: 0.08
      });
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      
      orb.position.x = (Math.random() - 0.5) * 15;
      orb.position.y = (Math.random() - 0.5) * 8;
      orb.position.z = -5 - Math.random() * 5;
      
      orb.userData = {
        floatSpeed: 0.001 + Math.random() * 0.002,
        floatOffset: Math.random() * Math.PI * 2,
        originalY: orb.position.y,
        pulseSpeed: 0.002 + Math.random() * 0.003
      };
      
      orbs.push(orb);
      scene.add(orb);
    }

    camera.position.z = 8;

    function animate() {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.y += 0.0003;
      
      orbs.forEach((orb) => {
        orb.position.y = orb.userData.originalY + 
          Math.sin(Date.now() * orb.userData.floatSpeed + orb.userData.floatOffset) * 1;
        orb.scale.setScalar(1 + Math.sin(Date.now() * orb.userData.pulseSpeed) * 0.2);
      });

      renderer.render(scene, camera);
    }

    animate();

    const resizeObserver = new ResizeObserver(() => {
      const newRect = canvas.parentElement.getBoundingClientRect();
      camera.aspect = newRect.width / newRect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(newRect.width, newRect.height);
    });
    resizeObserver.observe(canvas.parentElement);
  }

  // ============================================
  // Contact Section - Flowing Lines
  // ============================================
  function initContact() {
    const canvas = document.getElementById('three-contact');
    if (!canvas) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Create flowing lines
    const lines = [];
    for (let i = 0; i < 10; i++) {
      const lineGeometry = new THREE.BufferGeometry();
      const linePoints = [];
      const startY = (Math.random() - 0.5) * 12;
      const startZ = -3 - Math.random() * 3;
      
      for (let j = 0; j < 100; j++) {
        linePoints.push(
          -15 + j * 0.3,
          startY + Math.sin(j * 0.15) * 2,
          startZ
        );
      }
      
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
      
      const lineMaterial = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? colors.primary : colors.accent1,
        transparent: true,
        opacity: 0.06
      });
      
      const line = new THREE.Line(lineGeometry, lineMaterial);
      line.userData = {
        offset: i * 0.5,
        speed: 0.001 + Math.random() * 0.002
      };
      lines.push(line);
      scene.add(line);
    }

    // Add floating dots
    const dots = [];
    for (let i = 0; i < 40; i++) {
      const dotGeometry = new THREE.SphereGeometry(0.03, 8, 8);
      const dotMaterial = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? colors.accent2 : colors.primary,
        transparent: true,
        opacity: 0.25
      });
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      
      dot.position.x = (Math.random() - 0.5) * 20;
      dot.position.y = (Math.random() - 0.5) * 15;
      dot.position.z = -2 - Math.random() * 5;
      
      dot.userData = {
        floatSpeed: 0.001 + Math.random() * 0.003,
        floatOffset: Math.random() * Math.PI * 2,
        originalY: dot.position.y
      };
      
      dots.push(dot);
      scene.add(dot);
    }

    camera.position.z = 6;

    function animate() {
      requestAnimationFrame(animate);
      
      lines.forEach((line) => {
        line.position.y = Math.sin(Date.now() * line.userData.speed + line.userData.offset) * 0.5;
      });

      dots.forEach((dot) => {
        dot.position.y = dot.userData.originalY + 
          Math.sin(Date.now() * dot.userData.floatSpeed + dot.userData.floatOffset) * 0.8;
      });

      renderer.render(scene, camera);
    }

    animate();

    const resizeObserver = new ResizeObserver(() => {
      const newRect = canvas.parentElement.getBoundingClientRect();
      camera.aspect = newRect.width / newRect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(newRect.width, newRect.height);
    });
    resizeObserver.observe(canvas.parentElement);
  }

  // Initialize all sections
  initHero();
  initAbout();
  initServices();
  initPortfolio();
  initManifesto();
  initContact();
})();

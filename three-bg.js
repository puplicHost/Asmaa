// Three.js 3D Background - Classic Luxury Design
(function() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Colors from the design system
  const colors = {
    primary: 0x2F7C7A,
    accent1: 0xFFD248,
    accent2: 0xA7BEC1,
    dark: 0x123837,
    sand: 0xF1E4CF
  };

  // Create floating geometric shapes
  const shapes = [];
  const shapeCount = 15;

  // Material styles
  const materials = [
    new THREE.MeshBasicMaterial({ color: colors.primary, wireframe: true, transparent: true, opacity: 0.15 }),
    new THREE.MeshBasicMaterial({ color: colors.accent1, wireframe: true, transparent: true, opacity: 0.12 }),
    new THREE.MeshBasicMaterial({ color: colors.accent2, wireframe: true, transparent: true, opacity: 0.1 }),
    new THREE.MeshPhongMaterial({ color: colors.primary, transparent: true, opacity: 0.08, shininess: 100 }),
    new THREE.MeshPhongMaterial({ color: colors.accent1, transparent: true, opacity: 0.06, shininess: 100 }),
  ];

  // Create different geometries
  const geometries = [
    new THREE.OctahedronGeometry(1, 0),
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.TorusGeometry(0.8, 0.3, 8, 16),
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.DodecahedronGeometry(1, 0),
  ];

  // Create shapes
  for (let i = 0; i < shapeCount; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const mesh = new THREE.Mesh(geometry, material);

    // Random position
    mesh.position.x = (Math.random() - 0.5) * 20;
    mesh.position.y = (Math.random() - 0.5) * 20;
    mesh.position.z = (Math.random() - 0.5) * 15 - 5;

    // Random scale
    const scale = Math.random() * 0.8 + 0.3;
    mesh.scale.set(scale, scale, scale);

    // Random rotation speed
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

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xFFD248, 0.3);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Add point light
  const pointLight = new THREE.PointLight(0x2F7C7A, 0.4, 20);
  pointLight.position.set(-5, 3, 2);
  scene.add(pointLight);

  // Camera position
  camera.position.z = 8;
  camera.position.y = 1;

  // Mouse interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Scroll interaction
  let scrollY = 0;
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.02;
    targetY += (mouseY - targetY) * 0.02;

    // Animate shapes
    shapes.forEach((shape, index) => {
      // Rotation
      shape.rotation.x += shape.userData.rotSpeedX;
      shape.rotation.y += shape.userData.rotSpeedY;
      shape.rotation.z += shape.userData.rotSpeedZ;

      // Floating motion
      shape.position.y = shape.userData.originalY + 
        Math.sin(Date.now() * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.5;

      // Parallax with scroll
      const scrollOffset = scrollY * 0.001;
      shape.position.y += scrollOffset * (index % 2 === 0 ? 0.5 : -0.5);
    });

    // Camera follows mouse slightly
    camera.position.x += (targetX * 1.5 - camera.position.x) * 0.02;
    camera.position.y += (targetY * 0.8 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    // Fade out based on scroll
    const heroHeight = document.getElementById('hero').offsetHeight;
    const opacity = Math.max(0, 1 - (scrollY / heroHeight) * 1.5);
    canvas.style.opacity = opacity;

    renderer.render(scene, camera);
  }

  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Hide canvas after scrolling past hero
  window.addEventListener('scroll', () => {
    const heroHeight = document.getElementById('hero').offsetHeight;
    if (scrollY > heroHeight) {
      canvas.style.pointerEvents = 'none';
    } else {
      canvas.style.pointerEvents = 'auto';
    }
  });
})();

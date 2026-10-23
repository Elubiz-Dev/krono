import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Watch3DCanvas({
  isNightMode = false,
  onAngleChange,
}) {
  const mountRef = useRef(null);
  const [modelReady, setModelReady] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Three.js instances
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelGroupRef = useRef(null);
  const lightsRef = useRef({});
  const lumeMaterialsRef = useRef([]);

  // Hotspot DOM refs for direct transform updates (zero React re-renders in RAF)
  const hotspotRefs = {
    bezel: useRef(null),
    cyclops: useRef(null),
    crown: useRef(null),
    bracelet: useRef(null)
  };

  const HOTSPOTS_3D = [
    {
      id: 'bezel',
      title: 'Bisel Cerachrom',
      desc: 'Cerámica de alta dureza graduada a 60 min, resistente a rayaduras y corrosión marina.',
      pos: new THREE.Vector3(-0.35, 0.45, 0.35)
    },
    {
      id: 'cyclops',
      title: 'Cristal & Lente Cyclops',
      desc: 'Zafiro sintético con tratamiento antirreflejos y aumento de 2.5x para lectura instantánea.',
      pos: new THREE.Vector3(0.18, 0.05, 0.38)
    },
    {
      id: 'crown',
      title: 'Corona Triplock',
      desc: 'Sistema patentado de triple hermeticidad enroscado a la caja para máxima estanqueidad.',
      pos: new THREE.Vector3(0.68, 0.0, 0.1)
    },
    {
      id: 'bracelet',
      title: 'Acero Oystersteel 904L',
      desc: 'Eslabones macizos de acabado cepillado con cierre Oysterlock y extensión Glidelock.',
      pos: new THREE.Vector3(0.0, -0.85, 0.25)
    }
  ];

  /* Night Mode Lighting & Materials Toggle */
  useEffect(() => {
    const lights = lightsRef.current;
    if (!lights.ambient) return;

    if (isNightMode) {
      lights.ambient.color.setHex(0x0a192f);
      lights.ambient.intensity = 0.4;

      lights.keyLight.color.setHex(0x0ea5e9);
      lights.keyLight.intensity = 0.9;

      lights.fillLight.intensity = 0.3;
      lights.rimLight.color.setHex(0x06b6d4);
      lights.rimLight.intensity = 1.8;

      if (lights.lumeLight) {
        lights.lumeLight.intensity = 5.0;
      }

      lumeMaterialsRef.current.forEach(mat => {
        if (mat) {
          mat.emissive = new THREE.Color(0x06b6d4);
          mat.emissiveIntensity = 3.5;
        }
      });
    } else {
      lights.ambient.color.setHex(0xffffff);
      lights.ambient.intensity = 1.0;

      lights.keyLight.color.setHex(0xffffff);
      lights.keyLight.intensity = 2.8;

      lights.fillLight.intensity = 1.2;
      lights.rimLight.color.setHex(0x38bdf8);
      lights.rimLight.intensity = 1.2;

      if (lights.lumeLight) {
        lights.lumeLight.intensity = 0.0;
      }

      lumeMaterialsRef.current.forEach(mat => {
        if (mat) {
          mat.emissive = new THREE.Color(0x000000);
          mat.emissiveIntensity = 0.0;
        }
      });
    }
  }, [isNightMode]);

  /* Camera Angle Presets */
  const setCameraPreset = useCallback((preset) => {
    const controls = controlsRef.current;
    const camera = cameraRef.current;
    if (!controls || !camera) return;

    controls.autoRotate = false;
    let targetPos = new THREE.Vector3(0, 0, 2.8);

    if (preset === 'front') {
      targetPos.set(0, 0, 2.8);
    } else if (preset === 'side') {
      targetPos.set(2.6, 0.3, 1.2);
    } else if (preset === 'back') {
      targetPos.set(0, 0.2, -2.8);
    } else if (preset === 'angle') {
      targetPos.set(1.6, 1.0, 2.2);
    }

    const startPos = camera.position.clone();
    let t = 0;
    const animateCam = () => {
      t += 0.06;
      camera.position.lerpVectors(startPos, targetPos, Math.min(t, 1));
      controls.update();
      if (t < 1) requestAnimationFrame(animateCam);
    };
    animateCam();
  }, []);

  /* Main Three.js Initialization */
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Guaranteed non-zero dimensions
    const width = container.clientWidth > 50 ? container.clientWidth : (window.innerWidth || 800);
    const height = container.clientHeight > 50 ? container.clientHeight : 600;
    let aspect = width / height;
    if (!isFinite(aspect) || aspect <= 0) aspect = 1.0;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    camera.position.set(0, 0.1, 2.85);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Orbit Controls (Butter-smooth 360 rotation & zoom)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 1.5;
    controls.maxDistance = 5.0;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.75;
    controls.maxPolarAngle = Math.PI * 0.78;
    controls.minPolarAngle = Math.PI * 0.22;
    controlsRef.current = controls;

    // Throttled angle notification on control change (NOT in RAF)
    let lastAngleReport = 0;
    controls.addEventListener('change', () => {
      const now = performance.now();
      if (now - lastAngleReport > 80 && onAngleChange) {
        lastAngleReport = now;
        const azimuth = controls.getAzimuthalAngle();
        let deg = Math.round((azimuth * 180) / Math.PI);
        if (deg < 0) deg += 360;
        onAngleChange(deg);
      }
    });

    let autoRotateTimer;
    controls.addEventListener('start', () => {
      controls.autoRotate = false;
      clearTimeout(autoRotateTimer);
    });
    controls.addEventListener('end', () => {
      clearTimeout(autoRotateTimer);
      autoRotateTimer = setTimeout(() => {
        controls.autoRotate = true;
      }, 4000);
    });

    // 5. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(3.5, 4.5, 4.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x94a3b8, 1.2);
    fillLight.position.set(-3.5, -1.0, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(0.0, 3.5, -3.5);
    scene.add(rimLight);

    const specLight = new THREE.PointLight(0xffffff, 1.8, 6.0);
    specLight.position.set(0, 0, 2.2);
    scene.add(specLight);

    const lumeLight = new THREE.PointLight(0x06b6d4, 0.0, 3.5);
    lumeLight.position.set(0, 0, 0.4);
    scene.add(lumeLight);

    lightsRef.current = {
      ambient: ambientLight,
      keyLight,
      fillLight,
      rimLight,
      specLight,
      lumeLight
    };

    // 6. Soft Shadow Floor Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.18;
    scene.add(shadowMesh);

    // 7. Load GLB Model
    const loader = new GLTFLoader();
    loader.load(
      '/assets/models/watch.glb',
      (gltf) => {
        const root = gltf.scene;

        // Auto-center and normalize size
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        root.position.x -= center.x;
        root.position.y -= center.y;
        root.position.z -= center.z;

        const maxDim = Math.max(size.x, size.y, size.z) || 1.0;
        const scale = 2.15 / maxDim;
        root.scale.setScalar(scale);

        // Tuning materials
        const lumeMats = [];
        root.traverse((child) => {
          if (child.isMesh && child.material) {
            const mat = child.material;
            const name = (mat.name || child.name || '').toLowerCase();

            if (name.includes('metal') || name.includes('clasp') || name.includes('frame') || name.includes('backplate')) {
              mat.metalness = 0.95;
              mat.roughness = 0.16;
            }
            if (name.includes('glass')) {
              mat.transparent = true;
              mat.opacity = 0.32;
              mat.roughness = 0.04;
              mat.metalness = 0.1;
            }
            if (name.includes('hand') || name.includes('face') || name.includes('dial')) {
              lumeMats.push(mat);
            }
          }
        });

        lumeMaterialsRef.current = lumeMats;

        const modelWrapper = new THREE.Group();
        modelWrapper.add(root);
        scene.add(modelWrapper);
        modelGroupRef.current = modelWrapper;

        setModelReady(true);
      },
      undefined,
      (err) => {
        console.error('Error loading 3D watch model:', err);
        // Fallback flag
        setModelReady(false);
      }
    );

    // 8. 60 FPS Animation Loop (NO React setState inside!)
    let animId;
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();

      // Update hotspot pins directly in DOM via transforms
      if (modelGroupRef.current) {
        const curW = renderer.domElement.clientWidth || width;
        const curH = renderer.domElement.clientHeight || height;
        const widthHalf = curW / 2;
        const heightHalf = curH / 2;

        HOTSPOTS_3D.forEach(hp => {
          const el = hotspotRefs[hp.id]?.current;
          if (!el) return;

          tempVec.copy(hp.pos);
          tempVec.applyMatrix4(modelGroupRef.current.matrixWorld);
          tempVec.project(camera);

          const isFront = tempVec.z < 0.95;
          if (isFront) {
            const x = (tempVec.x * widthHalf) + widthHalf;
            const y = -(tempVec.y * heightHalf) + heightHalf;
            el.style.display = 'flex';
            el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
          } else {
            el.style.display = 'none';
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth > 50 ? container.clientWidth : window.innerWidth;
      const h = container.clientHeight > 50 ? container.clientHeight : 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      clearTimeout(autoRotateTimer);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement.parentNode);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="rm-three-wrapper">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="rm-three-canvas-mount"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 3
        }}
      />

      {/* Instant Backdrop Fallback (NEVER a black screen!) */}
      {!modelReady && (
        <div className="rm-3d-fallback-preview" aria-hidden="true">
          <img
            src={isNightMode ? '/assets/img/rolex_submariner_lume.jpg' : '/assets/img/rolex_submariner_rm360.jpg'}
            alt="Rolex Submariner"
            className="rm-watch-img"
          />
          <div className="rm-3d-loader-tag">
            <div className="rm-loader-spinner" style={{ width: 24, height: 24 }} />
            <span>CALIBRANDO MODELO 3D EN TIEMPO REAL...</span>
          </div>
        </div>
      )}

      {/* 3D Hotspot Overlays (Pinned directly via DOM transform) */}
      {!isNightMode && HOTSPOTS_3D.map(hp => {
        const isSelected = activeHotspot === hp.id;
        return (
          <div
            key={hp.id}
            ref={hotspotRefs[hp.id]}
            className={`rm-3d-hotspot ${isSelected ? 'active' : ''}`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: 'none', // Shown by RAF transform
              zIndex: 10,
              pointerEvents: 'auto'
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveHotspot(isSelected ? null : hp.id);
            }}
          >
            <div className="rm-hotspot-pin" />
            <div className="rm-hotspot-ring" />

            {isSelected && (
              <div className="rm-hotspot-tooltip" style={{ bottom: '28px' }}>
                <h5>{hp.title}</h5>
                <p>{hp.desc}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Quick View Angle Presets */}
      <div className="rm-camera-presets">
        <button
          type="button"
          className="rm-cam-btn"
          onClick={() => setCameraPreset('front')}
          title="Vista Frontal"
        >
          Frontal
        </button>
        <button
          type="button"
          className="rm-cam-btn"
          onClick={() => setCameraPreset('angle')}
          title="Vista en Perspectiva 45°"
        >
          Bisel 45°
        </button>
        <button
          type="button"
          className="rm-cam-btn"
          onClick={() => setCameraPreset('side')}
          title="Vista de Corona & Lateral"
        >
          Corona
        </button>
        <button
          type="button"
          className="rm-cam-btn"
          onClick={() => setCameraPreset('back')}
          title="Vista de Tapa Trasera & Broche"
        >
          Tapa Trasera
        </button>
      </div>
    </div>
  );
}

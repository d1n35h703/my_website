import { useEffect, useRef } from "react";

/**
 * Three.js WebGL field: 15k drifting particles + forward-moving energy lines.
 * Mounted client-side only (three is imported dynamically inside the effect).
 */
export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import("three");
      const { EffectComposer } =
        await import("three/examples/jsm/postprocessing/EffectComposer.js");
      const { RenderPass } = await import("three/examples/jsm/postprocessing/RenderPass.js");
      const { UnrealBloomPass } =
        await import("three/examples/jsm/postprocessing/UnrealBloomPass.js");
      if (disposed) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isSmall = window.innerWidth < 768;
      const PARTICLE_COUNT = isSmall ? 5000 : 15000;
      const LINE_COUNT = isSmall ? 180 : 530;
      const SPREAD = 220;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 90;

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      // ---- particles -------------------------------------------------------
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const origins = new Float32Array(PARTICLE_COUNT * 3);
      const velocities = new Float32Array(PARTICLE_COUNT * 3);
      const colors = new Float32Array(PARTICLE_COUNT * 3);

      const base = new THREE.Color(0x001f3f);
      const accent = new THREE.Color(0xccff00);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const x = (Math.random() - 0.5) * SPREAD;
        const y = (Math.random() - 0.5) * SPREAD * 0.7;
        const z = (Math.random() - 0.5) * SPREAD;
        positions[i3] = origins[i3] = x;
        positions[i3 + 1] = origins[i3 + 1] = y;
        positions[i3 + 2] = origins[i3 + 2] = z;
        colors[i3] = base.r;
        colors[i3 + 1] = base.g;
        colors[i3 + 2] = base.b;
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(particleGeo, particleMat);
      scene.add(points);

      // ---- energy lines ----------------------------------------------------
      const linePositions = new Float32Array(LINE_COUNT * 6);
      const lineSpeeds = new Float32Array(LINE_COUNT);
      for (let i = 0; i < LINE_COUNT; i++) {
        const i6 = i * 6;
        const x = (Math.random() - 0.5) * SPREAD;
        const y = (Math.random() - 0.5) * SPREAD * 0.7;
        const z = -Math.random() * SPREAD;
        const len = 4 + Math.random() * 16;
        linePositions[i6] = x;
        linePositions[i6 + 1] = y;
        linePositions[i6 + 2] = z;
        linePositions[i6 + 3] = x;
        linePositions[i6 + 4] = y;
        linePositions[i6 + 5] = z + len;
        lineSpeeds[i] = 0.25 + Math.random() * 0.85;
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x88aaff,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      // ---- post-processing -------------------------------------------------
      const composer = new EffectComposer(renderer);
      composer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      composer.setSize(window.innerWidth, window.innerHeight);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.1,
        1.0,
      );
      composer.addPass(bloom);

      // ---- pointer ---------------------------------------------------------
      const pointer = new THREE.Vector2(10, 10);
      const raycaster = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const hit = new THREE.Vector3(9999, 9999, 9999);
      let pointerActive = false;

      const onPointerMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        raycaster.ray.intersectPlane(plane, hit);
        pointerActive = true;
      };
      const onPointerLeave = () => {
        pointerActive = false;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      // ---- loop ------------------------------------------------------------
      const tmp = new THREE.Color();
      let raf = 0;
      let paused = document.hidden;
      const onVisibility = () => {
        paused = document.hidden;
      };
      document.addEventListener("visibilitychange", onVisibility);

      const render = () => {
        raf = requestAnimationFrame(render);
        if (paused) return;

        const pos = particleGeo.attributes.position.array as Float32Array;
        const col = particleGeo.attributes.color.array as Float32Array;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3;
          let mix = 0;

          if (pointerActive) {
            const dx = pos[i3] - hit.x;
            const dy = pos[i3 + 1] - hit.y;
            const dz = pos[i3 + 2] - hit.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 20 && dist > 0.0001) {
              const force = (1 - dist / 20) * 0.04;
              velocities[i3] += (dx / dist) * force * 20;
              velocities[i3 + 1] += (dy / dist) * force * 20;
              velocities[i3 + 2] += (dz / dist) * force * 20;
              mix = (1 - dist / 20) * 0.4;
            }
          }

          // spring back home
          velocities[i3] += (origins[i3] - pos[i3]) * 0.012;
          velocities[i3 + 1] += (origins[i3 + 1] - pos[i3 + 1]) * 0.012;
          velocities[i3 + 2] += (origins[i3 + 2] - pos[i3 + 2]) * 0.012;

          velocities[i3] *= 0.9;
          velocities[i3 + 1] *= 0.9;
          velocities[i3 + 2] *= 0.9;

          pos[i3] += velocities[i3];
          pos[i3 + 1] += velocities[i3 + 1];
          pos[i3 + 2] += velocities[i3 + 2];

          tmp.copy(base).lerp(accent, mix);
          col[i3] += (tmp.r - col[i3]) * 0.2;
          col[i3 + 1] += (tmp.g - col[i3 + 1]) * 0.2;
          col[i3 + 2] += (tmp.b - col[i3 + 2]) * 0.2;
        }
        particleGeo.attributes.position.needsUpdate = true;
        particleGeo.attributes.color.needsUpdate = true;

        const lp = lineGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < LINE_COUNT; i++) {
          const i6 = i * 6;
          const speed = reduceMotion ? 0 : lineSpeeds[i];
          lp[i6 + 2] += speed;
          lp[i6 + 5] += speed;
          if (lp[i6 + 2] > camera.position.z) {
            const shift = SPREAD + Math.random() * 60;
            lp[i6 + 2] -= shift;
            lp[i6 + 5] -= shift;
          }
        }
        lineGeo.attributes.position.needsUpdate = true;

        if (!reduceMotion) {
          points.rotation.y += 0.0004;
        }

        composer.render();
      };
      render();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        particleGeo.dispose();
        particleMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        bloom.dispose();
        composer.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />
  );
}

<template>
  <div ref="containerRef" class="fixed inset-0 -z-10" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";

const containerRef = ref<HTMLElement | null>(null);
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let earth: THREE.Mesh;
let moon: THREE.Mesh;
let moonOrbit = 0; // 月の公転角度
let animationId: number;
let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;
let isMobile = false;

const init = () => {
  if (!containerRef.value) return;

  // モバイルデバイスかどうかを判定
  isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

  // シーン作成
  scene = new THREE.Scene();

  // カメラ作成
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 3;

  // レンダラー作成
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  containerRef.value.appendChild(renderer.domElement);

  // 地球のジオメトリとマテリアル
  const geometry = new THREE.SphereGeometry(1, 64, 64);

  // テクスチャローダー
  const textureLoader = new THREE.TextureLoader();

  // 地球のテクスチャを読み込み（Three.js公式）
  const earthTexture = textureLoader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg"
  );

  const material = new THREE.MeshStandardMaterial({
    map: earthTexture,
    roughness: 0.7,
    metalness: 0.2,
  });

  earth = new THREE.Mesh(geometry, material);
  scene.add(earth);

  // 月のジオメトリとマテリアル
  const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32); // 地球の約1/4のサイズ
  const moonTexture = textureLoader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg"
  );
  const moonMaterial = new THREE.MeshStandardMaterial({
    map: moonTexture,
    roughness: 1.0,
    metalness: 0.0,
  });

  moon = new THREE.Mesh(moonGeometry, moonMaterial);
  scene.add(moon);

  // ライト追加
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 3, 5);
  scene.add(directionalLight);

  // アニメーション
  animate();
};

const animate = () => {
  animationId = requestAnimationFrame(animate);

  // 月の公転
  moonOrbit += 0.005; // 公転速度（ゆっくりに）
  const moonDistance = 1.7; // 地球からの距離（近くに）
  moon.position.x = Math.cos(moonOrbit) * moonDistance;
  moon.position.z = Math.sin(moonOrbit) * moonDistance;
  moon.position.y = 0.3;

  // 月の自転
  moon.rotation.y += 0.002;

  if (isMobile) {
    // モバイル: 自動回転
    earth.rotation.y += 0.005;
    earth.rotation.x += 0.001;
  } else {
    // デスクトップ: マウス追従
    targetRotationY = (mouseX / window.innerWidth) * Math.PI * 2;
    targetRotationX = (mouseY / window.innerHeight) * Math.PI * 2;

    // スムーズに回転（イージング）
    earth.rotation.y += (targetRotationY - earth.rotation.y) * 0.05;
    earth.rotation.x += (targetRotationX - earth.rotation.x) * 0.05;

    // 自動回転も少し追加
    earth.rotation.y += 0.001;
  }

  renderer.render(scene, camera);
};

const handleMouseMove = (event: MouseEvent) => {
  mouseX = event.clientX - window.innerWidth / 2;
  mouseY = event.clientY - window.innerHeight / 2;
};

const handleResize = () => {
  if (!containerRef.value) return;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

onMounted(() => {
  init();
  window.addEventListener("resize", handleResize);

  // デスクトップのみマウスイベントを登録
  if (!isMobile) {
    window.addEventListener("mousemove", handleMouseMove);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);

  if (!isMobile) {
    window.removeEventListener("mousemove", handleMouseMove);
  }

  cancelAnimationFrame(animationId);
  if (renderer) {
    renderer.dispose();
  }
});
</script>

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/TextGeometry.js';
import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// 배경검정
scene.background = new THREE.Color(0x000000);

// 조명: 미래적 느낌의 블루-퍼플 톤 조합
const ambientLight = new THREE.AmbientLight(0x222244, 0.6);
scene.add(ambientLight);

const directionalLightBlue = new THREE.DirectionalLight(0x3399ff, 1.0);
directionalLightBlue.position.set(10, 20, 30);
scene.add(directionalLightBlue);

const directionalLightPurple = new THREE.DirectionalLight(0x9933ff, 0.7);
directionalLightPurple.position.set(-10, -10, 10);
scene.add(directionalLightPurple);

// HDR 환경맵 (반사 표현을 위해)
new RGBELoader()
  .setPath('https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/textures/equirectangular/')
  .load('royal_esplanade_1k.hdr', (hdrTexture) => {
    hdrTexture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = hdrTexture;

    const loader = new FontLoader();
    loader.load('https://cdn.jsdelivr.net/npm/three@0.160.0/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const geometry = new TextGeometry('Lemonsoft', {
        font: font,
        size: 6,
        height: 2.5,
        curveSegments: 32,
        bevelEnabled: true,
        bevelThickness: 0.3,
        bevelSize: 0.2,
        bevelSegments: 10,
      });

      geometry.center();

      // 메탈릭 + 네온 느낌을 위한 재질
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x7f99ff,         // 은은한 블루 톤
        metalness: 0,          // 거의 금속 느낌
        roughness: 0.1,          // 약간 매끈
        clearcoat: 1.0,          // 표면 코팅 효과
        clearcoatRoughness: 0.05,
        emissive: new THREE.Color(0x6633ff), // 보라 네온 발광색
        emissiveIntensity: 0.8,  // 발광 세기
        reflectivity: 0.9,       // 반사 강함
        envMapIntensity: 1.5,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // 한 번 렌더링 (애니메이션 없음)
      renderer.render(scene, camera);
    });
  });

// 리사이징 처리
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

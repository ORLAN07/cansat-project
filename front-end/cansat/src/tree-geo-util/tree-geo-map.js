export default function tree1() {
  THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);

  const canvas = document.getElementById("canvas");
  const camera = new THREE.PerspectiveCamera(75, canvas.width/canvas.height, 0.1, 1000);
  camera.position.set(0, 0, 1.5);

  const renderer = new THREE.WebGLRenderer({ canvas });
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  const scene = new THREE.Scene();
  const walls = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxBufferGeometry(1, 1, 1)),
    new THREE.LineBasicMaterial({color: 0xcccccc}));
  walls.position.set(0, 0, 0);
  scene.add(walls);
  scene.add(new THREE.AxesHelper(1));

  const stats = new Stats();
  stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
  const render = () => {
    stats.update();
    renderer.render(scene, camera);
  };

  controls.addEventListener('change', render);
  render(); // first time

  (async () => { // main
    const tgeo = new ThreeGeo({
      tokenMapbox: 'pk.eyJ1IjoieWFzdW8xMjN0ZXN0aW5nIiwiYSI6ImNrZzdpbHg5azAxemkzMnBmeG9tcjZyazIifQ.BrMYuN2Dn5pWRl9plo0vpw', // <---- set your Mapbox API token here
    });

    if (tgeo.tokenMapbox === '********') {
      const warning = 'Please set your Mapbox API token in ThreeGeo constructor.';
      alert(warning);
      throw warning;
    }

    const terrain = await tgeo.getTerrainRgb(
      [4.707038, -74.049424], // [lat, lng]
      100,               // radius of bounding circle (km)
      12);               // zoom resolution

    scene.add(terrain);
    render();
  })();
}

tree1();


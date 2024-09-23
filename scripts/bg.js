const fragmentShader = `
precision mediump float;

uniform float t;
uniform vec2 r;

void main() {
  vec2 uv = (gl_FragCoord.xy / r.xy) * 2. - 1.;
  uv.x *= r.x / r.y;

  float d = max(0.2, length(uv));

  float circle = abs(sin(4.653 * d - t));
  circle *= abs(sin(6.2453 / uv.x));

  gl_FragColor = vec4(vec3(0.01 / circle) * (0.1 / d), 1.0);
}
`

function drawBackground() {
  const { width, height } = document.getElementById('gl').getBoundingClientRect()

  const uniforms = {
    t: { value: 0 },
    r: { value: new THREE.Vector2(width, height) },
  }

  const timeDelta = 1 / 120;

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setClearColor(0xffffff, 1)
  document.getElementById('gl').appendChild(renderer.domElement);
  
  const scene = new THREE.Scene()
  
  const camera = new THREE.PerspectiveCamera(70, width / height)
  camera.position.z = 50
  scene.add(camera)

  const material = new THREE.ShaderMaterial({ uniforms, fragmentShader })
  const geometry = new THREE.PlaneBufferGeometry(width, height)
  const mesh = new THREE.Mesh(geometry, material)
  
  scene.add(mesh)

  function render() {
    requestAnimationFrame(render)
    uniforms.t.value += timeDelta
    renderer.render(scene, camera)
  }

  render()
}

window.addEventListener('load', drawBackground)

const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision mediump float;

uniform float time;
uniform vec2 resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  uv = uv * 2.0 - 1.0;
  uv.x *= resolution.x / resolution.y;  

  float frequency = 1.2;
  float amplitude = 0.4;

  float wave = sin(uv.x * frequency + time) * amplitude;

  float combinedWaves = wave;
  float distortion = sin(length(uv) * 12.0 - time * 3.0) * 0.08;
  float waveHeight = combinedWaves + distortion;

  vec3 color = vec3(0.0);
  color.r = smoothstep(0.0, 0.8, waveHeight);
  color.g = smoothstep(0.0, 0.8, waveHeight);
  color.b = smoothstep(0.0, 0.8, waveHeight);

  float glowRadius = 2.0;
  float glowIntensity = 0.8;
  float glow = glowIntensity / pow(length(uv) + glowRadius, 2.0);

  color += vec3(glow);

  gl_FragColor = vec4(color, 1.0);
}
`

function drawBackground() {
  const { width, height } = document.getElementById('glRenderer').getBoundingClientRect()

  const uniforms = {
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(width, height) }
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  renderer.setClearColor(0xffffff, 1)
  document.getElementById('glRenderer').appendChild(renderer.domElement);
  
  const scene = new THREE.Scene()
  
  const camera = new THREE.PerspectiveCamera(70, width / height)
  camera.position.z = 50
  scene.add(camera)

  const material = new THREE.ShaderMaterial({ uniforms, fragmentShader, vertexShader })
  const geometry = new THREE.PlaneBufferGeometry(width, height)
  const mesh = new THREE.Mesh(geometry, material)
  
  scene.add(mesh)

  function render() {
    requestAnimationFrame(render)
    uniforms.time.value += 0.016
    renderer.render(scene, camera)
  }

  render()
}

window.addEventListener('load', drawBackground)

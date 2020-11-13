const webgl = document.getElementById('canvas');
const clearButton = document.querySelector('.clear');

clearButton.addEventListener('click', () => {
  clearRect();
});

// 顶点着色器
const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 100.0;
  }
`;

// 片元着色器程序
const FSHADER_SOURCE = `
  void main() {
    gl_FragColor = vec4(0.0,1.0,0.0,1.0);
  }
`;

const RandomArray = () => {
  const resultArray = [];
  for (let i = 0; i < 3; i++) {
    resultArray.push((Math.random() * -2 + 1).toFixed(2));
  }
  return resultArray;
};

function clearRect() {
  const gl = webgl.getContext('webgl') || webgl.getContext('experimental-webgl');

  // 初始化着色器
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders');
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttrib3f.apply(gl, [a_Position, ...RandomArray()]);
  gl.drawArrays(gl.POINTS, 0, 1);
}

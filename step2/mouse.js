const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl') || canvas.genContext('experimental-webgl');

// 顶点着色器
const VERTEX_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

// 片元着色器
const FRAG_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`;

// 初始化着色器
initShaders(gl, VERTEX_SOURCE, FRAG_SOURCE);

// 获取WebGL着色器变量
const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

// 鼠标点击事件
const points = [];
const colors = [];
canvas.addEventListener('click', (evt) => {
  let x = evt.clientX;
  let y = evt.clientY;
  const { left, top } = evt.target.getBoundingClientRect();

  x = (x - left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - top)) / (canvas.height / 2);

  points.push([x, y]);
  colors.push(randomColor());

  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let i = 0; i < points.length; i++) {
    gl.vertexAttrib2f(a_Position, points[i][0], points[i][1]);
    gl.uniform4fv(u_FragColor, colors[i]);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
});

const randomColor = () => {
  const colorArray = [1.0];
  for (let i = 0; i < 3; i++) {
    colorArray.unshift(Math.random());
  }
  return colorArray;
};

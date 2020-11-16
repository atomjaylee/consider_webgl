const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

const VERTEX_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }
`;

const FRAGMENT_SOURCE = `
  void main() {
    gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  }
`;

const initialBuffer = () => {
  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  const n = 3;

  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.error('Failed to create the buffer object');
    return -1;
  }

  // 绑定缓冲区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // 向缓冲区写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');

  // 将缓冲区对象分配给a_Position
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  // 连接a_Position变量与分配它的缓冲区对象
  gl.enableVertexAttribArray(a_Position);

  return n;
};

// 初始化着色器
initShaders(gl, VERTEX_SOURCE, FRAGMENT_SOURCE);

const count = initialBuffer();

gl.drawArrays(gl.TRIANGLES, 0, 3);

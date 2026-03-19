"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2  iResolution;
uniform float iTime;
uniform vec3  uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2  uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r)?c.r:0.0,
    finite1(c.g)?c.g:0.0,
    finite1(c.b)?c.b:0.0);
}

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;
  vec4 oo = vec4(0.0);
  for (vec2 r = iResolution.xy, Q; ++i < 60.; O += oo.w/d*oo.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y));
    p.z -= 4.;
    S = p;
    d = p.y-T;
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05);
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T));
    z += d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4;
    oo = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  o.xyz = tanh(O/1e4);
  o.w = 1.0;
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  float alpha = length(rgb) * uOpacity;
  fragColor = vec4(finalColor, alpha);
}`;

function compileShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn("Plasma shader error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function PlasmaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    if (!gl) { canvas.style.display = "none"; return; }

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("Plasma link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const uvCoords  = new Float32Array([0, 0, 2, 0, 0, 2]);

    const makeVBO = (data: Float32Array, attrib: string, size: number) => {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, attrib);
      if (loc >= 0) {
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      }
    };
    makeVBO(positions, "position", 2);
    makeVBO(uvCoords, "uv", 2);

    const U: Record<string, WebGLUniformLocation | null> = {};
    [
      "iResolution", "iTime", "uCustomColor", "uUseCustomColor",
      "uSpeed", "uDirection", "uScale", "uOpacity", "uMouse", "uMouseInteractive",
    ].forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });

    gl.uniform3f(U.uCustomColor as WebGLUniformLocation, 0.0, 0.706, 0.847);
    gl.uniform1f(U.uUseCustomColor as WebGLUniformLocation, 1.0);
    gl.uniform1f(U.uSpeed as WebGLUniformLocation, 0.24);
    gl.uniform1f(U.uDirection as WebGLUniformLocation, 1.0);
    gl.uniform1f(U.uScale as WebGLUniformLocation, 1.1);
    gl.uniform1f(U.uOpacity as WebGLUniformLocation, 0.85);
    gl.uniform1f(U.uMouseInteractive as WebGLUniformLocation, 1.0);
    gl.uniform2f(U.uMouse as WebGLUniformLocation, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const mouse = { x: 0, y: 0 };

    const resize = () => {
      const hero = canvas.parentElement;
      const w = hero ? hero.offsetWidth  : window.innerWidth;
      const h = hero ? hero.offsetHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(prog);
      gl.uniform2f(U.iResolution as WebGLUniformLocation, canvas.width, canvas.height);
    };
    resize();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const heroEl = canvas.parentElement;
    const onMouseMove = (e: MouseEvent) => {
      if (!heroEl) return;
      const r = heroEl.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (heroEl.offsetHeight - (e.clientY - r.top)) * dpr;
    };
    heroEl?.addEventListener("mousemove", onMouseMove, { passive: true });

    let paused = false;
    const io = new IntersectionObserver(
      (entries) => { paused = !entries[0].isIntersecting; },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);

    const t0 = performance.now();
    let raf: number;

    const frame = (ts: number) => {
      raf = requestAnimationFrame(frame);
      if (paused) return;
      const timeVal = (ts - t0) * 0.001;
      gl.useProgram(prog);
      gl.uniform1f(U.iTime as WebGLUniformLocation, timeVal);
      gl.uniform2f(U.uMouse as WebGLUniformLocation, mouse.x, mouse.y);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      heroEl?.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="plasma-canvas"
      aria-hidden="true"
    />
  );
}

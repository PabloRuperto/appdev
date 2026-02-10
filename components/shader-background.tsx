"use client";

import React, { useEffect, useRef } from "react";

const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  /* ===================== SHADERS ===================== */

  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  const fsSource = `
    precision highp float;

    uniform vec2 iResolution;
    uniform float iTime;

    const float overallSpeed = 0.2;
    const float minLineWidth = 0.01;
    const float maxLineWidth = 0.2;
    const float lineFrequency = 0.2;
    const float lineSpeed = overallSpeed;
    const float lineAmplitude = 1.0;
    const float warpFrequency = 0.5;
    const float warpSpeed = 0.2 * overallSpeed;
    const float warpAmplitude = 1.0;
    const float offsetFrequency = 0.5;
    const float offsetSpeed = 1.33 * overallSpeed;
    const float minOffsetSpread = 0.6;
    const float maxOffsetSpread = 2.0;
    const float scale = 5.0;
    const int linesPerGroup = 16;

    const vec4 lineColor = vec4(0.5, 0.25, 1.0, 1.0);

    float random(float t) {
      return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
    }

    float drawLine(float pos, float width, float t) {
      return smoothstep(width, 0.0, abs(pos - t));
    }

    float plasma(float x, float fade, float offset) {
      return random(x * lineFrequency + iTime * lineSpeed) * fade * lineAmplitude + offset;
    }

    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      vec2 uv = fragCoord / iResolution;
      vec2 space = (fragCoord - iResolution * 0.5) / iResolution.x * 2.0 * scale;

      float fadeX = 1.0 - (cos(uv.x * 6.283) * 0.5 + 0.5);

      space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude;
      space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude;

      // 🔥 PURE BLACK BACKGROUND
      vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

      for (int i = 0; i < linesPerGroup; i++) {
        float idx = float(i);
        float rand = random(idx + iTime * offsetSpeed) * 0.5 + 0.5;
        float halfWidth = mix(minLineWidth, maxLineWidth, rand * fadeX) * 0.5;
        float offset = random(idx + iTime) * mix(minOffsetSpread, maxOffsetSpread, fadeX);
        float y = plasma(space.x, fadeX, offset);

        float line = drawLine(y, halfWidth, space.y);
        color += line * lineColor * rand;
      }

      gl_FragColor = clamp(color, 0.0, 1.0);
    }
  `;

  /* ===================== WEBGL HELPERS ===================== */

  const loadShader = (
    gl: WebGLRenderingContext,
    type: number,
    source: string
  ): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  const initProgram = (
    gl: WebGLRenderingContext,
    vs: string,
    fs: string
  ): WebGLProgram | null => {
    const v = loadShader(gl, gl.VERTEX_SHADER, vs);
    const f = loadShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;

    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, v);
    gl.attachShader(program, f);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return null;
    }

    return program;
  };

  /* ===================== EFFECT ===================== */

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const program = initProgram(gl, vsSource, fsSource);
    if (!program) return;

    const buffer = gl.createBuffer();
    if (!buffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "aVertexPosition");
    const resLoc = gl.getUniformLocation(program, "iResolution");
    const timeLoc = gl.getUniformLocation(program, "iTime");
    if (posLoc === -1 || !resLoc || !timeLoc) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();

    const render = (now: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, (now - start) / 1000);

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(posLoc);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
};

export default ShaderBackground;

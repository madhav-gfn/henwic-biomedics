import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform float u_intensity;
varying vec2 v_texCoord;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = v_texCoord;
    vec2 p = (uv * 2.0 - 1.0) * (u_resolution.x / u_resolution.y);

    float t = u_time * 0.15;

    vec2 mouseNorm = (u_mouse / u_resolution) * 2.0 - 1.0;
    vec2 mouseInfluence = (p - mouseNorm) * 0.08;

    float m = 0.0;
    for (float i = 1.0; i <= 3.0; i += 1.0) {
        vec2 p_i = p * i * 1.5 + mouseInfluence * (1.0 / i);
        p_i += vec2(sin(t + i), cos(t * 0.8 + i));
        float n = noise(p_i + t);
        m += smoothstep(0.48, 0.5, n) * (1.0 / i);
    }

    vec3 finalColor = mix(u_color2, u_color1, m * u_intensity);

    float vignette = 1.0 - length(p * 0.5);
    finalColor *= smoothstep(0.0, 0.8, vignette);

    gl_FragColor = vec4(finalColor, 1.0);
}`;

interface ShaderBackgroundProps {
  className?: string;
  /** Foreground "energy" colour, RGB 0-1 */
  colorPrimary?: readonly [number, number, number];
  /** Base/void colour, RGB 0-1 */
  colorBackground?: readonly [number, number, number];
  /** How strongly the noise field mixes towards colorPrimary */
  intensity?: number;
}

/**
 * Full-bleed ambient WebGL noise field. Acts as the "living tissue"
 * backdrop for hero and product universe sections. Cheap (single
 * triangle-strip, fragment-only noise) so it stays at 60fps.
 */
export function ShaderBackground({
  className,
  colorPrimary = [0, 0.82, 0.41] as const,
  colorBackground = [0.02, 0.02, 0.02] as const,
  intensity = 0.15,
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    function compileShader(type: number, source: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      return shader;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uColor1 = gl.getUniformLocation(program, "u_color1");
    const uColor2 = gl.getUniformLocation(program, "u_color2");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");

    function syncSize() {
      const w = canvas!.clientWidth || 1280;
      const h = canvas!.clientHeight || 720;
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
    }
    syncSize();

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(canvas);

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width && rect.height) {
        mouse.x = ((e.clientX - rect.left) / rect.width) * canvas!.width;
        mouse.y = (1 - (e.clientY - rect.top) / rect.height) * canvas!.height;
      }
    }
    window.addEventListener("pointermove", handleMouseMove);

    let rafId = 0;
    function render(t: number) {
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      if (uTime) gl!.uniform1f(uTime, t * 0.001);
      if (uRes) gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      if (uMouse) gl!.uniform2f(uMouse, mouse.x, mouse.y);
      if (uColor1) gl!.uniform3f(uColor1, colorPrimary[0], colorPrimary[1], colorPrimary[2]);
      if (uColor2) gl!.uniform3f(uColor2, colorBackground[0], colorBackground[1], colorBackground[2]);
      if (uIntensity) gl!.uniform1f(uIntensity, intensity);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    }
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handleMouseMove);
    };
    // colorPrimary/colorBackground are expected to be stable (module-level) references
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorPrimary, colorBackground, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("block w-full h-full", className)}
      aria-hidden="true"
    />
  );
}
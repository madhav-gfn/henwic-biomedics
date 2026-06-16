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
}: ShaderBackgroundProps) {
  return null;
}
import * as THREE from 'three';

/**
 * Builds an extruded "directional glyph" — an arrow silhouette echoing the
 * negative-space arrows hidden inside the Alpha wordmark (up / down / right).
 * Used as the atomic unit of the hero sculpture rather than a stock primitive.
 */
export function createArrowGeometry(scale = 1): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();

  // Stem (tail) of the arrow
  const stemWidth = 0.22 * scale;
  const stemLength = 0.62 * scale;
  const headWidth = 0.62 * scale;
  const headLength = 0.5 * scale;

  shape.moveTo(-stemWidth / 2, -stemLength);
  shape.lineTo(stemWidth / 2, -stemLength);
  shape.lineTo(stemWidth / 2, 0);
  shape.lineTo(headWidth / 2, 0);
  shape.lineTo(0, headLength);
  shape.lineTo(-headWidth / 2, 0);
  shape.lineTo(-stemWidth / 2, 0);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.09 * scale,
    bevelEnabled: true,
    bevelThickness: 0.02 * scale,
    bevelSize: 0.02 * scale,
    bevelSegments: 2,
    curveSegments: 3,
  });
  geometry.center();
  return geometry;
}

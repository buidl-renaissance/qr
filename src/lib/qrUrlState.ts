import {
  DEFAULT_OPTIONS,
  type ColorMode,
  type CornerDotType,
  type CornerSquareType,
  type DotType,
  type ErrorCorrectionLevel,
  type FrameShape,
  type GradientType,
  type QrStudioOptions,
} from "./qrDefaults";

const DOT_SET = new Set([
  "square",
  "dots",
  "rounded",
  "extra-rounded",
  "classy",
  "classy-rounded",
]);
const CORNER_SQ_SET = new Set([
  "dot",
  "square",
  "extra-rounded",
  "rounded",
  "dots",
  "classy",
  "classy-rounded",
]);
const CORNER_DOT_SET = new Set([
  "dot",
  "square",
  "rounded",
  "dots",
  "classy",
  "classy-rounded",
  "extra-rounded",
]);
const ECC_SET = new Set(["L", "M", "Q", "H"]);
const SHAPE_SET = new Set(["square", "circle"]);
const GRAD_SET = new Set(["linear", "radial"]);

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function parseColorMode(
  prefix: string,
  params: URLSearchParams,
  fallback: ColorMode
): ColorMode {
  const mode = params.get(`${prefix}Mode`);
  const color = params.get(`${prefix}Color`) ?? fallback.color;
  const gType = params.get(`${prefix}GType`);
  const gRot = params.get(`${prefix}GRot`);
  const g0 = params.get(`${prefix}G0`);
  const g1 = params.get(`${prefix}G1`);

  const gradient = {
    type: (gType && GRAD_SET.has(gType) ? gType : fallback.gradient.type) as GradientType,
    rotation: gRot != null && !Number.isNaN(Number(gRot)) ? Number(gRot) : fallback.gradient.rotation,
    colorStops: [
      { offset: 0, color: g0 ?? fallback.gradient.colorStops[0].color },
      { offset: 1, color: g1 ?? fallback.gradient.colorStops[1].color },
    ] as [{ offset: number; color: string }, { offset: number; color: string }],
  };

  return {
    mode: mode === "gradient" ? "gradient" : "solid",
    color,
    gradient,
  };
}

function appendColorMode(
  params: URLSearchParams,
  prefix: string,
  section: ColorMode
) {
  params.set(`${prefix}Mode`, section.mode);
  params.set(`${prefix}Color`, section.color);
  if (section.mode === "gradient") {
    params.set(`${prefix}GType`, section.gradient.type);
    params.set(`${prefix}GRot`, String(section.gradient.rotation));
    params.set(`${prefix}G0`, section.gradient.colorStops[0].color);
    params.set(`${prefix}G1`, section.gradient.colorStops[1].color);
  }
}

/** Serialize studio options to URL search params (logo data URLs omitted — too large). */
export function serializeOptions(options: QrStudioOptions): string {
  const params = new URLSearchParams();
  params.set("d", options.data);
  params.set("s", String(options.size));
  params.set("m", String(options.margin));
  params.set("ecc", options.errorCorrectionLevel);
  params.set("shape", options.shape);
  params.set("dt", options.dots.type);
  appendColorMode(params, "dots", options.dots);
  params.set("cst", options.cornersSquare.type);
  appendColorMode(params, "cs", options.cornersSquare);
  params.set("cdt", options.cornersDot.type);
  appendColorMode(params, "cd", options.cornersDot);
  appendColorMode(params, "bg", options.background);
  params.set("lis", String(options.logo.imageSize));
  params.set("lm", String(options.logo.margin));
  params.set("lhb", options.logo.hideBackgroundDots ? "1" : "0");
  return params.toString();
}

/** Parse URL search params into studio options; falls back to defaults. */
export function parseOptions(query: string | URLSearchParams): QrStudioOptions {
  const params =
    typeof query === "string" ? new URLSearchParams(query.replace(/^\?/, "")) : query;

  const base = structuredClone(DEFAULT_OPTIONS);

  const data = params.get("d");
  if (data != null) base.data = data;

  const size = params.get("s");
  if (size != null && !Number.isNaN(Number(size))) {
    base.size = clamp(Math.round(Number(size)), 200, 1024);
  }

  const margin = params.get("m");
  if (margin != null && !Number.isNaN(Number(margin))) {
    base.margin = clamp(Math.round(Number(margin)), 0, 48);
  }

  const ecc = params.get("ecc");
  if (ecc && ECC_SET.has(ecc)) {
    base.errorCorrectionLevel = ecc as ErrorCorrectionLevel;
  }

  const shape = params.get("shape");
  if (shape && SHAPE_SET.has(shape)) {
    base.shape = shape as FrameShape;
  }

  const dt = params.get("dt");
  if (dt && DOT_SET.has(dt)) base.dots.type = dt as DotType;
  Object.assign(base.dots, parseColorMode("dots", params, base.dots));

  const cst = params.get("cst");
  if (cst && CORNER_SQ_SET.has(cst)) {
    base.cornersSquare.type = cst as CornerSquareType;
  }
  Object.assign(base.cornersSquare, parseColorMode("cs", params, base.cornersSquare));

  const cdt = params.get("cdt");
  if (cdt && CORNER_DOT_SET.has(cdt)) {
    base.cornersDot.type = cdt as CornerDotType;
  }
  Object.assign(base.cornersDot, parseColorMode("cd", params, base.cornersDot));

  Object.assign(base.background, parseColorMode("bg", params, base.background));

  const lis = params.get("lis");
  if (lis != null && !Number.isNaN(Number(lis))) {
    base.logo.imageSize = clamp(Number(lis), 0.1, 0.5);
  }
  const lm = params.get("lm");
  if (lm != null && !Number.isNaN(Number(lm))) {
    base.logo.margin = clamp(Math.round(Number(lm)), 0, 24);
  }
  const lhb = params.get("lhb");
  if (lhb != null) base.logo.hideBackgroundDots = lhb === "1";

  // Logo binary not restored from URL
  base.logo.src = null;

  return base;
}

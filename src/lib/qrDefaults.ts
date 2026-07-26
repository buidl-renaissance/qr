export type DotType =
  | "square"
  | "dots"
  | "rounded"
  | "extra-rounded"
  | "classy"
  | "classy-rounded";

export type CornerSquareType =
  | "dot"
  | "square"
  | "extra-rounded"
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded";

export type CornerDotType =
  | "dot"
  | "square"
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded";

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
export type FrameShape = "square" | "circle";
export type GradientType = "linear" | "radial";

export interface GradientConfig {
  type: GradientType;
  rotation: number;
  colorStops: [{ offset: number; color: string }, { offset: number; color: string }];
}

export interface ColorMode {
  mode: "solid" | "gradient";
  color: string;
  gradient: GradientConfig;
}

export interface QrStudioOptions {
  data: string;
  size: number;
  margin: number;
  errorCorrectionLevel: ErrorCorrectionLevel;
  shape: FrameShape;
  dots: {
    type: DotType;
  } & ColorMode;
  cornersSquare: {
    type: CornerSquareType;
  } & ColorMode;
  cornersDot: {
    type: CornerDotType;
  } & ColorMode;
  background: ColorMode;
  logo: {
    src: string | null;
    imageSize: number;
    margin: number;
    hideBackgroundDots: boolean;
  };
}

export const DOT_TYPES: DotType[] = [
  "square",
  "dots",
  "rounded",
  "extra-rounded",
  "classy",
  "classy-rounded",
];

export const CORNER_SQUARE_TYPES: CornerSquareType[] = [
  "square",
  "dot",
  "extra-rounded",
  "rounded",
  "dots",
  "classy",
  "classy-rounded",
];

export const CORNER_DOT_TYPES: CornerDotType[] = [
  "square",
  "dot",
  "rounded",
  "dots",
  "classy",
  "classy-rounded",
  "extra-rounded",
];

export const ECC_LEVELS: ErrorCorrectionLevel[] = ["L", "M", "Q", "H"];

const defaultGradient = (c1: string, c2: string): GradientConfig => ({
  type: "linear",
  rotation: 0,
  colorStops: [
    { offset: 0, color: c1 },
    { offset: 1, color: c2 },
  ],
});

export const DEFAULT_OPTIONS: QrStudioOptions = {
  data: "https://builddetroit.xyz",
  size: 320,
  margin: 12,
  errorCorrectionLevel: "Q",
  shape: "square",
  dots: {
    type: "rounded",
    mode: "solid",
    color: "#0A1628",
    gradient: defaultGradient("#0D7377", "#0A1628"),
  },
  cornersSquare: {
    type: "extra-rounded",
    mode: "solid",
    color: "#0A1628",
    gradient: defaultGradient("#0D7377", "#0A1628"),
  },
  cornersDot: {
    type: "dot",
    mode: "solid",
    color: "#0D7377",
    gradient: defaultGradient("#0D7377", "#14919B"),
  },
  background: {
    mode: "solid",
    color: "#F7FAFC",
    gradient: defaultGradient("#F7FAFC", "#E8EEF2"),
  },
  logo: {
    src: null,
    imageSize: 0.35,
    margin: 4,
    hideBackgroundDots: true,
  },
};

/** Build options object accepted by qr-code-styling */
export function toQrCodeStylingOptions(options: QrStudioOptions) {
  const colorOrGradient = (section: ColorMode) => {
    if (section.mode === "gradient") {
      return { gradient: section.gradient };
    }
    return { color: section.color };
  };

  return {
    width: options.size,
    height: options.size,
    type: "svg" as const,
    data: options.data || " ",
    margin: options.margin,
    shape: options.shape,
    qrOptions: {
      errorCorrectionLevel: options.errorCorrectionLevel,
    },
    dotsOptions: {
      type: options.dots.type,
      ...colorOrGradient(options.dots),
    },
    cornersSquareOptions: {
      type: options.cornersSquare.type,
      ...colorOrGradient(options.cornersSquare),
    },
    cornersDotOptions: {
      type: options.cornersDot.type,
      ...colorOrGradient(options.cornersDot),
    },
    backgroundOptions: {
      ...colorOrGradient(options.background),
    },
    image: options.logo.src || undefined,
    imageOptions: {
      hideBackgroundDots: options.logo.hideBackgroundDots,
      imageSize: options.logo.imageSize,
      margin: options.logo.margin,
      crossOrigin: "anonymous" as const,
      saveAsBlob: true,
    },
  };
}

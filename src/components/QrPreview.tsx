import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import type { QrStudioOptions } from "@/lib/qrDefaults";
import { toQrCodeStylingOptions } from "@/lib/qrDefaults";

type QRCodeStylingInstance = InstanceType<
  typeof import("qr-code-styling").default
>;

const pulseIn = keyframes`
  from {
    opacity: 0.55;
    transform: scale(0.985);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  box-shadow: 0 12px 40px ${({ theme }) => theme.shadow};
  animation: ${pulseIn} 0.28s ease-out;
`;

const Mount = styled.div`
  line-height: 0;

  svg {
    display: block;
    max-width: 100%;
    height: auto;
  }
`;

type QrPreviewProps = {
  options: QrStudioOptions;
  onReady?: (api: {
    download: (ext: "png" | "svg") => Promise<void>;
  }) => void;
};

export default function QrPreview({ options, onReady }: QrPreviewProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStylingInstance | null>(null);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const { default: QRCodeStyling } = await import("qr-code-styling");
      if (cancelled || !mountRef.current) return;

      mountRef.current.innerHTML = "";
      const qr = new QRCodeStyling(
        toQrCodeStylingOptions(optionsRef.current)
      );
      qr.append(mountRef.current);
      qrRef.current = qr;
      // Apply latest options in case they changed during async import
      qr.update(toQrCodeStylingOptions(optionsRef.current));

      onReadyRef.current?.({
        download: async (ext) => {
          await qr.download({ name: "qr-code", extension: ext });
        },
      });
    }

    init();

    return () => {
      cancelled = true;
      qrRef.current = null;
      if (mountRef.current) mountRef.current.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    if (!qrRef.current) return;
    qrRef.current.update(toQrCodeStylingOptions(options));
  }, [options]);

  return (
    <Frame>
      <Mount ref={mountRef} aria-label="QR code preview" />
    </Frame>
  );
}

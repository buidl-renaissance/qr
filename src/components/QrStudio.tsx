import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import StylePanel from "@/components/StylePanel";
import { DEFAULT_OPTIONS, type QrStudioOptions } from "@/lib/qrDefaults";
import { parseOptions, serializeOptions } from "@/lib/qrUrlState";

const QrPreview = dynamic(() => import("@/components/QrPreview"), {
  ssr: false,
  loading: () => <PreviewSkeleton />,
});

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Page = styled.main`
  position: relative;
  min-height: 100vh;
  padding: 2rem 1.25rem 4rem;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(var(--grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 32px 32px;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 0%, #000 40%, transparent 100%);
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    top: -20%;
    right: -10%;
    width: 55vw;
    height: 55vw;
    max-width: 640px;
    max-height: 640px;
    background: radial-gradient(
      circle,
      rgba(13, 115, 119, 0.18) 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${fadeUp} 0.45s ease-out;
`;

const Hero = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 28rem;
`;

const Brand = styled.h1`
  font-size: clamp(3.5rem, 12vw, 5.5rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.9;
  color: ${({ theme }) => theme.text};
`;

const Tagline = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 22rem;
`;

const Studio = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 340px) 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const PreviewColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 1.25rem;

  @media (max-width: 860px) {
    position: static;
    order: -1;
  }
`;

const ControlsColumn = styled.div`
  min-width: 0;
  padding-bottom: 2rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 0.65rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius};
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease,
    transform 0.12s ease;
  border: 1px solid
    ${({ theme, $primary }) => ($primary ? theme.accent : theme.border)};
  background: ${({ theme, $primary }) =>
    $primary ? theme.accent : theme.surface};
  color: ${({ theme, $primary }) =>
    $primary ? theme.onAccent : theme.textSecondary};

  &:hover {
    background: ${({ theme, $primary }) =>
      $primary ? theme.accentHover : theme.accentMuted};
    color: ${({ theme, $primary }) =>
      $primary ? theme.onAccent : theme.accent};
    border-color: ${({ theme }) => theme.accent};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const PreviewSkeleton = styled.div`
  width: 100%;
  aspect-ratio: 1;
  max-width: 340px;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  animation: ${fadeUp} 0.6s ease-out infinite alternate;
`;

export default function QrStudio() {
  const router = useRouter();
  const [options, setOptions] = useState<QrStudioOptions>(DEFAULT_OPTIONS);
  const [hydrated, setHydrated] = useState(false);
  const downloadRef = useRef<
    ((ext: "png" | "svg") => Promise<void>) | null
  >(null);
  const skipUrlWrite = useRef(false);
  const urlTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const queryString =
      typeof window !== "undefined" ? window.location.search : "";
    if (queryString && queryString.length > 1) {
      skipUrlWrite.current = true;
      setOptions(parseOptions(queryString));
    }
    setHydrated(true);
  }, [router.isReady]);

  useEffect(() => {
    if (!hydrated) return;
    if (skipUrlWrite.current) {
      skipUrlWrite.current = false;
      return;
    }
    if (urlTimer.current) clearTimeout(urlTimer.current);
    urlTimer.current = setTimeout(() => {
      const qs = serializeOptions(options);
      const next = `?${qs}`;
      if (typeof window !== "undefined" && window.location.search !== next) {
        window.history.replaceState(null, "", `/${next}`);
      }
    }, 250);
    return () => {
      if (urlTimer.current) clearTimeout(urlTimer.current);
    };
  }, [options, hydrated]);

  const onChange = useCallback((next: QrStudioOptions) => {
    setOptions(next);
  }, []);

  const onReady = useCallback(
    (api: { download: (ext: "png" | "svg") => Promise<void> }) => {
      downloadRef.current = api.download;
    },
    []
  );

  const download = async (ext: "png" | "svg") => {
    await downloadRef.current?.(ext);
  };

  const reset = () => {
    setOptions(structuredClone(DEFAULT_OPTIONS));
  };

  const previewOptions = useMemo(() => options, [options]);

  return (
    <Page>
      <Inner>
        <Hero>
          <Brand>QR</Brand>
          <Tagline>
            Generate a code. Style every module, eye, and color — then download.
          </Tagline>
        </Hero>

        <Studio>
          <PreviewColumn>
            {hydrated && (
              <QrPreview options={previewOptions} onReady={onReady} />
            )}
            <Actions>
              <Button $primary type="button" onClick={() => download("png")}>
                Download PNG
              </Button>
              <Button type="button" onClick={() => download("svg")}>
                Download SVG
              </Button>
              <Button type="button" onClick={reset}>
                Reset
              </Button>
            </Actions>
          </PreviewColumn>

          <ControlsColumn>
            <StylePanel options={options} onChange={onChange} />
          </ControlsColumn>
        </Studio>
      </Inner>
    </Page>
  );
}

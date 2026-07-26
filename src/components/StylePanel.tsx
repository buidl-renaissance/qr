import styled from "styled-components";
import {
  CORNER_DOT_TYPES,
  CORNER_SQUARE_TYPES,
  DOT_TYPES,
  ECC_LEVELS,
  type ColorMode,
  type QrStudioOptions,
} from "@/lib/qrDefaults";

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textMuted};
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
`;

const ValueHint = styled.span`
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textMuted};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.75rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accentMuted};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 4.5rem;
  padding: 0.65rem 0.75rem;
  resize: vertical;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.85rem;
  line-height: 1.4;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accentMuted};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.65rem 0.75rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accent};
  }
`;

const Range = styled.input`
  width: 100%;
  accent-color: ${({ theme }) => theme.accent};
`;

const ToggleRow = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const Chip = styled.button<{ $active?: boolean }>`
  padding: 0.4rem 0.7rem;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.72rem;
  letter-spacing: 0.02em;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.accent : theme.border)};
  background: ${({ theme, $active }) =>
    $active ? theme.accentMuted : theme.surface};
  color: ${({ theme, $active }) => ($active ? theme.accent : theme.textSecondary)};
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;

const ColorRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem;
  align-items: center;
`;

const ColorInput = styled.input`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  background: transparent;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 2px;
  }
  &::-webkit-color-swatch {
    border: none;
    border-radius: 2px;
  }
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSecondary};
  cursor: pointer;

  input {
    accent-color: ${({ theme }) => theme.accent};
    width: 1rem;
    height: 1rem;
  }
`;

const FileRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

const FileButton = styled.label`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.85rem;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.onAccent};
  border-radius: ${({ theme }) => theme.radius};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
  }

  input {
    display: none;
  }
`;

const GhostButton = styled.button`
  padding: 0.5rem 0.85rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius};
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;

type StylePanelProps = {
  options: QrStudioOptions;
  onChange: (next: QrStudioOptions) => void;
};

function ColorModeControls({
  label,
  value,
  onChange,
}: {
  label: string;
  value: ColorMode;
  onChange: (next: ColorMode) => void;
}) {
  return (
    <Section>
      <SectionTitle>{label}</SectionTitle>
      <ToggleRow>
        <Chip
          type="button"
          $active={value.mode === "solid"}
          onClick={() => onChange({ ...value, mode: "solid" })}
        >
          solid
        </Chip>
        <Chip
          type="button"
          $active={value.mode === "gradient"}
          onClick={() => onChange({ ...value, mode: "gradient" })}
        >
          gradient
        </Chip>
      </ToggleRow>

      {value.mode === "solid" ? (
        <Label>
          Color
          <ColorRow>
            <ColorInput
              type="color"
              value={normalizeHex(value.color)}
              onChange={(e) => onChange({ ...value, color: e.target.value })}
            />
            <Input
              type="text"
              value={value.color}
              onChange={(e) => onChange({ ...value, color: e.target.value })}
              spellCheck={false}
            />
          </ColorRow>
        </Label>
      ) : (
        <>
          <Grid2>
            <Label>
              Type
              <Select
                value={value.gradient.type}
                onChange={(e) =>
                  onChange({
                    ...value,
                    gradient: {
                      ...value.gradient,
                      type: e.target.value as "linear" | "radial",
                    },
                  })
                }
              >
                <option value="linear">linear</option>
                <option value="radial">radial</option>
              </Select>
            </Label>
            <Label>
              <LabelRow>
                <span>Rotation</span>
                <ValueHint>{value.gradient.rotation.toFixed(2)}</ValueHint>
              </LabelRow>
              <Range
                type="range"
                min={0}
                max={Math.PI * 2}
                step={0.01}
                value={value.gradient.rotation}
                onChange={(e) =>
                  onChange({
                    ...value,
                    gradient: {
                      ...value.gradient,
                      rotation: Number(e.target.value),
                    },
                  })
                }
              />
            </Label>
          </Grid2>
          <Grid2>
            <Label>
              Stop 0
              <ColorRow>
                <ColorInput
                  type="color"
                  value={normalizeHex(value.gradient.colorStops[0].color)}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      gradient: {
                        ...value.gradient,
                        colorStops: [
                          { offset: 0, color: e.target.value },
                          value.gradient.colorStops[1],
                        ],
                      },
                    })
                  }
                />
                <Input
                  type="text"
                  value={value.gradient.colorStops[0].color}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      gradient: {
                        ...value.gradient,
                        colorStops: [
                          { offset: 0, color: e.target.value },
                          value.gradient.colorStops[1],
                        ],
                      },
                    })
                  }
                  spellCheck={false}
                />
              </ColorRow>
            </Label>
            <Label>
              Stop 1
              <ColorRow>
                <ColorInput
                  type="color"
                  value={normalizeHex(value.gradient.colorStops[1].color)}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      gradient: {
                        ...value.gradient,
                        colorStops: [
                          value.gradient.colorStops[0],
                          { offset: 1, color: e.target.value },
                        ],
                      },
                    })
                  }
                />
                <Input
                  type="text"
                  value={value.gradient.colorStops[1].color}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      gradient: {
                        ...value.gradient,
                        colorStops: [
                          value.gradient.colorStops[0],
                          { offset: 1, color: e.target.value },
                        ],
                      },
                    })
                  }
                  spellCheck={false}
                />
              </ColorRow>
            </Label>
          </Grid2>
        </>
      )}
    </Section>
  );
}

function normalizeHex(color: string): string {
  if (/^#[0-9A-Fa-f]{6}$/.test(color)) return color;
  if (color === "transparent") return "#ffffff";
  return "#000000";
}

export default function StylePanel({ options, onChange }: StylePanelProps) {
  const patch = (partial: Partial<QrStudioOptions>) =>
    onChange({ ...options, ...partial });

  const onLogoFile = (file: File | null) => {
    if (!file) {
      patch({ logo: { ...options.logo, src: null } });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const src = typeof reader.result === "string" ? reader.result : null;
      patch({ logo: { ...options.logo, src } });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Panel>
      <Section>
        <SectionTitle>Content</SectionTitle>
        <Label>
          Text or URL
          <TextArea
            value={options.data}
            onChange={(e) => patch({ data: e.target.value })}
            placeholder="https://example.com"
            spellCheck={false}
          />
        </Label>
      </Section>

      <Section>
        <SectionTitle>Layout</SectionTitle>
        <Label>
          <LabelRow>
            <span>Size</span>
            <ValueHint>{options.size}px</ValueHint>
          </LabelRow>
          <Range
            type="range"
            min={200}
            max={1024}
            step={8}
            value={options.size}
            onChange={(e) => patch({ size: Number(e.target.value) })}
          />
        </Label>
        <Label>
          <LabelRow>
            <span>Margin</span>
            <ValueHint>{options.margin}</ValueHint>
          </LabelRow>
          <Range
            type="range"
            min={0}
            max={48}
            step={1}
            value={options.margin}
            onChange={(e) => patch({ margin: Number(e.target.value) })}
          />
        </Label>
        <Grid2>
          <Label>
            Error correction
            <Select
              value={options.errorCorrectionLevel}
              onChange={(e) =>
                patch({
                  errorCorrectionLevel: e.target
                    .value as QrStudioOptions["errorCorrectionLevel"],
                })
              }
            >
              {ECC_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Select>
          </Label>
          <Label>
            Frame
            <ToggleRow>
              <Chip
                type="button"
                $active={options.shape === "square"}
                onClick={() => patch({ shape: "square" })}
              >
                square
              </Chip>
              <Chip
                type="button"
                $active={options.shape === "circle"}
                onClick={() => patch({ shape: "circle" })}
              >
                circle
              </Chip>
            </ToggleRow>
          </Label>
        </Grid2>
      </Section>

      <Section>
        <SectionTitle>Modules</SectionTitle>
        <Label>
          Shape
          <Select
            value={options.dots.type}
            onChange={(e) =>
              patch({
                dots: {
                  ...options.dots,
                  type: e.target.value as QrStudioOptions["dots"]["type"],
                },
              })
            }
          >
            {DOT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Label>
      </Section>
      <ColorModeControls
        label="Module color"
        value={options.dots}
        onChange={(dots) => patch({ dots: { ...options.dots, ...dots } })}
      />

      <Section>
        <SectionTitle>Eyes — outer</SectionTitle>
        <Label>
          Shape
          <Select
            value={options.cornersSquare.type}
            onChange={(e) =>
              patch({
                cornersSquare: {
                  ...options.cornersSquare,
                  type: e.target
                    .value as QrStudioOptions["cornersSquare"]["type"],
                },
              })
            }
          >
            {CORNER_SQUARE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Label>
      </Section>
      <ColorModeControls
        label="Eye outer color"
        value={options.cornersSquare}
        onChange={(cornersSquare) =>
          patch({
            cornersSquare: { ...options.cornersSquare, ...cornersSquare },
          })
        }
      />

      <Section>
        <SectionTitle>Eyes — inner</SectionTitle>
        <Label>
          Shape
          <Select
            value={options.cornersDot.type}
            onChange={(e) =>
              patch({
                cornersDot: {
                  ...options.cornersDot,
                  type: e.target.value as QrStudioOptions["cornersDot"]["type"],
                },
              })
            }
          >
            {CORNER_DOT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Label>
      </Section>
      <ColorModeControls
        label="Eye inner color"
        value={options.cornersDot}
        onChange={(cornersDot) =>
          patch({ cornersDot: { ...options.cornersDot, ...cornersDot } })
        }
      />

      <ColorModeControls
        label="Background"
        value={options.background}
        onChange={(background) => patch({ background })}
      />
      {options.background.mode === "solid" && (
        <GhostButton
          type="button"
          onClick={() =>
            patch({
              background: { ...options.background, color: "transparent" },
            })
          }
        >
          Use transparent background
        </GhostButton>
      )}

      <Section>
        <SectionTitle>Logo</SectionTitle>
        <FileRow>
          <FileButton>
            Upload logo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onLogoFile(e.target.files?.[0] ?? null)}
            />
          </FileButton>
          {options.logo.src && (
            <GhostButton
              type="button"
              onClick={() => onLogoFile(null)}
            >
              Clear logo
            </GhostButton>
          )}
        </FileRow>
        <Label>
          <LabelRow>
            <span>Logo size</span>
            <ValueHint>{options.logo.imageSize.toFixed(2)}</ValueHint>
          </LabelRow>
          <Range
            type="range"
            min={0.1}
            max={0.5}
            step={0.01}
            value={options.logo.imageSize}
            onChange={(e) =>
              patch({
                logo: { ...options.logo, imageSize: Number(e.target.value) },
              })
            }
          />
        </Label>
        <Label>
          <LabelRow>
            <span>Logo margin</span>
            <ValueHint>{options.logo.margin}px</ValueHint>
          </LabelRow>
          <Range
            type="range"
            min={0}
            max={24}
            step={1}
            value={options.logo.margin}
            onChange={(e) =>
              patch({
                logo: { ...options.logo, margin: Number(e.target.value) },
              })
            }
          />
        </Label>
        <CheckLabel>
          <input
            type="checkbox"
            checked={options.logo.hideBackgroundDots}
            onChange={(e) =>
              patch({
                logo: {
                  ...options.logo,
                  hideBackgroundDots: e.target.checked,
                },
              })
            }
          />
          Hide modules behind logo
        </CheckLabel>
      </Section>
    </Panel>
  );
}

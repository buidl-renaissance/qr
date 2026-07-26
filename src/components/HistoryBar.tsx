import styled from "styled-components";
import type { QrHistoryItem } from "@/lib/qrHistory";
import { formatHistoryLabel } from "@/lib/qrHistory";

const Bar = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 220px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 0.85rem 1.25rem;
  background: ${({ theme }) => theme.surface};
  border-left: 1px solid ${({ theme }) => theme.border};
  box-shadow: -8px 0 28px ${({ theme }) => theme.shadow};

  @media (max-width: 960px) {
    width: 200px;
  }

  @media (max-width: 720px) {
    position: fixed;
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-height: 42vh;
    border-left: none;
    border-top: 1px solid ${({ theme }) => theme.border};
    box-shadow: 0 -8px 28px ${({ theme }) => theme.shadow};
  }
`;

const NewButton = styled.button`
  width: 100%;
  flex-shrink: 0;
  padding: 0.75rem 0.85rem;
  font-family: ${({ theme }) => theme.fontDisplay};
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.accent};
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.onAccent};
  transition: background 0.15s ease, transform 0.12s ease;

  &:hover {
    background: ${({ theme }) => theme.accentHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }
`;

const HistoryHeader = styled.div`
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textMuted};
  padding: 0 0.15rem;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Item = styled.li`
  display: flex;
  align-items: stretch;
  gap: 0.15rem;
`;

const ItemButton = styled.button`
  flex: 1;
  min-width: 0;
  text-align: left;
  padding: 0.55rem 0.6rem;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.borderSubtle};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.accentMuted};
  }
`;

const ItemData = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fontMono};
  font-size: 0.72rem;
  line-height: 1.35;
  word-break: break-all;
  color: ${({ theme }) => theme.text};
`;

const ItemMeta = styled.span`
  display: block;
  margin-top: 0.25rem;
  font-size: 0.65rem;
  color: ${({ theme }) => theme.textMuted};
`;

const RemoveButton = styled.button`
  flex-shrink: 0;
  width: 1.75rem;
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid transparent;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.9rem;
  line-height: 1;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.border};
  }
`;

const Empty = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textMuted};
  padding: 0.35rem 0.15rem;
  line-height: 1.4;
`;

function formatTime(ts: number): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(ts));
  } catch {
    return "";
  }
}

type HistoryBarProps = {
  history: QrHistoryItem[];
  canSave: boolean;
  onNewQr: () => void;
  onSelect: (item: QrHistoryItem) => void;
  onRemove: (id: string) => void;
};

export default function HistoryBar({
  history,
  canSave,
  onNewQr,
  onSelect,
  onRemove,
}: HistoryBarProps) {
  return (
    <Bar aria-label="QR history">
      <NewButton type="button" onClick={onNewQr} disabled={!canSave}>
        New QR
      </NewButton>
      <HistoryHeader>History</HistoryHeader>
      {history.length === 0 ? (
        <Empty>Saved codes appear here when you start a new QR.</Empty>
      ) : (
        <List>
          {history.map((item) => (
            <Item key={item.id}>
              <ItemButton
                type="button"
                onClick={() => onSelect(item)}
                title={item.data}
              >
                <ItemData>{formatHistoryLabel(item.data)}</ItemData>
                <ItemMeta>{formatTime(item.savedAt)}</ItemMeta>
              </ItemButton>
              <RemoveButton
                type="button"
                aria-label="Remove from history"
                onClick={() => onRemove(item.id)}
              >
                ×
              </RemoveButton>
            </Item>
          ))}
        </List>
      )}
    </Bar>
  );
}

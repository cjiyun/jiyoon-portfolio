import * as React from 'react';
import styled from '@emotion/styled';

type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (next: number) => void;
};

const getWindowPages = (page: number, totalPages: number) => {
  const windowSize = 5;
  const half = Math.floor(windowSize / 2);
  
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const Pagination = ({ page, totalPages, onChange }: PaginationProps) => {
  const pages = React.useMemo(() => getWindowPages(page, totalPages), [page, totalPages]);
  
  return (
    <Wrap aria-label="페이지네이션">
      <NavButton type="button" onClick={() => onChange(Math.max(1, page - 1))} disabled={page <= 1}>
        {'이전'}
      </NavButton>
      
      <Pages>
        {pages.map(p => (
          <PageButton
            key={p}
            type="button"
            onClick={() => onChange(p)}
            data-active={p === page}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </PageButton>
        ))}
      </Pages>
      
      <NavButton type="button" onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>
        {'다음'}
      </NavButton>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: 12px;
`;

const Pages = styled.div`
  display: inline-flex;
  gap: 6px;
`;

const NavButton = styled.button`
  border-radius: 10px;
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  background: ${({ theme }) => theme.colors.background.bg1};
  color: ${({ theme }) => theme.colors.text.text1};
  ${({ theme }) => theme.fonts.caption};

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.hover};
    border-color: ${({ theme }) => theme.colors.border.border2};
  }
`;

const PageButton = styled.button`
  min-width: 34px;
  border-radius: 10px;
  padding: 6px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  background: ${({ theme }) => theme.colors.background.bg1};
  color: ${({ theme }) => theme.colors.text.text1};
  ${({ theme }) => theme.fonts.caption};

  &[data-active='true'] {
    border-color: ${({ theme }) => theme.colors.border.border2};
    color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: ${({ theme }) => theme.shadows.elev1};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    border-color: ${({ theme }) => theme.colors.border.border2};
  }
`;

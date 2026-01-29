import styled from '@emotion/styled';
import { type RefObject } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { type SectionId } from '@/pages/sections';
import { buttonVariants } from '@/animations/variants';
import { S } from '@/components/main';

type Item = { id: SectionId; label: string };

interface HeaderNavProps {
  headerRef: RefObject<HTMLElement | null>;
  items: ReadonlyArray<Item>;
  activeId: SectionId;
  activeMenuId: Exclude<SectionId, 'thumbnail'> | null;
  onToggleTheme: () => void;
  onLogoClick: () => void;
  onNavigate: (id: SectionId) => void;
}

const HeaderNav = ({
  headerRef,
  items,
  activeId,
  activeMenuId,
  onToggleTheme,
  onLogoClick,
  onNavigate,
}: HeaderNavProps) => {
  return (
    <HeaderContainer ref={headerRef}>
      <Logo type="button" onClick={onLogoClick}>
        JIYOON
      </Logo>

      <LayoutGroup id="header">
        <Menu>
          {items.map(({ id, label }) => {
            const isActive = activeId === id;
            const isHighlightHere = activeMenuId === id;

            return (
              <MenuItem key={id} type="button" onClick={() => onNavigate(id)}>
                {isHighlightHere && (
                  <S.ActiveHighlight
                    layoutId="activeHighlight"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 40,
                      mass: 0.9,
                    }}
                  />
                )}
                <S.MenuLabel
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  $active={isActive}
                >
                  {label}
                </S.MenuLabel>
              </MenuItem>
            );
          })}
        </Menu>
      </LayoutGroup>

      <S.ThemeChip
        type="button"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={onToggleTheme}
      />
    </HeaderContainer>
  );
};

export default HeaderNav;

const HeaderContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.colors.background.bg1} / 25;
  backdrop-filter: blur(12px);

  @media (max-width: 820px) {
    display: none;
  }
`;

const Logo = styled.button`
  ${({ theme }) => theme.fonts.labelXL};
  color: ${({ theme }) => theme.colors.text.text1};

  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  @media (max-width: 1440px) {
    font-size: 32px;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 60px;

  @media (max-width: 1440px) {
    gap: 20px;
  }
`;

const MenuItem = styled(motion.button)`
  position: relative;
  display: flex;
  align-items: center;
  padding: 14px 20px;
`;

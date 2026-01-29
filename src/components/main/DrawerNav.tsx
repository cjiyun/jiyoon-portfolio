import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { S } from '@/components/main';
import { useDrawerNavEffects } from '@/hooks/useDrawerNavEffects';
import { useThemeMode } from '@/hooks/useThemeMode';
import { themes } from '@/styles/theme';
import { buttonVariants } from '@/animations/variants';
import type { SectionId } from '@/pages/sections';

type Item = { id: SectionId; label: string };

interface MobileDrawerNavProps {
  items: ReadonlyArray<Item>;
  activeId: SectionId;
  activeMenuId: Exclude<SectionId, 'thumbnail'> | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggleTheme: () => void;
  onLogoClick: () => void;
  onNavigate: (id: SectionId) => void;
}

const DrawerNav = ({
  items,
  activeId,
  activeMenuId,
  isOpen,
  onOpen,
  onClose,
  onToggleTheme,
  onLogoClick,
  onNavigate,
}: MobileDrawerNavProps) => {
  useDrawerNavEffects({ isOpen, onClose });
  const { nextMode } = useThemeMode();
  const nextTheme = themes[nextMode];

  const onToggleDrawer = () => {
    if (isOpen) onClose();
    else onOpen();
  };

  return (
    <Wrapper>
      <TopBar>
        <Logo type="button" onClick={onLogoClick}>
          JIYOON
        </Logo>

        <HamburgerButton
          type="button"
          onClick={onToggleDrawer}
          aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <HamburgerLine $active={isOpen} />
          <HamburgerLine $active={isOpen} />
          <HamburgerLine $active={isOpen} />
        </HamburgerButton>
      </TopBar>

      {/* 5) 배경 블러 */}
      {isOpen && <Overlay onClick={onClose} />}

      {/* 3) 오른쪽 -> 왼쪽 드로어 */}
      <Drawer $open={isOpen} role="dialog" aria-modal="true">
        <Menu>
          {items.map(({ id, label }) => {
            const isActive = activeId === id;
            const isHighlightHere = activeMenuId === id;

            return (
              <MenuItem
                key={id}
                type="button"
                variants={buttonVariants}
                whileTap="tap"
                onClick={() => onNavigate(id)}
                $active={isActive}
              >
                <LabelContainer>
                  <S.MenuLabel $active={isActive}>{label}</S.MenuLabel>

                  {isHighlightHere && (
                    <S.ActiveHighlight
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 40,
                        mass: 0.9,
                      }}
                    />
                  )}
                </LabelContainer>
              </MenuItem>
            );
          })}
          <S.ThemeChip
            type="button"
            variants={buttonVariants}
            whileTap="tap"
            onClick={onToggleTheme}
            aria-label="테마 토글"
            $bg={nextTheme.colors.background.bg2}
          />
        </Menu>
      </Drawer>
    </Wrapper>
  );
};

export default DrawerNav;

const Wrapper = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 120;
  width: 100%;

  @media (min-width: 821px) {
    display: none;
  }
`;

const TopBar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 140;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 20px;
  background-color: ${({ theme }) => theme.colors.background.bg1};
  transition: all 400ms;
`;

const Logo = styled.button`
  ${({ theme }) => theme.fonts.labelXL};
  font-size: 24px;
  line-height: 30px;
  color: ${({ theme }) => theme.colors.text.text1};

  &:active {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

const HamburgerButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.text1};
`;

const HamburgerLine = styled.span<{ $active: boolean }>`
  position: absolute;
  left: 50%;
  display: block;
  width: 16px;
  height: 2px;
  background-color: currentColor;
  transition: all 0.3s ease-in-out;
  transform-origin: center;
  margin-left: -8px;

  &:nth-of-type(1) {
    top: 9px;
    ${({ $active }) => $active && 'top: 14px; transform: rotate(45deg);'}
  }

  &:nth-of-type(2) {
    top: 14px;
    ${({ $active }) => $active && 'opacity: 0;'}
  }

  &:nth-of-type(3) {
    top: 19px;
    ${({ $active }) => $active && 'top: 14px; transform: rotate(-45deg);'}
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 130;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
`;

const Drawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 135;
  height: 100vh;
  width: min(200px, 60vw);
  background: ${({ theme }) => theme.colors.background.bg1};
  transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
  transition: all 400ms;
  padding: 70px 16px 16px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px;
  gap: 16px;
`;

const MenuItem = styled(motion.button)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
`;

const LabelContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 10px;
`;

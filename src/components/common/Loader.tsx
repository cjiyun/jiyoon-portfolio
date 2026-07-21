import styled from '@emotion/styled';

type LoaderProps = {
  size?: number;
};

export const Loader = ({ size = 30 }: LoaderProps) => {
  return <DotLoader aria-label="loading" $size={size} />;
};

const DotLoader = styled.div<{ $size: number }>`
  width: ${({ $size }) => `${$size}px`};
  aspect-ratio: 2;
  background:
    no-repeat radial-gradient(circle closest-side, currentColor 90%, #0000) 0 50%,
    no-repeat radial-gradient(circle closest-side, currentColor 90%, #0000) 50% 50%,
    no-repeat radial-gradient(circle closest-side, currentColor 90%, #0000) 100% 50%;
  background-size: 25% 50%;
  animation: l3 1s infinite linear;

  @keyframes l3 {
    20% {
      background-position:
        0 0,
        50% 50%,
        100% 50%;
    }
    40% {
      background-position:
        0 100%,
        50% 0,
        100% 50%;
    }
    60% {
      background-position:
        0 50%,
        50% 100%,
        100% 0;
    }
    80% {
      background-position:
        0 50%,
        50% 50%,
        100% 100%;
    }
  }
`;

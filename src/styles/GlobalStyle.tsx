import { css, Global } from '@emotion/react';

const GlobalStyle = () => {
  return (
    <Global
      styles={theme => css`
        @import url('https://fonts.googleapis.com/css2?family=Racing+Sans+One&display=swap');

        @font-face {
          font-family: 'Pretendard';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2')
            format('woff2');
          font-weight: 400;
          font-display: swap;
        }

        @font-face {
          font-family: 'Pretendard';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Medium.woff2')
            format('woff2');
          font-weight: 500;
          font-display: swap;
        }

        @font-face {
          font-family: 'Pretendard';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-SemiBold.woff2')
            format('woff2');
          font-weight: 600;
          font-display: swap;
        }

        @font-face {
          font-family: 'Pretendard';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraBold.woff2')
            format('woff2');
          font-weight: 800;
          font-display: swap;
        }

        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
          -webkit-touch-callout: none;
          user-select: none;
        }

        :root {
          --vh: 100%;
        }

        body,
        html {
          margin: 0 auto;
          padding: 0;
          color: black;
          overscroll-behavior: none; /* 바운스/당김 새로고침 막음 */
          font-family: 'Pretendard', sans-serif;
          background-color: ${theme.colors.background.bg1};
        }

        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          padding: 0;
          margin: 0;
        }

        button {
          cursor: pointer;
          padding: 0;
          margin: 0;
          background: none;
          border: none;
          outline: none;

          &:hover {
            outline: none;
          }

          &:focus {
            outline: none;
          }

          &:active {
            outline: none;
          }

          &:disabled {
            color: ${theme.colors.text.text5};
            background-color: ${theme.colors.background.disabled};
            cursor: not-allowed;
          }

          &:focus-visible {
            outline: 2px solid ${theme.colors.brand.primary};
            outline-offset: 3px;
          }
        }

        *::-webkit-scrollbar {
          width: 12px;
        }

        *::-webkit-scrollbar-track {
          background: transparent;
        }

        *::-webkit-scrollbar-thumb {
          border: 2px solid transparent;
          border-radius: 999px;
          background-color: ${theme.colors.neutral.neutral300};
          background-clip: content-box;
        }

        *::-webkit-scrollbar-thumb:hover {
          background-color: ${theme.colors.neutral.neutral400};
        }
      `}
    />
  );
};

export default GlobalStyle;

import { css, Global } from '@emotion/react';

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
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

        #root {
          margin: 0 auto;
          padding: 0;
        }

        body,
        html {
          overflow-x: hidden;
          margin: 0 auto;
          padding: 0;
          color: black;
          overscroll-behavior: none; /* 바운스/당김 새로고침 막음 */
          font-family: 'Pretendard', sans-serif;
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
        }

        ::-webkit-scrollbar {
          display: none;
        }
      `}
    />
  );
};

export default GlobalStyle;

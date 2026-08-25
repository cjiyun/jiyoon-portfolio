import { ThemeProvider } from '@/provider/ThemeProvider';
import { ThemeModeProvider } from '@/provider/ThemeModeProvider';
import { ToastProvider } from '@/provider/ToastProvider';
import { Layout } from '@/layouts/Layout';
import { ToastStack } from '@/components/guestbook/ToastStack';
import GlobalStyle from '@/styles/GlobalStyle';
import '@/App.css';

function App() {
  return (
    <ThemeModeProvider>
      <ThemeProvider>
        <ToastProvider>
          <GlobalStyle />
          <Layout />
          <ToastStack />
        </ToastProvider>
      </ThemeProvider>
    </ThemeModeProvider>
  );
}

export default App;

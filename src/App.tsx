import { ThemeProvider } from '@/provider/ThemeProvider';
import { ThemeModeProvider } from '@/provider/ThemeModeProvider';
import { Layout } from '@/layouts/Layout';
import GlobalStyle from '@/styles/GlobalStyle';
import '@/App.css';

function App() {
  return (
    <ThemeModeProvider>
      <ThemeProvider>
        <GlobalStyle />
        <Layout />
      </ThemeProvider>
    </ThemeModeProvider>
  );
}

export default App;

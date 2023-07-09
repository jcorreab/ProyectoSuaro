// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import NotistackProvider from './components/app/NotistackProvider';
import Cargando from './components/app/Cargando';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <NotistackProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />
        <Cargando/>
      </NotistackProvider>
    </ThemeProvider>
  );
}

import AppProvidersWrapper from './components/wrappers/AppProvidersWrapper';
import AppRouter from './routes/router';
import { AuthProvider } from './context/AuthContext';
import 'flatpickr/dist/flatpickr.min.css';
import '@/assets/scss/app.scss';
import '@/assets/scss/icons.scss';

function App() {
  return (
    <AuthProvider>
      <AppProvidersWrapper>
        <AppRouter />
      </AppProvidersWrapper>
    </AuthProvider>
  );
}

export default App;
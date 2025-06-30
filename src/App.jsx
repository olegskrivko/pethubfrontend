import { Suspense, lazy, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';

import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Layout components
import FullLayout from './pages/layout/FullLayout';
import Layout from './pages/layout/Layout';
import PrivateRoute from './pages/auth/components/PrivateRoute';

// Common pages
import PageNotFound from './pages/PageNotFound';
import PosterScanPage from './pages/PosterScanPage';
import UploadTest from './pages/UploadTest';

// Article pages
import ArticleDetailsPage from './pages/articles/views/ArticleDetailsPage';
import ArticlesListPage from './pages/articles/views/ArticlesPage';

// Authentication pages
import AccountDeletedPage from './pages/auth/views/AccountDeletedPage';
import ForgotPasswordPage from './pages/auth/views/ForgotPasswordPage';
import LoginPage from './pages/auth/views/LoginPage';
import LogoutPage from './pages/auth/views/LogoutPage';
import RegisterPage from './pages/auth/views/RegisterPage';
import ResetPasswordPage from './pages/auth/views/ResetPasswordPage';

// Common feature pages
import Collaborate from './pages/common/views/Collaborate';
import Contact from './pages/common/views/Contact';
import FrequentlyAskedQuestions from './pages/common/views/FrequentlyAskedQuestions';
import PetQuiz from './pages/common/views/PetQuiz';
import PetTraining from './pages/common/views/PetTraining';
import PolicyPage from './pages/common/views/PolicyPage';
import Support from './pages/common/views/Support';

// Pet pages
import EditPetPage from './pages/pets/views/EditPetPage';
import PetAddStepper from './pages/pets/views/PetAddStepper';
import PetDetailsPage from './pages/pets/views/PetDetailsPage';
import PetsListPage from './pages/pets/views/PetsPage';
import Poster from './pages/pets/views/Poster';

// Profile pages
import BookmarksIndexPage from './pages/profile/views/BookmarksIndexPage';
import Profile from './pages/profile/views/Profile';
import UserPetBookmarks from './pages/profile/views/UserPetBookmarks';
import UserPets from './pages/profile/views/UserPets';
import UserPosters from './pages/profile/views/UserPosters';
import UserServiceBookmarks from './pages/profile/views/UserServiceBookmarks';
import UserServices from './pages/profile/views/UserServices';
import UserSettings from './pages/profile/views/UserSettings';

// Service pages
import ServiceDetailsPage from './pages/services/views/ServiceDetailsPage';
import ServicesListPage from './pages/services/views/ServicesPage';

// Shelter pages
import ShelterDetailsPage from './pages/shelters/views/ShelterDetails';
import SheltersListPage from './pages/shelters/views/SheltersList';

// Shared components
import CookieConsent from './shared/components/CookieConsent';
import Loader from './shared/components/Loader';

// Lazy-loaded pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

/**
 * Material-UI theme configuration
 * Defines the color palette and component styling for the application
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#00b3a4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF5733',
      contrastText: '#ffffff',
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});

/**
 * Main App component
 * Sets up the application structure with routing, theming, and global providers
 */
function App() {
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);

  /**
   * Handles cookie consent acceptance
   * Updates state and logs the user's acceptance
   */
  const handleAcceptCookies = () => {
    setHasAcceptedCookies(true);
    console.log('User accepted cookies');
  };

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <Router>
            <AuthProvider>
              <LanguageProvider>
                <Suspense fallback={<Loader />}>
                  <Routes>
                    {/* Home page with full layout (no container) */}
                    <Route path="/" element={<FullLayout />}>
                      <Route index element={<Home />} />
                    </Route>

                    {/* Main application routes with standard layout */}
                    <Route element={<Layout />}>
                      {/* Public pages */}
                      <Route path="about" element={<About />} />
                      <Route path="contact" element={<Contact />} />
                      <Route path="support" element={<Support />} />
                      <Route path="collaborate" element={<Collaborate />} />
                      <Route path="frequently-asked-questions" element={<FrequentlyAskedQuestions />} />
                      <Route path="virtual-pet-training-classes" element={<PetTraining />} />
                      <Route path="policies" element={<PolicyPage />} />
                      <Route path="pet-matching-quiz" element={<PetQuiz />} />

                      {/* Shelter pages */}
                      <Route path="shelters" element={<SheltersListPage />} />
                      <Route path="shelters/:id" element={<ShelterDetailsPage />} />

                      {/* Pet pages */}
                      <Route path="pets" element={<PetsListPage />} />
                      <Route path="pets/:id" element={<PetDetailsPage />} />
                      <Route path="pets/:id/poster" element={<Poster />} />

                      {/* Service pages */}
                      <Route path="services" element={<ServicesListPage />} />
                      <Route path="services/:id" element={<ServiceDetailsPage />} />

                      {/* Article pages */}
                      <Route path="articles" element={<ArticlesListPage />} />
                      <Route path="articles/:slug" element={<ArticleDetailsPage />} />

                      {/* Authentication pages */}
                      <Route path="login" element={<LoginPage />} />
                      <Route path="register" element={<RegisterPage />} />
                      <Route path="logout" element={<LogoutPage />} />
                      <Route path="forgot-password" element={<ForgotPasswordPage />} />
                      <Route path="reset-password/:token" element={<ResetPasswordPage />} />
                      <Route path="account-deleted" element={<AccountDeletedPage />} />

                      {/* Utility pages */}
                      <Route path="test" element={<UploadTest />} />
                      <Route path="posters/:posterId/scan" element={<PosterScanPage />} />

                      {/* Protected routes requiring authentication */}
                      <Route element={<PrivateRoute />}>
                        <Route path="add-pet" element={<PetAddStepper />} />
                        <Route path="user-profile" element={<Profile />} />
                        <Route path="user-profile/settings" element={<UserSettings />} />
                        <Route path="user-profile/bookmarks/pets" element={<UserPetBookmarks />} />
                        <Route path="user-profile/bookmarks/services" element={<UserServiceBookmarks />} />
                        <Route path="user-profile/bookmarks" element={<BookmarksIndexPage />} />
                        <Route path="user-profile/pets" element={<UserPets />} />
                        <Route path="user-profile/services" element={<UserServices />} />
                        <Route path="user-profile/map" element={<UserPosters />} />
                        <Route path="user-profile/edit-pet/:id" element={<EditPetPage />} />
                      </Route>

                      {/* 404 page for unmatched routes */}
                      <Route path="*" element={<PageNotFound />} />
                    </Route>
                  </Routes>
                </Suspense>
                <CookieConsent />
              </LanguageProvider>
            </AuthProvider>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

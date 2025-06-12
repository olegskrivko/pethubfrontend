import { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
// import { DrawerProvider } from './contexts/DrawerContext'
import { LanguageProvider } from './contexts/LanguageContext';
import { CssBaseline, Box  } from '@mui/material';
import Layout from './pages/layout/Layout';
import FullLayout from './pages/layout/FullLayout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';
import Loader from './shared/components/Loader';
import './App.css'

// PAGES
import Contact from './pages/common/views/Contact';
import Support from './pages/common/views/Support';
import Collaborate from './pages/common/views/Collaborate';
import FrequentlyAskedQuestions from './pages/common/views/FrequentlyAskedQuestions';
import PolicyPage from './pages/common/views/PolicyPage';
import PetQuiz from './pages/common/views/PetQuiz';
import PetTraining from './pages/common/views/PetTraining';

import Pricing from './pages/payment/views/Pricing';
import CheckoutPage from './pages/payment/views/CheckoutPage';
import SuccessPage from './pages/payment/views/SuccessPage';
import CancelPage from './pages/payment/views/CancelPage';

import SheltersListPage from './pages/shelters/views/SheltersList';
import ShelterDetailsPage from './pages/shelters/views/ShelterDetails';
import ArticlesListPage from './pages/articles/views/ArticlesPage';
import ArticleDetailsPage from './pages/articles/views/ArticleDetailsPage';
import ServicesListPage from './pages/services/views/ServicesPage';
import ServiceDetailsPage from './pages/services/views/ServiceDetailsPage';

import Profile from './pages/profile/views/Profile';
import UserSettings from './pages/profile/views/UserSettings'
import UserPets from './pages/profile/views/UserPets'
import UserServices from './pages/profile/views/UserServices'
import BookmarksIndexPage from './pages/profile/views/BookmarksIndexPage'
import UserPetBookmarks from './pages/profile/views/UserPetBookmarks'
import UserServiceBookmarks from './pages/profile/views/UserServiceBookmarks'

import PetsListPage from './pages/pets/views/PetsPage';
import PetDetailsPage from './pages/pets/views/PetDetailsPage';
import Poster from './pages/pets/views/Poster';
import PetAddStepper from "./pages/pets/views/PetAddStepper"


import Login from './pages/auth/views/Login';
import Register from './pages/auth/views/Register';
import ForgotPassword from './pages/auth/views/ForgotPassword';
import ResetPassword from "./pages/auth/views/ResetPassword";
import Logout from './pages/auth/views/Logout';
import AccountDeleted from './pages/auth/views/AccountDeleted';

import PageNotFound from './pages/PageNotFound';

import CookieConsent from 'react-cookie-consent';
import { AuthProvider } from './contexts/AuthContext'; // Path to AuthContext
import { useAuth } from './contexts/AuthContext'; // Adjust the path as needed
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PrivateRoute from './pages/auth/components/PrivateRoute';
import cookieIcon from './assets/react.svg';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

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

const stripePromise = loadStripe("pk_test_51MsAlCBnYVUZPzgiEPtA6hevdWCEOymSzerTmiA2mWpkutsMBMyo8aAuryBXQGXt7rqAk7pgkWCwCmPQddSCXoHQ00gJEKTAS3");

function App() {
  
  const [hasAcceptedCookies, setHasAcceptedCookies] = useState(false);

  const handleAcceptCookies = () => {
    // Set state to true when the user accepts the cookies
    setHasAcceptedCookies(true);
    console.log('User accepted cookies');
    // You can also perform other actions here, such as updating a global state or sending the acceptance to an analytics service
  };


  return (
    <HelmetProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Elements stripe={stripePromise}>
      <Router>
        <AuthProvider>
          <LanguageProvider>
          <Suspense fallback={<Loader />}>
          <Routes>

            {/* Routes with FullLayout (no container) */}
            <Route path="/" element={<FullLayout />}>
                <Route index element={<Home />} />
            </Route>

            {/* Routes with main Layout (container) */}
            <Route element={<Layout />}>
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="support" element={<Support />} />
            <Route path="collaborate" element={<Collaborate />} />
            <Route path="frequently-asked-questions" element={<FrequentlyAskedQuestions />} />
            <Route path="virtual-pet-training-classes" element={<PetTraining />} />
            <Route path="policies" element={<PolicyPage />} />
            <Route path="pet-matching-quiz" element={<PetQuiz />} />
            <Route path="shelters" element={<SheltersListPage />} />
            <Route path="shelters/:id" element={<ShelterDetailsPage />} />
            <Route path="pets" element={<PetsListPage />} />
            <Route path="pets/:id" element={<PetDetailsPage />} />
            <Route path="pets/:id/poster" element={<Poster />} />

            
            <Route path="services" element={<ServicesListPage />} />
            <Route path="services/:id" element={<ServiceDetailsPage />} />
            <Route path="articles" element={<ArticlesListPage />} />
            <Route path="articles/:slug" element={<ArticleDetailsPage />} />

            <Route path="pricing" element={<Pricing />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="success" element={<SuccessPage />} />
            <Route path="subscription-success" element={<SuccessPage />} />
            {/* <Route path="cancel" element={<CancelPage />} /> */}
            <Route path="subscription-cancel" element={<CancelPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="logout" element={<Logout />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="account-deleted" element={<AccountDeleted />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
            <Route path="add-pet" element={<PetAddStepper />} />
            <Route path="user-profile" element={<Profile />} />

            
            <Route path="user-profile/settings" element={<UserSettings />} />
           <Route path="user-profile/bookmarks/pets" element={<UserPetBookmarks />} />
            <Route path="user-profile/bookmarks/services" element={<UserServiceBookmarks />} />
            <Route path="user-profile/bookmarks" element={<BookmarksIndexPage />} />
            <Route path="user-profile/pets" element={<UserPets />} />
            <Route path="user-profile/services" element={<UserServices />} />
{/* 
              <Route path="test-one/new" element={<About />} />
              <Route path="test-two/:id/edit" element={<About />} /> */}
            </Route>


            {/* Catch-all for 404 */}
            <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>

          </Suspense>
           {/* <CookieConsent
  location="bottom"
  cookieName="userAcceptedCookies"
  enableDeclineButton
  buttonText="I Accept"
  declineButtonText="Decline"
  onAccept={handleAcceptCookies}
  onDecline={() => console.log('User declined cookies')}
  style={{
    background: '#2474A3',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    borderTop: '1px solid #ddd',
    padding: '15px 20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  }}
  buttonStyle={{
    background: '#00b3a4',
    color: '#fff',
    fontSize: '14px',
    borderRadius: '30px',
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    transition: 'background 0.3s ease',
  }}
  declineButtonStyle={{
    background: '#FF5733',
    color: '#fff',
    fontSize: '14px',
    borderRadius: '30px',
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    transition: 'background 0.3s ease',
  }}
  buttonWrapperStyle={{
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  }}
  expires={150}
>
  <Box style={{ display: 'flex', alignItems: 'center' }}>
    <img 
      src={cookieIcon}
      alt="Cookie Icon"
      style={{
        width: '30px',
        height: 'auto',
        marginRight: '12px',
      }} 
    />
    <span style={{ fontSize: '14px', fontWeight: 500 }}>
      This website uses cookies to enhance the user experience.{' '}
      <span style={{ fontSize: '12px' }}>
        Read our{' '}
        <Link
          to='/policies'
          style={{
            fontSize: '12px',
            color: '#ffffff',
            textDecoration: 'underline',
          }}
        >
          Privacy Policy
        </Link>
        .
      </span>
    </span>
  </Box>
</CookieConsent> */}
          </LanguageProvider>
        </AuthProvider>
      </Router>
      </Elements>
    </ThemeProvider>
    </HelmetProvider>
  )
}

export default App

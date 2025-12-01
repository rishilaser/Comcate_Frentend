import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

// Components
import Header from './components/layout/Header';
import InternalHeader from './components/layout/InternalHeader';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Dashboard from './pages/Dashboard';
import NewInquiry from './pages/inquiry/NewInquiry';
import InquiryList from './pages/inquiry/InquiryList';
import InquiryDetail from './pages/inquiry/InquiryDetail';
import OrderList from './pages/order/OrderList';
import OrderDetail from './pages/order/OrderDetail';
import OrderTracking from './pages/order/OrderTracking';
import PaymentPage from './pages/order/PaymentPage';
import BackOfficeDashboard from './pages/BackOfficeDashboard';
import BackOfficeMaterialManagement from './pages/BackOfficeMaterialManagement';
import ComponentManagerPage from './pages/ComponentManagerPage';
import ComponentManagerDetail from './pages/ComponentManagerDetail';
import QuotationResponse from './pages/inquiry/QuotationResponse';
import QuotationPayment from './pages/payment/QuotationPayment';
import OrderManagement from './pages/order/OrderManagement';
import ServiceContact from './pages/ServiceContact';
import About from './pages/About';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Parts from './pages/Parts';
import Tools from './pages/Tools';
import NotFound from './pages/NotFound';
import AdminLayout from './components/layout/AdminLayout';
import { useAuth } from './contexts/AuthContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : children;
};

// Layout Component
const Layout = ({ children, isInternal = false }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isAdminPage = location.pathname.startsWith('/admin/') || 
                      location.pathname.startsWith('/component-manager');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && (isInternal ? <InternalHeader /> : <Header />)}
      <main className={isAuthPage ? '' : isAdminPage ? 'pt-2 pb-0' : 'pt-2 pb-80'}>
        {children}
      </main>
      {!isAuthPage && !isAdminPage && <Footer />}
    </div>
  );
};

// InquiryList Wrapper - Uses AdminLayout for all users (admin and customer)
const InquiryListWrapper = () => {
  return (
    <AdminLayout>
      <InquiryList />
    </AdminLayout>
  );
};

// Profile Wrapper - Uses AdminLayout for all users (admin and customer)
const ProfileWrapper = () => {
  return (
    <AdminLayout>
      <Profile />
    </AdminLayout>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={
              <Layout>
                <About />
              </Layout>
            } />
            <Route path="/services" element={
              <Layout>
                <Services />
              </Layout>
            } />
            <Route path="/parts" element={
              <Layout>
                <Parts />
              </Layout>
            } />
            <Route path="/tools" element={
              <Layout>
                <Tools />
              </Layout>
            } />
            <Route path="/contact" element={
              <Layout>
                <ServiceContact />
              </Layout>
            } />
            
            {/* Auth Routes */}
            <Route path="/login" element={
              <PublicRoute>
                <Layout>
                  <Login />
                </Layout>
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <Layout>
                  <SignUp />
                </Layout>
              </PublicRoute>
            } />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfileWrapper />
              </ProtectedRoute>
            } />
            
            {/* Inquiry Routes */}
            <Route path="/inquiry/new" element={
              <ProtectedRoute>
                <AdminLayout>
                  <NewInquiry />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/inquiries" element={
              <ProtectedRoute>
                <InquiryListWrapper />
              </ProtectedRoute>
            } />
            <Route path="/inquiry/:id" element={
              <ProtectedRoute>
                <AdminLayout>
                  <InquiryDetail />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/quotation/:id" element={
              <ProtectedRoute>
                <AdminLayout>
                  <QuotationResponse />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/quotation/:id/response" element={
              <ProtectedRoute>
                <AdminLayout>
                  <QuotationResponse />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/quotation/:id/payment" element={
              <ProtectedRoute>
                <AdminLayout>
                  <QuotationPayment />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            {/* Order Routes */}
            <Route path="/orders" element={
              <ProtectedRoute>
                <AdminLayout>
                  <OrderList />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/order/:id" element={
              <ProtectedRoute>
                <AdminLayout>
                  <OrderDetail />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/order/:id/tracking" element={
              <ProtectedRoute>
                <AdminLayout>
                  <OrderTracking />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/order/:id/payment" element={
              <ProtectedRoute>
                <AdminLayout>
                  <PaymentPage />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Layout isInternal>
                  <BackOfficeDashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedRoute>
                <AdminLayout>
                  <OrderManagement />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/admin/material-management" element={
              <ProtectedRoute>
                <AdminLayout>
                  <BackOfficeMaterialManagement />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            {/* Component Manager Routes */}
            <Route path="/component-manager" element={
              <ProtectedRoute>
                <AdminLayout>
                  <ComponentManagerPage />
                </AdminLayout>
              </ProtectedRoute>
            } />
            <Route path="/component-manager/:id" element={
              <ProtectedRoute>
                <AdminLayout>
                  <ComponentManagerDetail />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
          </Routes>
          <Toaster position="top-right" />
            </div>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
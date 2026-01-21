import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { CreatePage } from './pages/CreatePage';
import { DashboardPage } from './pages/DashboardPage';
import { DocsPage } from './pages/DocsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
// 1. Import the background component
import { NetworkBackground } from './components/NetworkBackground';

function App() {
  return (
    <BrowserRouter>
      {/* 2. Add the Global Background here */}
      {/* 'fixed' makes it cover the whole window and stay there while scrolling */}
      {/* 'pointer-events-none' ensures clicks pass through to your buttons */}
      <NetworkBackground 
        color="255, 255, 255" 
        particleCount={100} 
        className="fixed inset-0 z-0 opacity-30 pointer-events-none" 
      />

      {/* 3. Add 'relative z-10' to your content wrapper */}
      {/* This ensures your app content sits ON TOP of the canvas */}
      <div className="min-h-screen flex flex-col relative z-10">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
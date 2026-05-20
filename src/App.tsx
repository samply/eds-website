import { useState, useCallback } from 'react';
import { Router, Switch, Route } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ScorePage from './pages/ScorePage';
import MethodsPage from './pages/MethodsPage';
import WorkupPage from './pages/WorkupPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleForceReset = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  return (
    <Router hook={useHashLocation}>
      <div className="min-h-screen flex flex-col">
        <Header onAbout={() => setAboutOpen(true)} onReset={handleForceReset} />

        <div className="flex flex-1" style={{ minHeight: 'calc(100vh - 60px)' }}>
          <Sidebar />
          <main className="flex-1 px-10 py-9 max-w-[1100px]">
            <Switch>
              <Route path="/score">
                <ScorePage key={resetKey} />
              </Route>
              <Route path="/methods">
                <MethodsPage />
              </Route>
              <Route path="/workup">
                <WorkupPage />
              </Route>
              <Route path="/contact">
                <ContactPage />
              </Route>
              <Route path="/">
                <ScorePage key={resetKey} />
              </Route>
            </Switch>
          </main>
        </div>

        <Footer />

        {/* About Modal */}
        <Modal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} title="About">
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p className="font-semibold text-navy text-base">
              Eosinophilia Differentiation Score (EDS)
            </p>
            <p>
              A clinical decision support tool for distinguishing clonal from non-clonal eosinophilia based on seven
              laboratory and clinical variables.
            </p>
            <p>
              This tool supports clinical decision-making but does not replace the physician's judgment.
            </p>
          </div>
        </Modal>
      </div>
    </Router>
  );
}

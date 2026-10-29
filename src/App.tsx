import { useState } from 'react';
import { Router, Switch, Route, Redirect } from 'wouter';
import { DEFAULT_FORM_VALUES } from './types';
import type { FormValues } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ScorePage from './pages/ScorePage';
import MethodsPage from './pages/MethodsPage';
import WorkupPage from './pages/WorkupPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scoreValues, setScoreValues] = useState<FormValues>(DEFAULT_FORM_VALUES);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header onAbout={() => setAboutOpen(true)} />

        <main className="flex-1 px-4 sm:px-6 lg:px-10 pt-6 sm:pt-9 pb-8 sm:pb-10 max-w-[1100px] mx-auto w-full">
            <Switch>
              <Route path="/score">
                <ScorePage values={scoreValues} onValuesChange={setScoreValues} />
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
                <ScorePage values={scoreValues} onValuesChange={setScoreValues} />
              </Route>
              {/* The server answers every path with index.html, so send unknown ones home. */}
              <Route>
                <Redirect to="/" replace />
              </Route>
            </Switch>
          </main>

        <Footer />

        {/* About Modal */}
        <Modal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} title="About">
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p className="font-semibold text-navy text-base">
              Eosinophilia Differentiation Score (EDS)
            </p>
            <p>
              The Eosinophilia Differentiation Score (EDS) is a tool for distinguishing clonal from non-clonal eosinophilia derived from factors associated with clonal versus non-clonal eosinophilia in the underlying study cohort.
            </p>
          </div>
        </Modal>
      </div>
    </Router>
  );
}

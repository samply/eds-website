import { useState } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useRouteError } from 'react-router';
import type { LinksFunction, MetaFunction } from 'react-router';
import { DEFAULT_FORM_VALUES } from './types';
import type { FormValues, ScoreContext } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import './index.css';

export const links: LinksFunction = () => [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }];

export const meta: MetaFunction = () => [{ title: 'Eosinophilia Differentiation Score' }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scoreValues, setScoreValues] = useState<FormValues>(DEFAULT_FORM_VALUES);
  // Lives here rather than in the score page so entered values survive navigation.
  const scoreContext: ScoreContext = { values: scoreValues, setValues: setScoreValues };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onAbout={() => setAboutOpen(true)} />

      <main className="flex-1 px-4 sm:px-6 lg:px-10 pt-6 sm:pt-9 pb-8 sm:pb-10 max-w-[1100px] mx-auto w-full">
        <Outlet context={scoreContext} />
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
  );
}

/* Shown while the SPA fallback (unknown paths) hydrates; NotFound then redirects. */
export function HydrateFallback() {
  return null;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : 'Something went wrong.';

  return (
    <main className="max-w-[1100px] mx-auto px-4 py-16 text-center">
      <h1 className="font-heading text-2xl font-bold text-navy mb-3">{message}</h1>
      <a href="/" className="text-blue font-semibold">Back to the score</a>
    </main>
  );
}

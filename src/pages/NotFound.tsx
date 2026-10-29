import { Navigate } from 'react-router';

/* Unknown paths are served the SPA fallback; send them to the score page. */
export default function NotFound() {
  return <Navigate to="/" replace />;
}

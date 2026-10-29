import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('pages/ScorePage.tsx'),
  route('methods', 'pages/MethodsPage.tsx'),
  route('workup', 'pages/WorkupPage.tsx'),
  route('contact', 'pages/ContactPage.tsx'),
  route('*', 'pages/NotFound.tsx'),
] satisfies RouteConfig;

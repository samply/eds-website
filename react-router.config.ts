import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  // Static hosting only: every route is rendered to HTML at build time. The
  // catch-all route is left to the SPA fallback (__spa-fallback.html).
  ssr: false,
  prerender: ({ getStaticPaths }) => getStaticPaths(),
} satisfies Config;

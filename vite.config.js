import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// npm run build           → dist/ (Vercel·Firebase Hosting 배포용)
// npm run build:artifact  → dist-artifact/index.html (한 파일, Claude 아티팩트용)
export default defineConfig(({ mode }) => {
  const artifact = mode === 'artifact';
  return {
    plugins: [react(), ...(artifact ? [viteSingleFile()] : [])],
    json: { stringify: true },
    define: artifact ? { 'import.meta.env.VITE_TARGET': JSON.stringify('artifact') } : {},
    build: { outDir: artifact ? 'dist-artifact' : 'dist', chunkSizeWarningLimit: 2500 },
  };
});

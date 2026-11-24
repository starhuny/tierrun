import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// npm run build           → dist/ (Vercel·Firebase Hosting 배포용)
// npm run build:artifact  → dist-artifact/index.html (한 파일, Claude 아티팩트용)
// 배포마다 바뀌는 빌드 번호 → 열려 있는 앱이 새 버전을 알아채고 새로고침을 안내
const BUILD_ID = Date.now().toString(36);
const versionFile = () => ({
  name: 'version-file',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: 'version.json', source: JSON.stringify({ id: BUILD_ID }) });
  },
});

export default defineConfig(({ mode }) => {
  const artifact = mode === 'artifact';
  return {
    plugins: [react(), ...(artifact ? [viteSingleFile()] : [versionFile()])],
    json: { stringify: true },
    define: { __BUILD_ID__: JSON.stringify(BUILD_ID), ...(artifact ? { 'import.meta.env.VITE_TARGET': JSON.stringify('artifact') } : {}) },
    build: { outDir: artifact ? 'dist-artifact' : 'dist', chunkSizeWarningLimit: 2500 },
  };
});

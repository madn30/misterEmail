import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; // Corrected import statement

export default defineConfig({
  base: "/misterEmail/",
  plugins: [react()],

});

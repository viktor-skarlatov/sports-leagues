import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Read the .env file and expose its raw contents to the client bundle.
const { parsed: env = {} } = dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_ENV__: JSON.stringify(env),
  },
});

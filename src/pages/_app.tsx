// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MyContextProvider } from '../context/MyContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyContextProvider>
      <Component {...pageProps} />
    </MyContextProvider>
  );
}

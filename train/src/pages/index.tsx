import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Train</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}></main>
    </>
  );
}

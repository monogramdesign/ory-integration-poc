import '../styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { AuthProvider } from '../lib/contexts/AuthContext'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { client } from '../lib/sdk/apollo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Next.js + ORY</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <AuthProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthProvider>
    </div>
  )
}

export default MyApp

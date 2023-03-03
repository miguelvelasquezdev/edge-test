import '@/styles/globals.css'
import { trpc } from '@/utils/trpc'
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'

// Check if the current route matches a public page

function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  )
}

export default trpc.withTRPC(App)

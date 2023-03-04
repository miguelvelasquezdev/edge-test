import { trpc } from '@/utils/trpc'
import { useAuth, useSignIn, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

export default function SignInPage() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const { signIn, setActive } = useSignIn()
  const { userId, isSignedIn } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!userId) return
    router.push('/')
  }, [userId])

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!signIn) return
    await signIn
      .create({
        identifier: email,
        password,
      })
      .then((result) => {
        if (result.status === 'complete') {
          console.log(result)
          setActive({ session: result.createdSessionId })
        } else {
          console.log(result)
        }
      })
      .catch((err) => console.error('error', err.errors[0].longMessage))
  }

  return (
    <div className="flex flex-col  h-screen">
      <div className="m-5">
        <Link className="rounded border p-2 font-semibold" href="/">
          {'< index'}
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-5xl font-semibold">Welcome, please Sign In!</h1>
        <form onSubmit={submit}>
          <div className="flex gap-1 mt-5">
            <div>
              <input
                className="border rounded p-1"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className="border rounded p-1"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="text-center flex justify-center">
            {!isSignedIn && (
              <button className="border rounded bg-black text-white p-2 mt-2">Sign in</button>
            )}
            {!!isSignedIn && (
              <button
                disabled={isSignedIn}
                className="border rounded bg-gray-400 text-white p-2 mt-2 cursor-default"
              >
                Sign in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

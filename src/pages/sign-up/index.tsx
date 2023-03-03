import { trpc } from '@/utils/trpc'
import { useAuth, useSignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

export default function SignInPage() {
  const [emailAddress, setEmailAddress] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')

  const [password, setPassword] = useState<string>('')

  const { signUp, setActive } = useSignUp()
  const { userId, isSignedIn } = useAuth()

  const createUser = trpc.createUser.useMutation()

  const router = useRouter()

  useEffect(() => {
    if (userId) router.push('/')
  }, [userId])

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!signUp) return
    await signUp
      .create({
        firstName,
        emailAddress,
        password,
      })
      .then((result) => {
        if (result.status === 'complete') {
          setActive({ session: result.createdSessionId })
          createUser.mutate({ name: firstName, email: emailAddress })
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
        <h1 className="text-5xl font-semibold">Welcome, please Sign Up!</h1>
        <form onSubmit={submit}>
          <div className="flex gap-1 mt-5">
            <div>
              <input
                className="border rounded p-1"
                type="firstName"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <input
                className="border rounded p-1"
                type="email"
                value={emailAddress}
                placeholder="Email"
                onChange={(e) => setEmailAddress(e.target.value)}
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
              <button className="border rounded bg-black text-white p-2 mt-2">Sign Up</button>
            )}
            {!!isSignedIn && (
              <button
                disabled={isSignedIn}
                className="border rounded bg-gray-400 text-white p-2 mt-2 cursor-default"
              >
                Sign Up
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

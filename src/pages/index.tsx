import { useAuth, useClerk } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  const { userId } = useAuth()

  const { signOut, user } = useClerk()
  return (
    <div className="h-screen flex flex-col justify-center text-center items-center ">
      {!!userId && (
        <>
          <h1 className="text-5xl font-semibold m-5">
            Welcome {user?.fullName || user?.username}!
          </h1>
          <div className="flex gap-1">
            <Link className="border rounded font-bold p-2 mt-2" href="/home">
              Home
            </Link>

            <button className="border rounded font-bold  p-2 mt-2" onClick={() => signOut()}>
              Sign Out
            </button>
          </div>
        </>
      )}
      {!userId && (
        <>
          <h1 className="text-5xl font-semibold m-5">Welcome User!</h1>

          <div className="flex gap-1">
            <Link className="border rounded font-bold  p-2 mt-2" href="/sign-in">
              Sign In
            </Link>
            <Link className="border rounded font-bold  p-2 mt-2" href="/sign-up">
              Sign Up
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

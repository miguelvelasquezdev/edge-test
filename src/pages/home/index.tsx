import { trpc } from '@/utils/trpc'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useState } from 'react'

const Home = () => {
  const hello = trpc.hello.useQuery({ text: 'client' })
  const user = trpc.createUser.useMutation()
  const users = trpc.getAllUsers.useQuery()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const inputName = e.target.name
    if (inputName === 'name') {
      setName(e.target.value)
    } else if (inputName === 'email') {
      setEmail(e.target.value)
    }
  }

  const createUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.length && email.length) {
      try {
        const res = user.mutate({ name, email })
      } catch (e) {
        console.log(e, 'error')
      }
    } else {
      alert('empty fields')
    }
  }

  const { userId } = useAuth()

  if (!hello.data && !users.data) {
    return <div>Loading...</div>
  }
  return (
    <div className="p-4">
      <div className="m-1 mb-5">
        <Link className="border rounded font-bold  p-2" href="/">
          {'< Index'}
        </Link>
      </div>
      <h1 className="m-1 text-2xl font-bold">{hello?.data?.greeting}</h1>

      {!!userId && (
        <form onSubmit={(e) => createUser(e)}>
          <input
            className="border m-1 p-1 rounded"
            type="text"
            name="name"
            placeholder="name"
            onChange={(e) => handleInputChange(e)}
          />
          <input
            className="border m-1 p-1 rounded"
            type="text"
            name="email"
            placeholder="email"
            onChange={(e) => handleInputChange(e)}
          />
          <input
            className="border m-1 p-2 rounded bg-black text-white hover:cursor-pointer"
            type="submit"
            value="create user"
          />
        </form>
      )}
      {!!userId &&
        !!users?.data?.length &&
        users?.data?.map((user, key) => (
          <div key={key} className="border m-2 p-2">
            <p>
              <strong>name: </strong>
              {user.name}
            </p>
            <p>
              <strong>email:</strong> {user.email}
            </p>
          </div>
        ))}
    </div>
  )
}

export default Home

import { trpc } from '@/utils/trpc'
import { useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useState } from 'react'

const Home = () => {
  const post = trpc.createPost.useMutation()
  const posts = trpc.getMyPosts.useQuery()

  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const inputName = e.target.name
    if (inputName === 'title') {
      setTitle(e.target.value)
    } else if (inputName === 'content') {
      setContent(e.target.value)
    }
  }

  const createUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title.length && content.length) {
      try {
        const res = post.mutate({ title, content })
      } catch (e) {
        console.log(e, 'error')
      }
    } else {
      alert('empty fields')
    }
  }

  const { userId } = useAuth()

  if (!posts.data) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }
  return (
    <div className="p-4">
      <div className="m-1 mb-5">
        <Link className="border rounded font-bold  p-2" href="/">
          {'< Index'}
        </Link>
      </div>

      {!!userId && (
        <form onSubmit={(e) => createUser(e)}>
          <input
            className="border m-1 p-1 rounded"
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => handleInputChange(e)}
          />
          <input
            className="border m-1 p-1 rounded"
            type="text"
            name="content"
            placeholder="Content"
            onChange={(e) => handleInputChange(e)}
          />
          <input
            className="border m-1 p-2 rounded bg-black text-white hover:cursor-pointer"
            type="submit"
            value="Create Post"
          />
        </form>
      )}
      {!!userId &&
        !!posts?.data?.length &&
        posts?.data?.map((post, key) => (
          <div key={key} className="border m-2 p-2">
            <p>
              <strong>Title: </strong>
              {post.title}
            </p>
            <p>
              <strong>Content:</strong> {post.content}
            </p>
          </div>
        ))}
    </div>
  )
}

export default Home

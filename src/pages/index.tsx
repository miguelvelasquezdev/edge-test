import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function Home() {
  const hello = trpc.hello.useQuery({ text: "client" });
  const user = trpc.createUser.useMutation();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleInputChange = (e) => {
    e.preventDefault();
    const inputName = e.target.name;
    if (inputName === "name") {
      setName(e.target.value);
    } else if (inputName === "email") {
      setEmail(e.target.value);
    }
  };

  const createUser = (e) => {
    e.preventDefault();
    if (name.length && email.length) {
      try {
        const res = user.mutate({ name, email });
        console.log(res);
      } catch (e) {
        console.log(e, "error");
      }
    } else {
      alert("empty fields");
    }
  };

  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
      <form onSubmit={(e) => createUser(e)}>
        <input type='text' name='name' placeholder='name' onChange={(e) => handleInputChange(e)} />
        <input type='text' name='email' placeholder='email' onChange={(e) => handleInputChange(e)} />
        <input type='submit' value='create user' />
      </form>
    </div>
  );
}

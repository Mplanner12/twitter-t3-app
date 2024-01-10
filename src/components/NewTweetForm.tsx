import React, {
  FormEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Button } from "./Button";
import { ProfileImage } from "./ProfileImage";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

function updateTextareaSize(textarea?: HTMLTextAreaElement) {
  if (textarea == null) return;
  textarea.style.height = "0";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

const NewTweetForm = () => {
  const session = useSession();
  if (session.status !== "authenticated") return null;
  return <Form />;
};

function Form() {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const inputRef = useCallback((textarea: HTMLTextAreaElement) => {
    updateTextareaSize(textarea);
  }, []);

  useLayoutEffect(() => {
    updateTextareaSize(textAreaRef.current);
  }, [inputValue]);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      console.log(newTweet);
      setInputValue("");
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    createTweet.mutate({ content: inputValue });
  }

  if (session.status !== "authenticated") return;
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b px-4 py-2"
    >
      <div className="flex gap-4">
        <ProfileImage src={session.data.user.image} />
        <textarea
          ref={inputRef}
          style={{ height: 4 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
          placeholder="What's happening?"
        ></textarea>
      </div>
      <Button className="self-end">Tweet</Button>
    </form>
  );
}

export default NewTweetForm;
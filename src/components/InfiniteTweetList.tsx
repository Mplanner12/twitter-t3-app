import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileImage } from "./ProfileImage";
import { useSession } from "next-auth/react";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: { id: string; image: string | null; name: string | null };
};

type infiniteTweetsListProp = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  fetchNextTweets: () => Promise<unknown>;
  tweets?: Tweet[];
};

export const InfiniteTweetList = ({
  tweets,
  isError,
  isLoading,
  hasMore,
  fetchNextTweets,
}: infiniteTweetsListProp) => {
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;
  if (tweets == null) return null;

  if (tweets == null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500 ">No Tweets</h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNextTweets}
        hasMore={hasMore}
        loader={"Loading..."}
      >
        {tweets.map((tweet) => {
          return <TweetCard key={tweet.id} {...tweet}></TweetCard>;
        })}
      </InfiniteScroll>
    </ul>
  );
};

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

function TweetCard({
  id,
  user,
  content,
  createdAt,
  likeCount,
  likedByMe,
}: Tweet) {
  return (
    <li className="flex gap-4 border-4 px-4 py-4">
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${user.id}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {user.name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateTimeFormatter.format(createdAt)}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        {/* <HeartButton/> */}
      </div>
    </li>
  );
}

type HeartButtonProps = {
  likedByMe: boolean;
};

function HeartButton({ likedByMe }: HeartButtonProps) {
  const session = useSession();
  const HeartIcon = likedByMe;

  if (session.status !== "authenticated") {
    <div className="my-1 flex items-center gap-3 self-start text-gray-500">
      {/* <HeartIcon/> */}
    </div>;
  }
}

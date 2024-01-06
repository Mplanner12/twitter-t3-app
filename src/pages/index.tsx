import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { api } from "~/utils/api";
import NewTweetForm from "~/components/NewTweetForm";
import { NextPage } from "next";
import { InfiniteTweetList } from "~/components/InfiniteTweetList";

const Home: NextPage = () => {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-2 text-lg font-bold">Home</h1>
      </header>
      <NewTweetForm />
    </>
  );
};

function RecentTwet() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
  return (
    <InfiniteTweetList
      tweet={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasmore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}

export default Home;

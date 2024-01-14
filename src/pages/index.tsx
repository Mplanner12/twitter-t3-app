import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { api } from "~/utils/api";
import NewTweetForm from "~/components/NewTweetForm";
import { NextPage } from "next";
import { InfiniteTweetList } from "~/components/InfiniteTweetList";
import { useState } from "react";

const TABS = ["Recent", "following"] as const;

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Recent");
  const session = useSession();
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-2 text-lg font-bold">Home</h1>
        {session.status === "authenticated" && (
          <div className="flex">
            {TABS.map((tab) => {
              return (
                <button
                  onClick={() => setSelectedTab(tab)}
                  key={tab}
                  className={`flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200 ${
                    tab === selectedTab
                      ? "border-b-4 border-blue-500 font-bold"
                      : ""
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        )}
      </header>
      <NewTweetForm />
      {selectedTab === "Recent" ? <RecentTwet /> : <FollowingTweet />}
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
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={!!tweets.hasNextPage}
      fetchNextTweets={tweets.fetchNextPage}
    />
  );
}

function FollowingTweet() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    { onlyFollowing: true },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={!!tweets.hasNextPage}
      fetchNextTweets={tweets.fetchNextPage}
    />
  );
}

export default Home;

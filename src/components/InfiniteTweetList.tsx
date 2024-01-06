import React from "react";

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
  hasmore: boolean;
  fetchNextTweets: () => Promise<unknown>;
  tweets?: Tweet[];
};

export const InfiniteTweetList = ({
  tweets,
  isError,
  isLoading,
  hasmore,
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

  return <ul></ul>;
};

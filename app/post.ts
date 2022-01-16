export type Post = {
  slug: string;
  title: string;
};

export function getPosts(): Post[] {
  return [
    {
      slug: "my-first-post",
      title: "My First Post",
    },
    {
      slug: "90s-mix-tape",
      title: "A Mixtape I Made Just For You",
    },
  ];
};

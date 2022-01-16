import parseFrontMatter from "front-matter";
import fs from "fs/promises";
import path from "path";
import invariant from "tiny-invariant";

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

const postsPath = path.join(__dirname, "..", "posts");

function isValidPostAttributes(attributes: any): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPosts(): Promise<Post[]> {
  const files = await fs.readdir(postsPath);
  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(postsPath, file);
      const data = await fs.readFile(filePath);
      const { attributes } = parseFrontMatter(data.toString());
      invariant(isValidPostAttributes(attributes), `${file} has bad meta data!`);
      return {
        slug: file.replace(/\.md$/, ""),
        title: attributes.title,
      };
    })
  );
}

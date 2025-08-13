// import "../style.css"
import BlogList from "./BlogList";
import BestPick from "./BestPick";
import Hero from "./Hero";
import { useState, useEffect } from "react";

export default function HomeLayout({ tagLine, companyName, customeRoute }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    fetch(customeRoute ? customeRoute : '/api/blog-posts')
      .then((res) => res.json())
      .then(data => setPosts(data))
      .then(setLoading(false))
  }, []);

  console.log(posts);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start lg:p-24 p-2 pt-12 max-w-360 mx-auto">
      <Hero tagLine={tagLine} companyName={companyName}/>
      <BestPick post={posts[0]}/>
      { isLoading && <h1 className="mt-20 text-3xl"> Loading ... </h1>}
      { !isLoading && <BlogList posts={posts}/> }
    </main>
  );
}
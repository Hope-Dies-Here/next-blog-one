"use client";
import { useParams } from "next/navigation";
import DetailBlog from "../../components/DetailBlog";
import { useEffect, useState } from "react";
import "../../styles/blog-globals.css";
import blogs from "../../components/data/data";
export default function BlogPage() {
  const { id } = useParams();
  // const id = Number(useParams().id);
  const [post, setPost] = useState(null);
  const params = useParams();
  useEffect(() => {
    fetch(`/api/blog-posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .then((post) => {
        if (!post) {
          blogs
            .filter((blog) => blog.id == id)
            .map((blog) => {
              setPost(blog);
            });
        }
      });
  }, []);
  // filter array based on the params comparing with id
  if (!post && params.id != "Create")
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <p className="text-white">Loading...</p>
      </div>
    );

  return <>{post && <DetailBlog blog={post} />}</>;
}

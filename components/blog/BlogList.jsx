import Blog from "./Blog";
import blogs from "../components/data/data"
export default function BlogList({ posts }) {
  console.log(blogs);
  return (
    <div className="md:w-[80%] w-[90%] mt-20 sm:px-15 px-2">
      <div className="flex items-center justify-between py-2">
        <h1 className="sm:text-4xl text-xl font-semibold">Latest Blogs</h1>
        <button className="px-4 sm:py-2 py-1 sm:text-xl text-md bg-white text-purple-900 hover:text-white rounded-md hover:bg-purple-800 transition-all duration-200">
          View All
        </button>
      </div>
      <div className="mt-10 space-y-8">
        
        {posts.length == 0 ? blogs.map((post, index) => (
          <Blog key={index} post={post} />
        )) : posts.map((post, index) => (
          <Blog key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

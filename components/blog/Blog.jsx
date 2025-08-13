import Image from "next/image";
import Link from "next/link";
export default function BlogList({ post }) {
    
    return (
        <div className="grid grid-cols-3 sm:gap-12 gap-4 border-b pb-6">
        <Image
          src={post.image || "/gta6.png"}
          alt="Blog Image"
          width={300}
          height={150}
          className="w-full sm:h-48 h-30 object-cover rounded-lg"
        />
        <div className="col-span-2  ">
          <Link href={`/blog/${post.id}`} className="sm:text-3xl text-lg font-bold hover:text-purple-300">{post.title}</Link>
          <p className="text-gray-300 mt-2 sm:text-lg text-xs">
            {post.content}
          </p>
        </div>
      </div>
    )
}
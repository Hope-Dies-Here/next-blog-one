import Image from "next/image";

export default function BestPick() {
    return (
         <div className="md:flex grid place-items-center sm:gap-12 gap-4 sm:px-12 px-4 py-6 sm:py-12 sm:w-[80%] w-[90%] sm:mt-20 mt-10 home-page-box relative">
        <div className="absolute -top-10 sm:right-10 bg-white shadow-lg ">
          <p className="text-purple-900 sm:w-120 w-60  sm:py-4 py-2 sm:text-3xl text-xl text-center font-bold ">Todays Best Pick </p>
        </div>
        <Image
          src="/gta6.png"
          alt="Ethiopian Gamers Association Logo"
          width={280}
          height={220}
          className="h-100 object-cover"
        />
        <div className="grid gap-4 pt-6">
          <h1 className="sm:text-4xl text-2xl font-semibold">Amazing GTA IV Features</h1>
          <p className="sm:text-xl text-md text-start">
            A blog website is a type of website that is updated regularly with
            new content, typically in the form of individual articles called
            blog posts. These posts are usually presented in reverse
            chronological order, meaning the most recent content appears first
            at the top of the page. While all blogs are websites, not all typically in the form of individual articles called
            blog posts.
          </p>
          <div className="h-10 mt-2">
            <button className="px-4 py-1 sm:text-xl text-md hover:bg-purple-800 hover:cursor-pointer hover:text-white transition-all duration-200 rounded-sm bg-white w-fit text-purple-900">
              Read More
            </button>
          </div>
        </div>
      </div>
    )
}
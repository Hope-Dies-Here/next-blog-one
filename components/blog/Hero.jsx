import Image from "next/image";

export default function HeroLayout({ companyName, tagLine }) {
    return (
          <div className="min-h-120 sm:py-15 py-4 text-center">
            
              <h1 className="sm:text-8xl text-6xl font-bold">
                <span className="text-primary">{companyName}</span>
              </h1>
            <div className="py-4 border-t-orange-50 flex items-center justify-between gap-4 sm:mt-20 mt-15 sm:w-fit w-90 mx-auto ">
                <div className="flex items-center justify-center">
                  <Image
                    src="/stick.png"
                    alt="Ethiopian Gamers Association Logo"
                    width={100}
                    height={100}
                    className=" border sm:w-20 rotate-10 w-15 object-cover "
                  />
                </div>
                <div className="text-center ">
                  <p className="sm:text-2xl text-xl font-bold">{companyName}</p>
                  <p className="sm:text-lg text-sm">{tagLine}</p>
                </div>
                <div className="flex items-center justify-center">
                  <Image
                    src="/stick.png"
                    alt="Ethiopian Gamers Association Logo"
                    width={100}
                    height={100}
                    className="w-15 sm:w-20 -rotate-10 object-cover "
                  />
                </div>
              </div>
        </div>
    )
}
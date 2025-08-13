'use client';
import HomeLayout from "../components/HomeLayout";
// import input.css
import "../styles/blog-globals.css";

export default function Home() {

  return (
    <HomeLayout 
      companyName={"Blog - Ethiopian Gamers Association"}
      tagLine={"Connecting Gamers Across Ethiopia"}
    />
  );
}

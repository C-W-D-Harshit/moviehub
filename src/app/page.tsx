import Image from "next/image";
import "@/styles/home.scss";
import { IconButton } from "@radix-ui/themes";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Dome from "../components/home/Home";
import Holder from "@/components/home/Holder";
import { Suspense } from "react";

async function getData(link: string) {
  const headers = new Headers();
  headers.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTI2MzA4MWIxNGJlMDk5ZDk1OTZhYWUxZmRmYTI4MyIsInN1YiI6IjY0ZDllNmNkYmYzMWYyMDFjY2JmZTJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h2ElGqXnJHgfE4XA-CG49MnptCjFrI6_vOFDTAgErlQ"
  );
  headers.append("accept", "application/json");
  const res = await fetch(link, {
    headers,
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  return res.json();
}

const Carousel = async () => {
  const data = await getData(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
  );
  return <Dome data={data} />;
};

export default async function Home() {
  const data1 = await getData(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
  );
  const data2 = await getData(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  );
  const data3 = await getData(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
  );
  const data4 = await getData(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
  );

  return (
    <main className="home">
      <Suspense fallback={<div style={{ height: "100vh" }} />}>
        <Carousel />
      </Suspense>
      <Holder data={data1} title={"Now Playing"} />
      <Holder data={data2} title={"Popular"} />
      <Holder data={data3} title={"Top Rated"} />
      <Holder data={data4} title={"Upcoming"} />
    </main>
  );
}

export const revalidate = 36;

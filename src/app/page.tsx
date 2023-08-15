import Image from "next/image";
import "@/styles/home.scss";
import { IconButton } from "@radix-ui/themes";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Dome from "../components/home/Home";

async function getData() {
  const headers = new Headers();
  headers.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTI2MzA4MWIxNGJlMDk5ZDk1OTZhYWUxZmRmYTI4MyIsInN1YiI6IjY0ZDllNmNkYmYzMWYyMDFjY2JmZTJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h2ElGqXnJHgfE4XA-CG49MnptCjFrI6_vOFDTAgErlQ"
  );
  headers.append("accept", "application/json");
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers,
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  return res.json();
}

export default async function Home() {
  const data = await getData();
  if (!data) {
    return;
  }

  let num: number = 0;

  return (
    <main className="home">
      <Dome data={data} />
    </main>
  );
}

export const revalidate = 36;

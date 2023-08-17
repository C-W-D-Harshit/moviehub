import Holder from "@/components/home/Holder";

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

const page = async () => {
  const data1 = await getData(
    "https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1"
  );
  const data2 = await getData(
    "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1"
  );
  const data3 = await getData(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
  );
  const data4 = await getData(
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1"
  );
  return (
    <main className="home">
      <Holder data={data1} title={"Airing Today"} />
      <Holder data={data2} title={"On The Air"} />
      <Holder data={data3} title={"Popular"} />
      <Holder data={data4} title={"Top Rated"} />
    </main>
  );
};

export default page;

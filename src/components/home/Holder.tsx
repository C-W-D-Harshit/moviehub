import "@/styles/holder.scss";
import Image from "next/image";
import Link from "next/link";

const Holder = ({ data, title }: { data: any; title: string }) => {
  return (
    <div className="margin d_hold">
      <div>
        <p>{title}</p>
        <Link href="/">
          <p>See More</p>
        </Link>
      </div>
      <div className="d_holder">
        {data?.results.map((m: any) => {
          return (
            <div key={m.id} className="d_cont">
              <Link href={`/`}>
                <Image
                  src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
                  alt={m.title}
                  width={300}
                  height={400}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Holder;

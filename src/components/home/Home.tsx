"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { Avatar, Flex, Separator } from "@radix-ui/themes";

const Dome = ({ data }: { data: any }) => {
  const [page, setPage] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getCast();
    // Change isActive to false every 2 seconds
    const interval = setInterval(() => {
      setIsActive(false);
    }, 700);

    const i1 = setInterval(() => {
      if (page < data?.results.length - 1) {
        setIsActive(true);
        setPage(page + 1);
      } else {
        setPage(0);
      }
    }, 12000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
      clearInterval(i1);
    };
  }, [page]);
  const left = async () => {
    if (page > 0) {
      setIsActive(true);
      await new Promise((resolve) => setTimeout(resolve, 0));
      setPage(page - 1);
    }
  };
  const right = async () => {
    if (page < data?.results.length - 1) {
      setIsActive(true);
      await new Promise((resolve) => setTimeout(resolve, 0));
      setPage(page + 1);
    } else {
      setPage(0);
    }
  };
  const getCast = async () => {
    const id = data.results[page].id;
    const headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTI2MzA4MWIxNGJlMDk5ZDk1OTZhYWUxZmRmYTI4MyIsInN1YiI6IjY0ZDllNmNkYmYzMWYyMDFjY2JmZTJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h2ElGqXnJHgfE4XA-CG49MnptCjFrI6_vOFDTAgErlQ"
    );
    headers.append("accept", "application/json");

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      {
        headers,
      }
    );
    const dat = await res.json();
    setCast(dat.cast);
  };
  if (cast.length === 0) {
    return;
  }
  return (
    <div className="home_1">
      <div className="home_1_img">
        <Image
          src={`https://image.tmdb.org/t/p/original${data.results[page].backdrop_path}`}
          alt="name"
          width={1920}
          height={1080}
          quality={100}
        />
        <div className={isActive ? "overlay actImg" : "overlay"} />
      </div>

      <div className="margin home_1_mid">
        <div>
          <p>Whats on</p>
          <p style={{ marginBottom: "1rem" }}>the screen?</p>
          <Flex align="center">
            <Avatar
              size="4"
              fallback={`${page + 1}`}
              radius="full"
              highContrast
            />
            <p>/</p>
            <Avatar
              size="4"
              fallback={`${data?.results.length}`}
              radius="full"
              highContrast
            />
          </Flex>
        </div>
        <div>
          <p>{data.results[page].title}</p>
          <p>{data.results[page].overview}</p>
        </div>
      </div>
      <div className="margin home_1_bottom">
        <div className="home_1_arrows">
          <button
            onClick={left}
            style={{ borderColor: page > 0 ? "#919191" : "" }}
            disabled={page === 0}
          >
            <BsArrowLeft />
          </button>
          <button
            onClick={right}
            style={{
              borderColor: page < data?.results.length - 1 ? "#919191" : "",
            }}
            disabled={page === 19}
          >
            <BsArrowRight />
          </button>
        </div>
        <div className="home_1_actors">
          <p>
            Actors <span style={{ color: "#919191" }}>({cast.length})</span>
          </p>
          <div>
            {cast.slice(0, 3).map((cas: any, index) => (
              <Avatar
                key={index}
                src={`https://image.tmdb.org/t/p/original${cas.profile_path}`}
                fallback={cas.name.charAt(0)}
                radius="full"
                size="4"
              />
            ))}
            <Avatar size="4" fallback={`+${cast.length - 3}`} radius="full" />
          </div>
        </div>
        <div className="home_1_arrows" id="gd">
          <button>
            <p style={{ fontSize: "2rem" }}>Details</p>
          </button>
          <div>
            <p style={{ fontSize: "2rem" }}>Scroll</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dome;

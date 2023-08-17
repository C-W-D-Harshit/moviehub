"use client";
import {
  Avatar,
  Button,
  DropdownMenu,
  Flex,
  Separator,
  TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "@/styles/header.scss";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [sea, setSea] = useState([]);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      // Change this threshold as needed
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // console.log(scrolled);
  const search = async (e: any) => {
    setQuery(e.target.value);
    const headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTI2MzA4MWIxNGJlMDk5ZDk1OTZhYWUxZmRmYTI4MyIsInN1YiI6IjY0ZDllNmNkYmYzMWYyMDFjY2JmZTJlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h2ElGqXnJHgfE4XA-CG49MnptCjFrI6_vOFDTAgErlQ"
    );
    headers.append("accept", "application/json");

    if (query.length > 1) {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&sortby=popularity&page=1`,
        {
          headers,
        }
      );
      const dat = await res.json();

      setSea(dat.results);
    }

    if (query.length < 1) {
      setSea([]);
    }
  };
  return (
    <div className={scrolled ? "margin header headscroll" : "margin header"}>
      <Link href={"/"} className="header__logo">
        <p>
          Movie<span>hub</span>
        </p>
      </Link>
      <div className="header__menu">
        <Link href="/movies">
          <p>Movies</p>
        </Link>
        <Link href="/tv">
          <p>TV Shows</p>
        </Link>
        <Link href="/">
          <p>Cinemas</p>
        </Link>
        <Link href="/">
          <p>Membership</p>
        </Link>
      </div>
      <div className="header__user">
        <div className="header__search">
          <TextField.Root color="red" size="3">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder="Search…" onChange={search} />
          </TextField.Root>
          <TextField.Root
            color="red"
            size="3"
            className="search_"
            style={{ display: query.length > 2 ? "block" : "none" }}
          >
            {sea.map((s: any) => {
              return (
                <>
                  <p key={s.id}>{s.title}</p>
                  <div
                    className="divider"
                    style={{ marginBottom: "1rem", marginTop: "1rem" }}
                  />
                </>
              );
            })}
          </TextField.Root>
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Flex gap="2">
              <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="S"
              />
            </Flex>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>Account</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item color="red">Logout</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <AiOutlineMenu className="mob_o" />
    </div>
  );
};

export default Header;

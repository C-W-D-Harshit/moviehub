"use client";

import { TextField } from "@radix-ui/themes";
import React from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Search = () => {
  return (
    <TextField.Root color="red" size="3">
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
      <TextField.Input placeholder="Search…" />
    </TextField.Root>
  );
};

export default Search;

"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    
  };
  // const handleClick = () => {
  //   setCount((prev) => prev + 1);
  //   setCount((prev) => prev + 1);
  // };

  useEffect(() => {
    console.log("count: ", count);
  }, [count]);

  return (
    <>
      <h1 onClick={handleClick}>{count}</h1>
    </>
  );
}

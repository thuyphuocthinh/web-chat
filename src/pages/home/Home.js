import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import ChatInfo from "./ChatInfo";

export default function Home() {
  const [height, setHeight] = useState(window.innerHeight);
  return (
    <div className="grid grid-cols-12 home-container" style={{ height: height }}>
      <div className="hidden md:block md:col-span-4 lg:col-span-3">
        <ChatList />
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-6">
        <ChatBox />
      </div>
      <div className="lg:block hidden lg:col-span-3">
        <ChatInfo />
      </div>
    </div>
  );
}

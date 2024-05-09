import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import ChatInfo from "./ChatInfo";

export default function Home() {
  const [height, setHeight] = useState(window.innerHeight);
  return (
    <div className="grid grid-cols-12 home-container" style={{ height: height }}>
      <div className="col-span-3">
        <ChatList />
      </div>
      <div className="col-span-6">
        <ChatBox />
      </div>
      <div className="col-span-3">
        <ChatInfo />
      </div>
    </div>
  );
}

import React from "react";

export default function ChatInfo() {
  return (
    <div className="chatInfo">
      {/* ChatInfoHeader */}
      <div className="chatInfo-header">
        <img src={require("../../assets/img/avatar.png")} alt="avatar" />
        <div>
          <h3>Tran Phuoc Quan</h3>
          <p>Active 50m ago</p>
        </div>
      </div>
      {/* ChatInfoBody */}
      <div className="chatInfo-body my-4">
        <div>
          <p>Customize Chat</p>
          <span>
            <img
              src={require("../../assets/img/arrowDown.png")}
              alt="arrowDown-png"
            />
          </span>
        </div>
        <div>
          <p>Media & files</p>
          <span>
            <img
              src={require("../../assets/img/arrowDown.png")}
              alt="arrowDown-png"
            />
          </span>
        </div>
        <div>
          <p>Privacy & Support</p>
          <span>
            <img
              src={require("../../assets/img/arrowDown.png")}
              alt="arrowDown-png"
            />
          </span>
        </div>
      </div>
      {/* ChatInfoFooter */}
      <div className="chatInfo-footer">
        <button>Block</button>
      </div>
    </div>
  );
}

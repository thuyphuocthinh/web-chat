import React, { useState } from "react";

export default function ChatList() {
  const [isAddIcon, setIsAddIcon] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  return (
    <div className="chatList">
      {/* ChatListHeader */}
      <div className="chatList-header flex justify-between">
        <h2 className="text-2xl">Chats</h2>
        <span
          onClick={() => {
            setIsAddIcon(!isAddIcon);
            setShowAdd(!showAdd);
          }}
        >
          <img
            src={
              isAddIcon
                ? require("../../assets/img/plus.png")
                : require("../../assets/img/minus.png")
            }
            alt="plus-icon"
          />
        </span>
      </div>
      <div className="chatList-search my-4">
        <input
          type="text"
          autoComplete="false"
          placeholder="Search Messages..."
          name="keyword"
        />
        <img src={require("../../assets/img/search.png")} alt="search-icon" />
      </div>
      {/* ChatList */}
      <div className="chatList-main mb-4">
        <div className="chatList-item">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div className="chatList-info">
            <h3>Thuy Phuoc Thinh</h3>
            <p>Lorem Lorem Lorem Lorem Lorem</p>
          </div>
        </div>
        <div className="chatList-item">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div className="chatList-info">
            <h3>Thuy Phuoc Thinh</h3>
            <p>Lorem Lorem Lorem Lorem Lorem</p>
          </div>
        </div>
        <div className="chatList-item">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div className="chatList-info">
            <h3>Thuy Phuoc Thinh</h3>
            <p>Lorem Lorem Lorem Lorem Lorem</p>
          </div>
        </div>
        <div className="chatList-item">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div className="chatList-info">
            <h3>Thuy Phuoc Thinh</h3>
            <p>Lorem Lorem Lorem Lorem Lorem</p>
          </div>
        </div>
        <div className="chatList-item">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div className="chatList-info">
            <h3>Thuy Phuoc Thinh</h3>
            <p>Lorem Lorem Lorem Lorem Lorem</p>
          </div>
        </div>
        <div className="chatList-item">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div className="chatList-info">
            <h3>Thuy Phuoc Thinh</h3>
            <p>Lorem Lorem Lorem Lorem Lorem</p>
          </div>
        </div>
        <div className="chatList-item">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div className="chatList-info">
            <h3>Thuy Phuoc Thinh</h3>
            <p>Lorem Lorem Lorem Lorem Lorem</p>
          </div>
        </div>
        <div className="chatList-item">
          <img src={require("../../assets/img/avatar.png")} alt="avatar" />
          <div className="chatList-info">
            <h3>Thuy Phuoc Thinh</h3>
            <p>Lorem Lorem Lorem Lorem Lorem</p>
          </div>
        </div>
      </div>
      {/* ChatListFooter */}
      <div className="chatList-footer">
        <button>Logout</button>
      </div>
      {/* Add User Form */}
      {showAdd && (
        <div className="chatList-add">
          <h2 className="text-center mb-4 text-xl">Add New User</h2>
          <div className="chatList-addUser">
            <input
              type="text"
              autoComplete="false"
              placeholder="Search Messages..."
              name="keyword"
            />
            <img
              src={require("../../assets/img/search.png")}
              alt="search-icon"
            />
          </div>
          <div className="chatList-addResult">
            <h3 className="text-center my-4">Results</h3>
          </div>
        </div>
      )}
    </div>
  );
}

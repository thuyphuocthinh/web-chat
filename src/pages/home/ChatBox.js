import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../libs/firebase";
import EmojiPicker from "emoji-picker-react";
import upload from "../../libs/upload";

export default function ChatBox() {
  const autoScrollRef = useRef(null);
  const { chatId, user } = useSelector((state) => state.ChatReducer);
  const { currentUser } = useSelector((state) => state.UserReducer);
  const [chat, setChat] = useState([]);
  const [text, setText] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const [showLoadingImg, setShowLoadingImg] = useState(false);
  useEffect(() => {
    if (autoScrollRef.current) {
      autoScrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (!chatId) return;

    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImg({
        file: file,
        url: imgUrl,
      });
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const handleEmoji = (e) => {
    const { emoji } = e;
    setText((prev) => prev + emoji);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      setShowLoadingImg(true);
      if (text === "" || img.file) {
        let imgUrl = null;
        if (img.file) {
          imgUrl = await upload(img.file);
        }

        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            senderId: currentUser.id,
            text,
            createdAt: new Date(),
            ...(imgUrl && { img: imgUrl }),
          }),
        });

        const userIds = [currentUser.id, user.id];
        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "userChats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data();

            const chatIndex = userChatsData.chats.findIndex(
              (c) => c.chatId === chatId
            );

            userChatsData.chats[chatIndex].lastMessage = text;
            userChatsData.chats[chatIndex].isSeen =
              id === currentUser.id ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setText("");
      setImg({
        file: null,
        url: "",
      });
      setShowLoadingImg(false);
    }
  };

  const renderChat = () => {
    return chat.messages?.map((message) => {
      return (
        <div
          className={`chat ${
            message.senderId === currentUser.id
              ? "chatBox-sender"
              : "chatBox-receiver"
          }`}
          key={message.createdAt}
        >
          {message.senderId === currentUser.id ? (
            message.text === "" ? (
              ""
            ) : (
              <p className="chat-content">{message.text}</p>
            )
          ) : (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatar || require("../../assets/img/avatar.png")}
                  alt="avatar"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <div className="flex flex-col gap-2">
                  {message.text === "" ? (
                    ""
                  ) : (
                    <p className="chat-content">{message.text}</p>
                  )}

                  <div className="chat-img">
                    <img
                      src={message.img}
                      alt={message.img}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {message.senderId === currentUser.id ? (
            <div className="chat-img">
              <img src={message.img} alt={message.img} className="w-full" />
            </div>
          ) : (
            ""
          )}
        </div>
      );
    });
  };

  return (
    <div className="chatBox">
      {/* ChatBoxHeader */}
      <div className="chatBox-header">
        <div className="chatBox-info">
          <img
            src={user?.avatar || require("../../assets/img/avatar.png")}
            alt="avatar"
          />
          <div>
            <h3>{user?.username}</h3>
          </div>
        </div>
        <div className="chatBox-call">
          <span>
            <img
              src={require("../../assets/img/camera.png")}
              alt="camera-icon"
            />
          </span>
          <span>
            <img src={require("../../assets/img/phone.png")} alt="phone-icon" />
          </span>
          <span>
            <img src={require("../../assets/img/info.png")} alt="info-icon" />
          </span>
        </div>
      </div>
      {/* ChatBox */}
      <div className="chatBox-main my-4">
        {renderChat()}

        {showLoadingImg ? (
          <div className="chat chatBox-sender">
            <div className="chat-img">
              <img
                src={require("../../assets/img/Loading.gif")}
                className="w-full"
              />
            </div>
          </div>
        ) : (
          ""
        )}

        <div ref={autoScrollRef}></div>
      </div>

      {/* ChatBoxInput */}
      <div className="chatBox-input">
        <div>
          <label htmlFor="img">
            <img src={require("../../assets/img/img.png")} alt="img" />
          </label>
          <input
            type="file"
            id="img"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <div className="relative">
            <img
              src={require("../../assets/img/emoji.png")}
              alt="emoji"
              onClick={() => setOpenEmoji(!openEmoji)}
            />
            <div className="emoji">
              <EmojiPicker open={openEmoji} onEmojiClick={handleEmoji} />
            </div>
          </div>
          <img src={require("../../assets/img/mic.png")} alt="mic" />
        </div>
        <div>
          <form onSubmit={handleSend}>
            <input
              type="text"
              autoComplete="false"
              placeholder="Type messages..."
              name="message"
              value={text}
              onChange={handleChange}
            />
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

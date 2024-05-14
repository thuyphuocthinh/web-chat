import React, { useEffect, useState } from "react";
import { auth, db } from "../../libs/firebase";
import { USER_TOKEN } from "../../settings/system";
import { useDispatch } from "react-redux";
import { LOG_OUT } from "../../redux/actionTypes/UserTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { changeChatAction } from "../../redux/actions/ChatActions";

export default function ChatList(props) {
  const { currentUser } = props;
  const [isAddIcon, setIsAddIcon] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [chats, setChats] = useState([]);
  const [userSearch, setUserSearch] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.id || !db) {
      console.error("Current user or database reference is not available.");
      return;
    }

    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        // for each chat in the result, fetch the receiver information
        const items = res.data().chats;

        // we create promise all to ensure that all chats appear at the same time
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          // each chat is now added the receiver information
          return { ...item, user };
        });

        // wait all promises execute in parallel
        const chatData = await Promise.all(promises);

        // sort by time to ensure that the latest message is on top
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((chat) => {
      const { user, ...rest } = chat;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;
    const usersChatRef = doc(db, "userChats", currentUser.id);

    try {
      await updateDoc(usersChatRef, {
        chats: userChats,
      });
      dispatch(changeChatAction(chat.chatId, currentUser, chat.user));
    } catch (error) {
      console.log(error);
    }
  };

  const renderChatList = () => {
    return chats.map((chat, index) => {
      return (
        <div
          className="chatList-item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{ backgroundColor: chat.isSeen ? "transparent" : "black" }}
        >
          <img
            src={chat.user.avatar || require("../../assets/img/avatar.png")}
            alt="avatar"
          />
          <div className="chatList-info">
            <h3>{chat.user.username}</h3>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      );
    });
  };

  const handleSearchUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);
      console.log(querySnapShot);
      if (!querySnapShot.empty) {
        setUserSearch(querySnapShot.docs[0].data());
      } else {
        setUserSearch(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    try {
      // get the reference to the collection
      const chatRef = collection(db, "chats");
      const userChatsRef = collection(db, "userChats");

      // get the reference to the document of a collection
      // if the reference to the new document, an unique id is returned
      const newChatRef = doc(chatRef);

      // add the new document to the collection
      // the document does not exist, it will be added to the collection
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // update document

      await updateDoc(doc(userChatsRef, userSearch.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      // update document
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: userSearch.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatList">
      {/* ChatListHeader */}
      <div className="chatList-header flex justify-between">
        <div className="chatList-header__info flex items-center gap-2 font-bold">
          <img src={currentUser?.avatar} alt="avatar" />
          <p>{currentUser?.username}</p>
        </div>
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
      <div className="chatList-main mb-4">{renderChatList()}</div>
      {/* ChatListFooter */}
      <div className="chatList-footer">
        <button
          onClick={() => {
            auth.signOut();
            localStorage.removeItem(USER_TOKEN);
            dispatch({
              type: LOG_OUT,
            });
            navigate("/login");
            toast.success("Logout successfully");
          }}
        >
          Logout
        </button>
      </div>
      {/* Add User Form */}
      {showAdd && (
        <div className="chatList-add">
          <h2 className="text-center mb-4 text-xl">Add New User</h2>
          <div className="chatList-addUser">
            <form onSubmit={handleSearchUser}>
              <input
                type="text"
                autoComplete="false"
                placeholder="Search User..."
                name="username"
              />
              <button type="submit" className="bg-gray-500">
                <img
                  src={require("../../assets/img/search.png")}
                  alt="search-icon"
                />
              </button>
            </form>
          </div>
          <div className="chatList-addResult">
            <h3 className="text-center my-4">Results</h3>
            {userSearch ? (
              <div className="chatList-addResult__item">
                <div>
                  <img
                    src={
                      userSearch.avatar ||
                      require("../../assets/img/avatar.png")
                    }
                    alt="avatar"
                  />
                  <span> {userSearch.username}</span>
                </div>
                <button onClick={handleAddUser}>Add User</button>
              </div>
            ) : (
              <p className="text-center">No user found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

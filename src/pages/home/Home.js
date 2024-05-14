import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import ChatInfo from "./ChatInfo";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../libs/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfoAction } from "../../redux/actions/UserActions";
import { USER_TOKEN } from "../../settings/system";

export default function Home() {
  const [height, setHeight] = useState(window.innerHeight);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const { currentUser, isLoggedIn } = useSelector((state) => state.UserReducer);


  useEffect(() => {
    if (isLoggedIn) {
      const unSub = onAuthStateChanged(auth, (user) => {
        dispatch(fetchUserInfoAction(user?.uid));
        if (user) {
          localStorage.setItem(USER_TOKEN, user?.accessToken);
        }
      });
      return () => {
        unSub();
      };
    }
  }, []);

  if (isLoading)
    return (
      <>
        <div className="loadingGif">
          <img
            src={require("../../assets/img/Loading.gif")}
            alt="loading gif"
          />
        </div>
      </>
    );

  return (
    <div
      className="grid grid-cols-12 home-container"
      style={{ height: height }}
    >
      <div className="hidden md:block md:col-span-4 lg:col-span-3">
        <ChatList currentUser={currentUser} />
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-6">
        <ChatBox currentUser={currentUser} />
      </div>
      <div className="lg:block hidden lg:col-span-3">
        <ChatInfo currentUser={currentUser} />
      </div>
    </div>
  );
}

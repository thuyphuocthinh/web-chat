import { doc, getDoc } from "firebase/firestore";
import { SET_USER_INFO } from "../actionTypes/UserTypes";
import { db } from "../../libs/firebase";
import { hideLoadingAction } from "./LoadingActions";

export const fetchUserInfoAction = (uid) => {
  return async (dispatch) => {
    if (!uid) return;
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch({
          type: SET_USER_INFO,
          payload: docSnap.data(),
        });
        dispatch(hideLoadingAction());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

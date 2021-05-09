import { useEffect } from "react";
import "./Toast.css";

import { useData } from "../../context/data-context";

export const useDisableToast = () => {
  const { dispatch } = useData();

  useEffect(() => {
    return () => {
      disableToast(dispatch);
    };
  }, []);
};

export const toastHandler = (dispatch, message) => {
  dispatch({
    type: "ENABLE_OR_DISABLE_TOAST",
    payload: { message },
  });
  setTimeout(() => {
    disableToast(dispatch);
  }, 2000);
};

const disableToast = (dispatch) => {
  dispatch({
    type: "ENABLE_OR_DISABLE_TOAST",
    payload: { message: null },
  });
};

const Toast = () => {
  const {
    state: { toastMessage },
  } = useData();

  return (
    <div
      class="toast toast-success"
      style={{
        display: toastMessage ? "block" : "none",
      }}
    >
      <ion-icon class="toast-icon" name="checkmark-circle"></ion-icon>
      {toastMessage}
    </div>
  );
};

export default Toast;

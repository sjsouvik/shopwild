import "./Toast.css";

const Toast = (props) => {
  return (
    <div
      class="toast toast-success"
      style={{
        display: props.show ? "block" : "none",
      }}
    >
      <ion-icon class="toast-icon" name="checkmark-circle"></ion-icon>
      {props.message}
    </div>
  );
};

export default Toast;

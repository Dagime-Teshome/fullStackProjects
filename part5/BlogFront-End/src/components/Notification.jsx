import "./notification.css";

const Notification = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null;
  }
  return <div className="error">{errorMessage.toUpperCase()}</div>;
};

export default Notification;

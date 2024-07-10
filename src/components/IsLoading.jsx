import style from "../scss/IsLoading.module.scss";

const IsLoading = ({ text }) => {
  return <div className={`mt-4 animate-bounce`}>{text}</div>;
};

export default IsLoading;

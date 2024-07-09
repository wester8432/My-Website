import style from "../scss/IsLoading.module.scss";

const IsLoading = ({ text }) => {
  return (
    <div
      className={`mt-4 ${style.loadingAnimationLeftToRight} ${style.loadingAnimationUpToDown}`}
    >
      {text}
    </div>
  );
};

export default IsLoading;

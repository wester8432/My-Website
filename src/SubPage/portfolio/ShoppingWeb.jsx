const ShoppingWeb = () => {
  return (
    <div>
      <button
        onClick={() => {
          window.open("https://wester8432.github.io/shoppingWeb/", "_blank");
        }}
        className=" bg-sky-300 dark:bg-sky-600 rounded-md p-1"
      >
        前往電商
      </button>
    </div>
  );
};

export default ShoppingWeb;

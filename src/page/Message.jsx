const Message = () => {
  let message = [
    {
      id: Math.random(),
      Name: "N1ro",
      Message: "Hello world",
    },
    {
      id: Math.random(),
      Name: "N2ro",
      Message: "Hello world2",
    },
    {
      id: Math.random(),
      Name: "N3ro",
      Message: "Hello world3",
    },
  ];
  return (
    <div className="bg-slate-900  w-full pt-8 flex flex-wrap ">
      <ul className="w-full">
        {message.map((item) => (
          <li
            key={item.id}
            className=" flex flex-wrap justify-center w-full pb-8 "
          >
            <div className="w-3/4 bg-slate-600 flex flex-wrap text-start rounded-md">
              <div className="  text-white w-full flex-1 pb-4">
                名稱: {item.Name}
              </div>
              <div className=" text-white w-full pt-4">
                訊息: {item.Message}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="w-full flex flex-wrap justify-center">
        <div className="w-3/4 flex justify-center pb-8">
          <p className=" text-white pr-8  whitespace-nowrap">請輸入名字</p>
          <input type="text" className="w-full rounded-md" />
        </div>

        <div className="w-3/4 flex whitespace-nowrap pb-8 ">
          <p className=" text-white pr-8">請輸入訊息</p>
          <textarea className="w-full h-32 resize-none rounded-md" />
        </div>
        <div className="w-3/4 justify-end flex">
          <button className=" bg-sky-500 rounded-md w-12 hover:bg-sky-600">
            送出
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;

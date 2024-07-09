const Experience = () => {
  const experiences = [
    {
      startDate: "2020-04",
      endData: "2022-07",
      position: "工讀生",
      company: "虎尾科技大學-教學業務組",
      description: [
        "協助組內與外籍生溝通。",
        "協助組內寄件等相關行政流程。",
        "使用excel、word等軟體協助成績登錄。",
      ],
      image: "path/to/image.jpg",
    },
    {
      startDate: "2023-04",
      endData: "2024-02",
      position: "正職員工",
      company: "統一超商",
      description: ["一般正值，在轉職期間的過渡期。"],
      image: "path/to/another-image.jpg",
    },
    {
      startDate: "2024-04",
      endData: "2024-06",
      position: "前端工程師",
      company: "創創數位科技股份有限公司",
      description: [
        "以next-app、react開發網站",
        "會員系統建置",
        "第三方登入驗證製作",
        "以react-player製作播放系統",
      ],
      image: "path/to/another-image.jpg",
    },
    // 添加更多经验数据
  ];
  const changeDateFormat = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 月份从0开始，所以需要+1
    return `${year}-${month}`;
  };

  return (
    <div className="timeline-container">
      {experiences.map((exp, i) => (
        <div className="pr-[20px] hover:bg-[#9b9b9b33] flex" key={i}>
          <p className=" flex-wrap flex justify-center text-center mr-[55px] pt-[20px]  leading-[68.4px] font-bold ">
            <span className="w-full">{changeDateFormat(exp.startDate)}</span>
            <i className="h-2 w-1 bg-slate-300 dark:bg-slate-600" />
            <span className="w-full">{changeDateFormat(exp.endData)}</span>
          </p>
          <div className=" flex-1 pb-[100px] border-l-[5px] border-[#E3E3E3] relative min-[767px]:flex justify-between min-[767px]:pl-[90px]">
            <i className="absolute left-3 top-8 transform -translate-x-8 flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full text-white font-bold"></i>
            <div className="min-[767px]:w-[67%] max-[767px]:w-full">
              <p className=" leading-[40px] ">職位:{exp.position}</p>
              <p className="leading-[44px] font-bold  text-lg">{exp.company}</p>
              <div className=" leading-[40px]  whitespace-pre-wrap">
                <ul>
                  {exp.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* {exp.image && (
              <img
                src={exp.image}
                className="object-cover min-[767px]:w-[29%] max-[767px]:w-full rounded-[10px]"
                alt={exp.position}
              />
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;

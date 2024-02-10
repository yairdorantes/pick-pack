const Stats = () => {
  const stats = [
    {
      title: "Ordenes pickeadas",
      value: 19,
      color: "bg-[#39be39]",
      icon: (
        <svg
          className="text-white w-6 h-6"
          fill="currentColor"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
        >
          <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-3.97-3.03a.75.75 0 00-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 00-1.06 1.06L6.97 11.03a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-.01-1.05z" />
        </svg>
      ),
    },
    {
      title: "Ordenes empacadas",
      value: 22,
      color: "bg-[#a06c57]",
      icon: (
        <svg
          className="w-6 h-6 text-white"
          viewBox="0 0 900 1000"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M870 100c8 0 15 3 21 9s9 13 9 21v120H0V130c0-8 3-15 9-21s13-9 21-9h840M50 830V300h800v530c0 20-7 36.667-21 50-14 13.333-30.333 20-49 20H120c-18.667 0-35-6.667-49-20s-21-30-21-50m250-430v100h300V400H300" />
        </svg>
      ),
    },
    {
      title: "Ítems alistados",
      value: 202,
      color: "bg-[#18abcb]",
      icon: (
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 640 512"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M211.8 0c7.8 0 14.3 5.7 16.7 13.2C240.8 51.9 277.1 80 320 80s79.2-28.1 91.5-66.8C413.9 5.7 420.4 0 428.2 0h12.6c22.5 0 44.2 7.9 61.5 22.3l126.2 105.1c6.6 5.5 10.7 13.5 11.4 22.1s-2.1 17.1-7.8 23.6l-56 64c-11.4 13.1-31.2 14.6-44.6 3.5L480 197.7V448c0 35.3-28.7 64-64 64H224c-35.3 0-64-28.7-64-64V197.7l-51.5 42.9c-13.3 11.1-33.1 9.6-44.6-3.5l-56-64c-5.7-6.5-8.5-15-7.8-23.6s4.8-16.6 11.4-22.1L137.7 22.3C155 7.9 176.7 0 199.2 0h12.6z" />
        </svg>
      ),
    },
  ];
  return (
    <div className="flex mb-10 flex-wrap gap-5 justify-center">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`p-3  shadow-md  w-[300px] rounded-xl bg-slate-200 `}
        >
          <div className="flex items-center gap-3">
            <div
              className={`rounded-full flex justify-center items-center w-10 h-10 ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div className="">
              <div className="font-bold text-xl">{stat.value}</div>
              <p className="">{stat.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;

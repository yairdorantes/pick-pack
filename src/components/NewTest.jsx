const NewTest = () => {
  return (
    <div>
      <div className="stats shadow">
        <div className="stat w-44">
          <div className="stat-figure text-primary">
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
            >
              <path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
              <path d="M10.97 4.97a.235.235 0 00-.02.022L7.477 9.417 5.384 7.323a.75.75 0 00-1.06 1.06L6.97 11.03a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 00-1.071-1.05z" />
            </svg>
          </div>
          <div className="stat-title">Ordenes</div>
          <div className="stat-value text-primary text-2xl">25.6K</div>
        </div>
      </div>
    </div>
  );
};

export default NewTest;

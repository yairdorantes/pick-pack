const Test = () => {
  const example = `{"data":"https://www.bourbon.co.jp/petit/" ,"cornerPoints":[{"x":318,"y":494.4},{"x":444,"y":508.79999999999995},{"x":429.59999999999997,"y": 637.2},{"x":301.2,"y":621.5999999999999}]}`;
  const res = JSON.parse(example);
  console.log(res.data);

  return (
    <div>
      <div>jaja lolas yahooo jajaj</div>
      <button
        onClick={() => {
          localStorage.setItem(
            "authTokenFulfilment",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJpZCI6MjcsInVzZXJuYW1lIjoiWWFpciBJc21hZWwiLCJlbWFpbCI6ImRlc2Fycm9sbG9lY29tMkBhbWVyaWNhbmNvdHRvbi5jb20ubXgifSwiaWF0IjoxNzA3NDUzMjk1LCJleHAiOjE3MDgwNTgwOTV9.pPgVuagIAYR-NlfqAzTUMit4zI2f-rL93oSsYXABsyg"
          );
        }}
        className="btn"
      >
        login
      </button>
    </div>
  );
};

export default Test;

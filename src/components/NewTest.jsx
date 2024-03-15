import { Scanner } from "@yudiel/react-qr-scanner";

const NewTest = () => {
  return (
    <div>
      <Scanner
        components={{}}
        // options={{ delayBetweenScanAttempts: 100 }}
        onResult={(text, result) => {
          alert(text, result);
          console.log(text, result);
        }}
        onError={(error) => console.log(error?.message)}
      />
    </div>
  );
};

export default NewTest;

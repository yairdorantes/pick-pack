// const testingMode = false;
const testingMode = false;
// const rootCodes = { TCOMADC: "te coma dece", THEADAM: "de a dam" };
const adrianImg =
  "https://cdn.discordapp.com/avatars/1171876442586501121/7025947bea56fc3149a39f3d4ec2a656.webp?size=80";
const monoImg =
  "data:image/jpeg;base64,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";

const pickImage = () => {
  const randomNumber = Math.random();
  const randomBinaryValue = Math.round(randomNumber);
  if (randomBinaryValue === 0) {
    return adrianImg;
  } else {
    return monoImg;
  }
};

export { testingMode, pickImage, monoImg, adrianImg };

// manifest courier ids
// 1 = fedex
// 2 = paquetexpress
// 3 = estafeta
// 4 = dhl
// 5 = ups

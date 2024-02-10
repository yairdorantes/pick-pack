import useStore from "../../../Context";
import ResumeCard from "../../components/ResumeCard";

const ResumeWS = () => {
  const { itemsList } = useStore();
  return (
    <div>
      {itemsList.map((product, i) => (
        <ResumeCard key={i} product={product} />
      ))}
    </div>
  );
};
export default ResumeWS;

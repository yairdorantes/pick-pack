import NavBar from "../../components/NavBar";
import TopBarP from "./TopBarP";
import PendingPicking from "./PendingPicking";
import PackingTable from "./PackingTable";

const ContainerP = ({ view }) => {
  return (
    <div>
      <NavBar>
        <TopBarP view={view} />
        {/* {view === 1 && <EverthingTable />} */}
        {view === 2 && <PendingPicking />}
        {view === 3 && <PackingTable />}
      </NavBar>
    </div>
  );
};

export default ContainerP;

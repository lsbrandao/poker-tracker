import Card from "../../components/Card/Card";
import "./PlayingGroups.scss";
import PlusIcon from "../../assets/plus-icon.svg";

const handleCreateNewGroup = (event: any) => {
  event.preventDefault();

  console.log(`new group`);
};

const PlayingGroups = () => {
  return (
    <section className="page-container playing-groups-container">
      <h1 className="page-title">Playing Groups</h1>
      <Card>
        <h2>Card Name</h2>
      </Card>
      <button className="create-new-group-btn" onClick={handleCreateNewGroup}>
        <img src={PlusIcon} alt="Create new group" />
      </button>
    </section>
  );
};

export default PlayingGroups;

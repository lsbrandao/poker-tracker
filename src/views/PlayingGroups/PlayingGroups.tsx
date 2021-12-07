import { useNavigate } from "react-router-dom";
import "./PlayingGroups.scss";
import Card from "../../components/Card/Card";
import PlusIcon from "../../assets/plus-icon.svg";
import EditIcon from "../../assets/edit-icon.svg";
import { useUser } from "../../contexts/UserContext/UserContext"
import { PlayingGroup } from "../../models/user";


const PlayingGroups = () => {
  const { playingGroups } = useUser();
  const navigate = useNavigate();

  const onEditGroup = (group: PlayingGroup) => {
    navigate("/edit-groups", { state: group })
  }

  const onSelectGroup = (group: PlayingGroup) => {
    navigate("/months", { state: group })
  }

  return (
    <section className="page-container playing-groups-container">
      <h1 className="page-title">Playing Groups</h1>

      {playingGroups.map((group: PlayingGroup, index: number) => (
        < Card key={group._id} >
          <div onClick={() => onSelectGroup(group)} className="flex-container space-between">
            <h2 className="group-name">{group.name}</h2>
            <button className="edit-group-btn" onClick={() => onEditGroup(group)}>
              <img src={EditIcon} alt="Edit group" />
            </button>
          </div>
        </Card>
      ))
      }

      <button className="create-new-group-btn" onClick={() => navigate("/edit-groups")}>
        <img src={PlusIcon} alt="Create new group" />
      </button>
    </section >
  );
};

export default PlayingGroups;

import Card from "../../components/Card/Card";
import "./PlayingGroups.scss";
import PlusIcon from "../../assets/plus-icon.svg";
import { UserActions, useUser, useUserUpdate } from "../../contexts/UserContext/UserContext"
import { PlayingGroup } from "../../models/user";


const PlayingGroups = () => {
  const { playingGroups } = useUser();
  const userUpdate: UserActions = useUserUpdate();

  return (
    <section className="page-container playing-groups-container">
      <h1 className="page-title">Playing Groups</h1>

      {playingGroups.map((group: PlayingGroup) => (
        <Card key={group._id}>
          <div className="flex-container space-between">
            <h2>{group.name}</h2>
            <button onClick={(e) => userUpdate.editPlayingGroup('123')}>
              Edit
            </button>
          </div>
        </Card>
      ))}

      <button className="create-new-group-btn" onClick={(e) => userUpdate.addPlayingGroup()}>
        <img src={PlusIcon} alt="Create new group" />
      </button>
    </section>
  );
};

export default PlayingGroups;

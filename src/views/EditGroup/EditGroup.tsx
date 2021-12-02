import { useState } from "react";
import "./EditGroup.scss"

import DeleteIcon from "../../assets/x-icon.svg"
import PlusIcon from "../../assets/plus-icon.svg"
import CustomButton, { ButtonSize, ButtonStyle } from "../../components/CustomButton/CustomButton";
import { useUserUpdate } from "../../contexts/UserContext/UserContext";
import { PlayingGroup } from "../../models/user";
import { useLocation, useNavigate } from "react-router-dom";

const EditGroup = (props: any) => {
  const { state } = useLocation();
  const editMode = !!state;
  const initialGroupName = state ? state.name : '';
  const initialPlayers = state ? state.playersNames : [];

  const [groupName, setGroupName] = useState<string>(initialGroupName);
  const [playersNames, setPlayersNames] = useState<string[]>(initialPlayers);
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [showNewPlayerForm, setShowNewPlayerForm] = useState<boolean>(false);
  const { addPlayingGroup, editPlayingGroup } = useUserUpdate();
  const navigate = useNavigate();

  const onAddNewPlayer = () => {
    if (newPlayerName === '') return;
    if (playersNames.find(player => player === newPlayerName)) {
      alert("This name already exists")
      return;
    };
    setPlayersNames(playersNames => [...playersNames, newPlayerName])
    setShowNewPlayerForm(false)
    setNewPlayerName('')
  }

  const onDeletePlayer = (playerName: string) => {
    setPlayersNames([...playersNames.filter(name => name !== playerName)])
  }

  const onSaveGroup = () => {
    if (editMode) {
      const editedGroup: PlayingGroup = {
        _id: state._id,
        name: groupName,
        playersNames: playersNames,
        playedMonths: state.playedMonths
      }
      editPlayingGroup(editedGroup)
    } else {
      const newGroup: PlayingGroup = {
        _id: new Date().getTime().toString(),
        name: groupName,
        playersNames: playersNames,
        playedMonths: []
      }
      addPlayingGroup(newGroup)
    }
    navigate("/groups")
  }

  const PlayersList = () => {
    const playersList = playersNames.map((name: string, index: number) => (
      <li key={index}>
        <div className="player-item">
          <span>{name}</span>
          <button className="delete-player-btn"
            onClick={() => onDeletePlayer(name)}>
            <img src={DeleteIcon} alt="Remove Player" />
          </button>
        </div>
      </li>
    ))

    return (
      <ul>{playersList}</ul>
    )
  }

  return (
    <section className="page-container edit-group-container">
      <h1 className="page-title">Create new Playing Group</h1>

      <div className="label-container">
        <label className="group-name-label">
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </label>

        <label className="player-names-label">
          Players:
        </label>
        <div className="player-names-container">
          <PlayersList />
        </div>
      </div>

      {showNewPlayerForm &&
        <div className="new-player-form">
          <input type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)} />
          <CustomButton
            type={undefined}
            buttonStyle={ButtonStyle.PRIMARY}
            size={ButtonSize.SMALL}
            children="Confirm"
            onClick={() => onAddNewPlayer()}
          />
        </div>
      }

      <div className='new-player-btn-container'>
        <button className="link-btn success-color"
          onClick={() => setShowNewPlayerForm(!showNewPlayerForm)}>
          <div className="icon-wrapper">
            <img src={PlusIcon} alt="Add new player" />
          </div>
          <span>
            Add new player
          </span>
        </button>
      </div>

      <div className="create-group-btn-container">
        <CustomButton
          type={undefined}
          buttonStyle={ButtonStyle.PRIMARY}
          size={ButtonSize.LARGE}
          children="Save Group"
          onClick={() => onSaveGroup()}
        />
      </div>
    </section>
  )
}

export default EditGroup;
import { createContext, useContext, useReducer } from "react";
import UserReducer from "./UserReducer"
import { GlobalState, PlayingGroup } from "../../models/user";

export interface UserActions {
  addPlayingGroup: (group: PlayingGroup) => void
  selectPlayingGroup: (group: PlayingGroup) => void
  editPlayingGroup: (group: PlayingGroup) => void
  deletePlayingGroup: (id: string) => void;
}

export enum UserActionsTypes {
  ADD_GROUP,
  SELECT_GROUP,
  EDIT_GROUP,
  DELETE_GROUP,
}

//initial state
const initialState: GlobalState = {
  _id: '123',
  playingGroups: [{
    _id: '1234',
    name: "Group 1",
    playersNames: ["Player 1", "Player 2", "Player 3"],
    playedMonths: [
      {
        name: "November",
        isMonthClosed: true,
        sessions: [
          {
            name: "Session 1",
            date: "04-11-2021",
            totalDolarsAmount: 120,
            playersResult: [
              {
                playerName: "Player 1",
                buyins: 1,
                rebuys: 1,
                totalChips: 30,
                result: 10,
              },
            ],
          },
          {
            name: "Session 2",
            date: "11-11-2021",
            totalDolarsAmount: 50,
            playersResult: [
              {
                playerName: "Player 1",
                buyins: 1,
                rebuys: 1,
                totalChips: 30,
                result: 10,
              },
              {
                playerName: "Player 2",
                buyins: 1,
                rebuys: 2,
                totalChips: 60,
                result: 30,
              },
            ],
          },
        ],
      },
      {
        name: "October",
        isMonthClosed: true,
        sessions: [{
          name: "Session 1",
          date: "11-10-2021",
          totalDolarsAmount: 50,
          playersResult: [
            {
              playerName: "Player 1",
              buyins: 1,
              rebuys: 1,
              totalChips: 30,
              result: 10,
            },
            {
              playerName: "Player 2",
              buyins: 1,
              rebuys: 2,
              totalChips: 60,
              result: 30,
            },
          ],
        },],
      },
    ],
  }]
}

//Creating contexts
export const UserContext = createContext(initialState);
export const UserUpdateContext = createContext<UserActions>({
  addPlayingGroup: (group: PlayingGroup) => null,
  selectPlayingGroup: (group: PlayingGroup) => null,
  editPlayingGroup: (group: PlayingGroup) => null,
  deletePlayingGroup: (id: string) => null,
});

//Exposing custom hooks
export const useUser = () => useContext(UserContext)
export const useUserUpdate = () => useContext(UserUpdateContext)

// Provider component
export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  //Actions
  function addPlayingGroup(group: PlayingGroup) {
    dispatch({
      type: UserActionsTypes.ADD_GROUP,
      payload: group
    })
  }
  function selectPlayingGroup(group: PlayingGroup) {
    dispatch({
      type: UserActionsTypes.SELECT_GROUP,
      payload: group
    })
  }
  function editPlayingGroup(group: PlayingGroup) {
    dispatch({
      type: UserActionsTypes.EDIT_GROUP,
      payload: group
    })
  }
  function deletePlayingGroup(id: string) {
    dispatch({
      type: UserActionsTypes.DELETE_GROUP,
      payload: id
    })
  }

  return (
    <UserContext.Provider value={{ playingGroups: state.playingGroups }}>
      <UserUpdateContext.Provider value={{ addPlayingGroup, selectPlayingGroup, editPlayingGroup, deletePlayingGroup }}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider >
  )
}
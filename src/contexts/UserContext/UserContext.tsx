import { createContext, useContext, useReducer } from "react";
import UserReducer from "./UserReducer"
import { PlayingGroup } from "../../models/user";


export interface GlobalState {
  playingGroups: PlayingGroup[];
  selectedGroup?: PlayingGroup;
}


export interface UserActions {
  loadPlayingGroups: (userId: string) => void
  addPlayingGroup: (group: PlayingGroup) => void
  selectPlayingGroup: (group: PlayingGroup) => void
  editPlayingGroup: (group: PlayingGroup) => void
  deletePlayingGroup: (id: string) => void;
}

export enum UserActionsTypes {
  LOAD_GROUP,
  ADD_GROUP,
  SELECT_GROUP,
  EDIT_GROUP,
  DELETE_GROUP,
}

//initial state
const initialState: GlobalState = { playingGroups: [] }

//Creating contexts
export const UserContext = createContext(initialState);
export const UserUpdateContext = createContext<UserActions>({
  loadPlayingGroups: (userId: string) => null,
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
  async function loadPlayingGroups(userId: string) {
    console.log("load")
    const url = "http://localhost:3000/groups"
    const headers = new Headers({
      'author': userId
    });
    try {
      const res = await fetch(url, {
        headers: headers
      });
      const json = await res.json();
      console.log(json)
      // setResponse(json);
      // setIsLoading(false);

      dispatch({
        type: UserActionsTypes.LOAD_GROUP,
        payload: json
      })
    } catch (error: any) {
      console.log(error)
      // setError(error);
      // setIsLoading(false);
    }

  }
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
      <UserUpdateContext.Provider value={{ loadPlayingGroups, addPlayingGroup, selectPlayingGroup, editPlayingGroup, deletePlayingGroup }}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider >
  )
}
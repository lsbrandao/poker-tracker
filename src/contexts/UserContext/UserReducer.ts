import { GlobalState } from "../../models/user";
import { UserActionsTypes } from "./UserContext";

const UserReducer = (state: GlobalState, action: any) => {
  switch (action.type) {
    case UserActionsTypes.ADD_GROUP:
      console.log("add");

      return {
        ...state,
        playingGroups: [...state.playingGroups, action.payload],
      };
    case UserActionsTypes.SELECT_GROUP:
      console.log("select");

      return {
        ...state,
        selectedGroup: action.group,
      };
    case UserActionsTypes.EDIT_GROUP:
      console.log("edit");

      return {
        ...state,
        playingGroups: state.playingGroups.map((group, index) =>
          group._id === action.payload._id ? action.payload : group
        ),
      };
    case UserActionsTypes.DELETE_GROUP:
      console.log("edit");
      
      return {
        ...state,
        playingGroups: state.playingGroups.filter(
          (playingGroups) => playingGroups._id !== action.id
        ),
      };
    default:
      return state;
  }
};

export default UserReducer;

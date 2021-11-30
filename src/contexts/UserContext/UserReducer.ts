import { User } from "../../models/user";
import { UserActionsTypes } from "./UserContext";

const UserReducer = (state: User, action: any) => {
  switch (action.type) {
    case UserActionsTypes.ADD_GROUP:
      console.log("add");
      return {
        ...state,
      };
    case UserActionsTypes.EDIT_GROUP:
      console.log("edit");
      return {
        ...state,
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

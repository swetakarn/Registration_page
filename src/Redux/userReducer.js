const initialState = {
  users: [],
  editingIndex: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      const updatedUsers = [...state.users];
      if (action.payload.index !== null) {
        updatedUsers[action.payload.index] = action.payload.user;
      } else {
        updatedUsers.push(action.payload.user);
      }
      return {
        ...state,
        users: updatedUsers,
        editingIndex: null,
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user !== action.payload),
      };
    case "EDIT_USER":
      const editedUsers = [...state.users]; 
      editedUsers[action.payload.index] = action.payload.user;
      return {
        ...state,
        users: editedUsers,
      };
    default:
      return state;
  }
};

export default userReducer;

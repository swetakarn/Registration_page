

export const addUser = (userData , index = null) => {
  return {
    type: "ADD_USER",
    payload: {
      user: userData,
      index: index, 
    },
  };
};
export const deleteUser = (userData) => {
  return{
    type : "DELETE_USER",
    payload:userData
  }
}
const initialState = {

  isLoading: false,
  adminLoginStatus: false,
  merchantFirstPendingListStatus: false,
  merchantFirstPendingListData: null,
  customerregister: false,
  accountVerified: false,
  customerLoginStatus: false,

  language: localStorage.getItem("langue")

}


export default initialState;
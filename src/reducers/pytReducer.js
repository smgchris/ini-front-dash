import {
  CREATING_USER,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USERS_SUCCESS,
  NEW_USER_ERROR,
  NEW_USER_SUCCESS,
  SELECTED_USER,
} from "../actions/types";

const initiateState = {

  status: "",
  loading: false,
  addingItem: "not-adding",
  msg: "",
  ref: "",
  actualBal:0,
  availableBal:0,
  currency:'RWF'
};

export default function (state = initiateState, action) {
  switch (action.type) {
    case "fetchSentTrxsSuccess":
      return {
        ...state,
        sentItems: action.payload.OBJECT,
      };
      case "fetchReceivedTrxsSuccess":
        return {
          ...state,
          receivedItems: action.payload.OBJECT,
        };
    case "fetchTrxsFailed":
      return {
        ...state,
        error: action.payload.DESCRIPTION,
      };
    case "sendMoneySuccess":
      return {
        ...state,
        items: [...state.items, action.payload.OBJECT],
        ref: action.payload.OBJECT.gwRef,
        msg: action.payload.DESCRIPTION,
        addingItem: "added",
      };
    case "sendMoneyFailed":
      return {
        ...state,
        msg: action.payload.DESCRIPTION,
        addingItem: "not-added",
      };
    case "statusSuccess":
      return {
        ...state,
        msg: action.payload.DESCRIPTION,
        addingItem:
          action.payload.OBJECT.trxStatus === "successful"
            ? "success"
            : "added",
      };
    case "statusFailed":
      return {
        ...state,
        msg: action.payload.DESCRIPTION,
      };
    case "refreshBalSuccess":
      const account=JSON.parse(action.payload.OBJECT).data.accounts[0]
      return {
        ...state,
        actualBal:account.balanceActual,
        availableBal:account.balanceAvailable,
        currency:account.currency
      };
    case "refreshBalFailed":
      return {
        ...state,
        msg: action.payload.DESCRIPTION,
      };

    default:
      return state;
  }
}

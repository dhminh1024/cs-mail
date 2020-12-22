import * as types from "../constants/auth.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const loginRequest = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login", { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

const register = ({ name, email, password }) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post("/users", { name, email, password });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    toast.success(`Thank you for your registration, ${name}!`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

const getReceivedMessages = (userId) => async (dispatch) => {
  dispatch({ type: types.GET_RECEIVED_MSG_REQUEST, payload: null });
  try {
    const res = await api.get(`/users/${userId}/messages`);
    dispatch({ type: types.GET_RECEIVED_MSG_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_RECEIVED_MSG_FAILURE, payload: error });
  }
};

const sendMessage = ({ from, to, title, body }) => async (dispatch) => {
  dispatch({ type: types.SEND_MSG_REQUEST, payload: null });
  try {
    const res = await api.post(`/messages`, { from, to, title, body });
    dispatch({ type: types.SEND_MSG_SUCCESS, payload: res.data.data });
    dispatch(getReceivedMessages(from));
  } catch (error) {
    dispatch({ type: types.SEND_MSG_FAILURE, payload: error });
  }
};

const authActions = {
  loginRequest,
  register,
  getReceivedMessages,
  sendMessage,
};
export default authActions;

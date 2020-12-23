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

const updateMessage = ({ message, currentUserId }) => async (dispatch) => {
  dispatch({ type: types.UPDATE_MSG_REQUEST, payload: null });
  try {
    const res = await api.put(`/messages`, message);
    dispatch({ type: types.UPDATE_MSG_SUCCESS, payload: res.data.data });
    dispatch(getReceivedMessages(currentUserId));
  } catch (error) {
    dispatch({ type: types.UPDATE_MSG_FAILURE, payload: error });
  }
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  try {
    api.defaults.headers.common["authorization"] = accessToken;
    const res = await api.get(`/users/me`);
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const logout = () => (dispatch) => {
  localStorage.removeItem("accessToken");
  delete api.defaults.headers.common["authorization"];
  dispatch({ type: types.LOGOUT_REQUEST, payload: null });
};

const authActions = {
  loginRequest,
  register,
  getReceivedMessages,
  sendMessage,
  getCurrentUser,
  logout,
  updateMessage,
};
export default authActions;

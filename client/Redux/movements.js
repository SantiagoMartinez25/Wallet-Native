/* ========================= IMPORTATIONS ======================== */
import { move } from "react-native-redash";
import db, { auth, functions, storage } from "../../firebase";
const Axios = require("axios");

/* ========================= CONSTANTS ============================ */
const GET_DAY_MOV = "GET_DAY_MOV";
const GET_WEEK_MOV = "GET_WEEK_MOV";
const GET_MONTH_MOV = "GET_MONTH_MOV";
const GET_ALL_MOV = "GET_ALL_MOV";
const SAVE_NEW_MOV = "SAVE_NEW_MOV";
const today = new Date(Date.now());
const weekInMiliseconds = 604800000;
const monthInMiliseconds = 2592000000;
const weekDifference = today - weekInMiliseconds;
const monthDifference = today - monthInMiliseconds;

console.log("today X", today);
console.log("una semana antes", weekDifference);
console.log("un mes antes", monthDifference);
/* =========================== STATE =========================== */
const initialState = {
  allMovements: [],
  dayMovements: [],
  weekMovements: [],
  monthMovements: [],
};
/* ========================== REDUCERS ========================== */
export default function movementsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_NEW_MOV:
      return {
        ...state,
        allMovements: [...state.allMovements, ...action.payload],
      };
    case GET_ALL_MOV:
      return {
        ...state,
        allMovements: [...action.payload],
      };
    case GET_DAY_MOV:
      return {
        ...state,
        dayMovements: [...action.payload],
      };
    case GET_WEEK_MOV:
      return {
        ...state,
        weekMovements: [...action.payload],
      };
    case GET_MONTH_MOV:
      return {
        ...state,
        monthMovements: [...action.payload],
      };
    default:
      return { ...state };
  }
}
/* =========================== ACTIONS ============================ */
export const getAllMovements = () => {
  return async function (dispatch) {
    try {
      const userId = await auth.currentUser.uid;
      let CVU;
      let movements = [];
      const searchCVU = await storage
        .collection("Users")
        .doc(userId)
        .collection("Wallet")
        .get();
      searchCVU.forEach((doc) => {
        CVU = doc.id;
      });
      const query = await storage
        .collection("Users")
        .doc(userId)
        .collection("Wallet")
        .doc(CVU)
        .collection("Movimientos")
        .get();
      query.forEach((doc) => {
        movements.push(doc.data());
      });
      dispatch({
        type: GET_ALL_MOV,
        payload: movements,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };
};

export const getDayMovements = (allMovements) => (dispatch) => {
  const formatingdate = (date) => {
    let hoy = {
      dia: new Date(date).getDate(),
      mes: new Date(date).getMonth() + 1,
      año: new Date(date).getFullYear(),
    };
    return hoy;
  };
  let aujourdui = {
    dia: today.getDate(),
    mes: today.getMonth() + 1,
    año: today.getFullYear(),
  };
  let todayMovements = allMovements.length
    ? allMovements.filter(
        (m) =>
          formatingdate(m.fecha).dia === aujourdui.dia &&
          formatingdate(m.fecha).mes === aujourdui.mes &&
          formatingdate(m.fecha).año === aujourdui.año
      )
    : [];
  dispatch({
    type: GET_DAY_MOV,
    payload: todayMovements,
  });
};

export const getWeekMovement = (allMovements) => (dispatch) => {
  let weekMovements = allMovements.length
    ? allMovements.filter((m) => m.fecha > weekDifference)
    : [];
  dispatch({
    type: GET_WEEK_MOV,
    payload: weekMovements,
  });
};

export const getMonthMovements = (allMovements) => (dispatch) => {
  let monthMovements = allMovements.length
    ? allMovements.filter((m) => m.fecha > monthDifference)
    : [];
  dispatch({
    type: GET_MONTH_MOV,
    payload: monthMovements,
  });
};

export const test = async () => {
  const userId = await auth.currentUser.uid;
  Axios.post("https://us-central1-henrybankfire.cloudfunctions.net/sendMoney", {
    amount: 1000,
    senderId: userId,
    receivercvu: "95699757",
    motivo: "probando el navegador",
  })
    .then((x) => console.log("succes", x.data))
    .catch((err) => console.log("error", err));
};
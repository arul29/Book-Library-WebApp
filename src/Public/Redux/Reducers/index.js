import { combineReducers } from "redux";

import books from "./books";
import users from "./users";

const appReducer = combineReducers({
  users,
  books // books: books // namaReducer: namaImport
});

export default appReducer;

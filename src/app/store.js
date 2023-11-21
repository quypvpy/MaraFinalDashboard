import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "../features/Admin/AdminSlice";
import UserReducer from "../features/Admin/redux/studentSlice";


const rootReducer = {
  // rootReducer là bao gồm tất cả reducer mình có
  // counterReducer tên mình đặt nhưng trên mình impport từ hàm couterslice nên nó gắn vào counterReducer
  // và cái reducer này có state là một con số thôi ( 0 )
  course: AdminReducer,
  user: UserReducer,


};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
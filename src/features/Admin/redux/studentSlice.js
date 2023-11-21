import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StorageKeys from "../../../components/constants/storage-keys";
import userApi from "../../../api/userApi";
// import studentApi from "../api/studentApi";


// First, create the thunk
export const register = createAsyncThunk("users/register", async (payload) => {
    //   call API to register
    // payload thoong tin user nhap tren form

    // const data = await studentApi.create(payload);
    //   if(data.check ==true) {

    //     return {
    //       check:data.check,
    //       msg:data.msg,
    //       data:data.data[0],
    //     };
    //   }
    //   else{
    //     return data;
    //   }
  
});
export const login = createAsyncThunk("users/login", async (payload) => {
    //   call API to register
    // payload thoong tin user nhap tren form

    const data = await userApi.checklogin(payload);
      if(data.check ==true) {

         // // save data locastorege
        localStorage.setItem(StorageKeys.TOKEN, data.jwt[0].remember_token);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.data[0]));

        return {
          check:data.check,
          msg:data.msg,
          data:data.data[0],
        };
      }
      else{
        return data;
      }
  
});

  const userSlice = createSlice({
    name: "user",
    initialState: {
      current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
      settings: {},
    },
    reducers: {
      logout:(state)=> {
        // clear local storage
  
        localStorage.removeItem(StorageKeys.USER);
        localStorage.removeItem(StorageKeys.TOKEN);
        state.current = {};
        
      },
    
    },
  


    extraReducers: (builder) => {
      builder
        .addCase(login.fulfilled, (state, action) => {
          // ở đây nghĩa là  khi gọi hàm login và fullfill.. hàm đó trả về j.thì gọi là payload.
          state.current = action.payload;
          
        })
        .addCase(register.fulfilled, (state, action) => {
          // ở đây nghĩa là  khi gọi hàm login và fullfill.. hàm đó trả về j.thì gọi là payload.
          state.current = action.payload;
          
        })
    },

  });

  const { actions, reducer } = userSlice;
  export const { logout } = actions;
  export default reducer; // export default


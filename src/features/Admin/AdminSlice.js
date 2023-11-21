import { createSlice } from "@reduxjs/toolkit";
// mỗi features là một countslice.js
// sau đó setup store dưới foder app
// sau đó gắn store vào app nhờ react redux
const courseSlice = createSlice({
    name: "course",
    initialState: {
        image:[],
        // content1:''
        content:[],
        open:true
    },
    reducers: {
        setOneImage(state,action) {
            state.image=action.payload
        },
        setImages(state,action) {
            if(state.image.includes(action.payload)> 0){
               return;
            }else{
                
                state.image.push(action.payload)
            }
    
        },
        setContent(state,action) {
            console.log('action',action);
            // state[`content${action.payload.number}`] = action.payload.content
            state.content[`${action.payload.number}`] = action.payload.content
        },
        setOpen(state,action) {
            // state[`content${action.payload.number}`] = action.payload.content
            state.open = action.payload
        },
    },
  });
  
  const { actions, reducer } = courseSlice;
  export const { setOneImage, setImages,setContent,setOpen } = actions; //name expost
  export default reducer; // export default
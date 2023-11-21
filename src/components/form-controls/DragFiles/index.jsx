import { Box } from "@mui/material";
import PropTypes from 'prop-types';
import  { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from "react-redux";
import { setOneImage } from "../../../features/Admin/AdminSlice";

const fileTypes = ["JPG", "PNG", "GIF"];

DragFiles.propTypes = {
  onChange:PropTypes.func  

};

export function DragFiles({onChange}) {
  const [file, setFile] = useState(null);
  const [totalFile, setTotalFile] = useState();

  const dispatch= useDispatch()
// const resRedux = useSelector((state) => state.course);
// console.log('res',resRedux);

  const handleChange = (file) => {

    // console.log('file',file);
    // nếu up 1 ảnh.. thì action này...để nó chỉ lấy một ảnh
    const action = setOneImage([file])
        dispatch(action) 

    // if(file.length == 1){   
    //   const action = setOneImage([file])
    //     dispatch(action) 
    // }else{

    //   let tamp = Array(file.length).fill(file.length);
    //   tamp.map((item,index)=>{
    //     const action = setImages(file[index].name)
    //     dispatch(action)
    //   })
    // }


    setFile(file);
    setTotalFile(file.length)
  };
  // const handleChange = (file) => {

  //   // nếu up 1 ảnh.. thì action này...để nó chỉ lấy một ảnh
  //   if(file.length == 1){   
  //     const action = setOneImage([file[0].name])
  //     // const action = setOneImage(urlImage)
  //     // const urlImage = URL.createObjectURL(file[0])
  //       dispatch(action) 
  //       // return 
  //   }else{

  //     let tamp = Array(file.length).fill(file.length);
  //     tamp.map((item,index)=>{
  //       const action = setImages(file[index].name)
  //       dispatch(action)
  //     })
  //   }


  //   setFile(file);
  //   setTotalFile(file.length)
  // };

    return (
      <div className="App">
        <h4>Hình ảnh</h4>
        <FileUploader
          // multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        {/* <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p> */}

        <Box sx={{width:'400px',display: 'flex',mt:3,gap:3}}>
        {file && (
          Array(totalFile).fill(totalFile).map((item,index)=>(
            // <img style={{width:'100%'}} key={index} src={URL.createObjectURL(file[index])} alt="image" />
            <img style={{width:'100%'}} key={index} src={URL.createObjectURL(file)} alt="image" />
          ))
        )}
          
        </Box>
    </div>
    );
}

// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
// import ImageUploader from 'quill-image-uploader';
import 'react-quill/dist/quill.snow.css'

import  ImageResize  from "quill-image-resize-module-react";
import { useDispatch } from 'react-redux';
import { setContent } from '../../../features/Admin/AdminSlice';


Quill.register('modules/imageResize', ImageResize);


QillEditor.propTypes = {
    number:PropTypes.number,
    defaultValue:PropTypes.string,
    
};

export function QillEditor({number,defaultValue}) {

    const [value, setValue] = useState(defaultValue);
    const dispatch= useDispatch()
    

    const handleChange1 =async(e)=>{
        e.preventDefault()
    }

    const handleChange =async(e)=>{

         setValue(e) 
        //  let action = setContent({
        //     content: value,
        //     number,
        // })
        //  dispatch(action)
       
        
    }
    useEffect(()=>{
        let action = setContent({
            content: value,
            number,
        })
         dispatch(action)
    },[value,dispatch,number])
    // Quill.register('modules/imageUploader', ImageUploader);

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1,2,3,4,5,6,false] }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean'],
                [{ 'align': [] }],
            ],
            // 'handlers': {
            //    image: imageHandler
            // }
        },
        clipboard: {
            matchVisual: false,
        },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
    }

    return (
        
            <ReactQuill
                theme="snow"
                value={value}
                modules={modules}
                // onChange={setValue}
                onChange={(e)=>handleChange(e)}
                style={{
                    height: '250px'
                }}
            />
        
    );
}


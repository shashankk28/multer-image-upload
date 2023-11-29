import {React,useState} from 'react';
import axios from 'axios';
import './index.css'
const ImageUpload=()=>{

    const [newUser,setNewUser]=useState({
        name:"",
        birthDate:"",
        photo:""
    })

    const handleChange=(event)=>{
        setNewUser({...newUser,[event.target.name]:[event.target.value]})
    }

    const handlePhoto=(event)=>{
        setNewUser({...newUser,photo:event.target.files[0]});
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        const formData=new FormData();
        formData.append('photo',newUser.photo);
        formData.append('name',newUser.name);
        formData.append('birthDate',newUser.birthDate);

        await axios.post("http://localhost:8080/add",formData).then(res=>{
            console.log(res);
            alert("Uploaded photo successfully");
            window.location.reload();
        }).catch(err=>{console.log(err)});

    }
    return(
            <form onSubmit={handleSubmit} encType='multipart/form-data' className="image-upload-form">
               <label className="file-input-label">
                  <span>Choose Photo</span>
                  <input type='file' accept='.png, .jpeg, .jpg' name='photo' onChange={handlePhoto}/>
              </label>
                <input type='text' placeholder='name' name='name' value={newUser.name} onChange={handleChange}/>
                <input type='date' name='birthDate' value={newUser.birthDate} onChange={handleChange}/>
                <input type='submit'/>
            </form>
    )
}

export default ImageUpload
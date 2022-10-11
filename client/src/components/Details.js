import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { fontWeight, width } from "@mui/system";
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Details = () => {

    const [getuserdata, setuserdata] = useState([]);
    console.log(getuserdata);

    const {id} = useParams("");
    console.log(id);
    

    const getdata = async () => {
        const res = await fetch(`/getuser/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });
        const data = await res.json();
        console.log(data);
        if (res.status === 422 || !data) {
            alert("error");
            console.log("error");
        } else {
            setuserdata(data);
            console.log("get data");
        }
    }

    useEffect(()=>{
        getdata();
    })
    return (

        <div className="container mt-3">
            <h1 style={{ fontWeight: 400 }}>Welcome Harsh Pathak</h1>
            <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                    <div className="row ">
                    <div className="add_btn">
                                <button className="btn btn-primary"><EditIcon/></button>
                                <button className="btn btn-danger"><RestoreFromTrashIcon/></button>
                            </div>
                        <div className="left_view" col-lg-6 col-md-6 col-12>
                            <img src='/profile.png' style={{ width: 50 }} alt='profile' />
                            <h3 className="mt-3">Name: <span>{getuserdata.name}</span></h3>
                            <h3 className="mt-3">Age: <span>{getuserdata.age}</span></h3>
                            <p className="mt-3"><EmailIcon />Email: <span>{getuserdata.email}</span></p>
                            <p className="mt-3"><WorkIcon />Occupation: <span>{getuserdata.work}</span></p>
                        </div>
                        <div className="right_view" col-lg-6 col-md-6 col-12>
                            
                            <p className="mt-4"><PhoneAndroidIcon />Mobile: <span>{getuserdata.mobile}</span></p>
                            <p className="mt-3"><LocationOnIcon />Location: <span>{getuserdata.add}</span></p>
                            <p>Description: <span>{getuserdata.desc}</span></p>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )

}

export default Details;
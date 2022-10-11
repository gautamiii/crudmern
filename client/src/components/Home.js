import React, { useEffect, useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const navigate = useNavigate();
  const [getuserdata, setuserdata] = useState([]);
  // console.log(getuserdata);
  const getdata = async (e) => {
    const res = await fetch("/getdata", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
        // 'Authorization': ''
      },
    });
    const users = await res.json();
    console.log("sssss", users.data);
    if (users.status === 401) {
      Swal.fire("Unauthorize access");
      localStorage.removeItem('token');
      navigate("/login");
    } else if (users.status === 200) {
      let allusers = users.data;
      setuserdata([...allusers]);
    }
  };
  useEffect(() => {
    !localStorage.getItem("token") && navigate("/login");
    getdata();
  }, []);

  const deleteuser = async (id) => {
    //alert(id);
    //alert(`/deleteuser/${id}`);
    const res2 = await fetch(`/deleteuser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      console.log("user deleted");
      getdata();
    }
  };

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2">
          <NavLink to="register" className="btn btn-primary mb-2">
            Add data
          </NavLink>
        </div>
        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">id</th>
              <th scope="col">username</th>
              <th scope="col">email</th>
              <th scope="col">job</th>
              <th scope="col">number</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {getuserdata.map((element, id) => {
              return (
                <>
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.mobile}</td>
                    <td className="d-flex justify-content-between">
                      <NavLink to={`view/${element._id}`}>
                        <button className="btn btn-success">
                          <RemoveRedEyeIcon />
                        </button>
                      </NavLink>
                      <NavLink to={`edit/${element._id}`}>
                        <button className="btn btn-primary">
                          <EditIcon />
                        </button>
                      </NavLink>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteuser(element._id)}
                      >
                        <RestoreFromTrashIcon />
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Home;

import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Button, Input, Label } from "@windmill/react-ui";
import { toast, ToastContainer } from "react-toastify";
import { Select } from "antd";
function AddUser() {
  const [username, setUsename] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const save = () => {
    var data = JSON.stringify({
      username: username,
      name: name,
      roleId: roleId,
      phoneNumber: phoneNumber,
      password: password,
      password_confirmation: password,
    });

    var config = {
      method: "post",
      // url: "http://127.0.0.1:8000/api/register",
      url: "https://maskurtesting.site/public/api/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.success("Pendaftaran berhasil", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          history.push("/app/user");
        }, 2000);
      })
      .catch(function (error) {
        toast.warn("pendaftaran gagal, pastikan semua field terisi atau username dan no hp belum pernah digunakan", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <>
      <PageTitle>Tambah Panel</PageTitle>
      <ToastContainer />
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <SectionTitle>Masukkan Detail Panel</SectionTitle>

        <Label>
          <span>Username</span>
          <Input type="text" className="mt-1" name="username" value={username} onChange={(e) => setUsename(e.target.value)} />
        </Label>

        <Label className="mt-4 mb-4">
          <span>Nama</span>
          <Input type="text" className="mt-1" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </Label>
        {/* <Label className="mt-4 mb-4">
          <span>Email</span>
          <Input type="text" className="mt-1" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Label> */}
        <Label className="mt-4 mb-4">
          <span>No Telepon</span>
          <Input type="number" className="mt-1" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </Label>
        <Label className="mt-4 mb-4">
          <span>Role</span>
          <br></br>
          <Select
            style={{
              width: 120,
            }}
            onChange={(value) => setRoleId(value)}
            options={[
              {
                value: 1,
                label: "Admin",
              },
              {
                value: 2,
                label: "Guest",
              },
            ]}
          />
        </Label>
        <Label className="mt-4 mb-4">
          <span>Password</span>
          <Input type="password" className="mt-1" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Label>

        <div className="flex flex-row justify-center">
          <div className="text-black-600">
            <Button className="px-10" onClick={save}>
              Tambah
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUser;

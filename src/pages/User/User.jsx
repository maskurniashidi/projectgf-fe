import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { TableBody, TableContainer, Table, TableHeader, TableCell, TableRow, Avatar, Button, Input } from "@windmill/react-ui";
import { AiOutlinePlus, AiFillDelete } from "react-icons/ai";

function User() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const userLogin = JSON.parse(localStorage.getItem("USER"));
  useEffect(() => {
    var config = {
      method: "get",
      url: "https://maskurtesting.site/public/api/users",
      // url: "http://127.0.0.1:8000/api/users",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      },
    };

    axios(config)
      .then(function (response) {
        setUser(response.data.data.reverse());
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const deleteUser = (id) => {
    var config = {
      method: "delete",
      url: `https://maskurtesting.site/public/api/users/${id}`,
      // url: `http://127.0.0.1:8000/api/users/${id}`,
    };

    axios(config)
      .then(function (response) {
        alert("hapus user berhasil");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          {userLogin.roleId == 1 ? (
            <div>
              <PageTitle>Pengguna</PageTitle>

              <div className="flex items-center justify-between">
                <SectionTitle>Daftar Pengguna</SectionTitle>

                <Link to="user/add-user" className="mb-5">
                  <Button iconLeft={AiOutlinePlus}>
                    <span>Tambah Pengguna</span>
                  </Button>
                </Link>
              </div>

              <div className="mb-8">
                <TableContainer>
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableCell>Username</TableCell>
                        <TableCell>Nama</TableCell>
                        <TableCell>No HP</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Aksi</TableCell>
                      </tr>
                    </TableHeader>
                    <>
                      <TableBody>
                        {user.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <span className="text-sm">{item.username}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.name}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.phoneNumber}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.role.role}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.created_at.slice(0, 10)}</span>
                            </TableCell>
                            <TableCell>
                              {item.username !== "ADMIN" && (
                                <button>
                                  <AiFillDelete onClick={() => deleteUser(item.id)} className="w-5 h-5 text-red-500 hover:text-red-600" aria-hidden="true" />
                                </button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </>
                  </Table>
                </TableContainer>
              </div>
            </div>
          ) : (
            "Halaman ini hanya bisa diakses oleh admin"
          )}
        </div>
      )}
    </>
  );
}

export default User;

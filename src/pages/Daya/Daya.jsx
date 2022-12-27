import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { TableBody, TableContainer, Table, TableHeader, TableCell, TableRow, Avatar, Button, Input } from "@windmill/react-ui";
import { AiFillEye, AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { SearchIcon } from "../../icons";
function Daya() {
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState("");
  const [daya, setDaya] = useState([]);
  const [dataSearch, setDataSearch] = useState(undefined);
  const user = JSON.parse(localStorage.getItem("USER"));
  // get Daya
  const getDaya = () => {
    var config = {
      method: "get",
      url: "https://maskurtesting.site/public/api/products",
      // url: "http://127.0.0.1:8000/api/products",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      },
    };

    axios(config)
      .then(function (response) {
        setDaya(response.data.data.reverse());
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getDaya();
    setLoading(false);
  }, []);

  const deletedaya = (id) => {
    // get daya yang dihapus
    const dayaChoose = daya.find((element) => parseInt(element.id) === parseInt(id));

    // update panel power
    var dataBody = JSON.stringify({
      remainingPower: parseInt(dayaChoose.panel.remainingPower) + parseInt(dayaChoose.power),
    });
    var config = {
      method: "put",
      url: `https://maskurtesting.site/public/api/panel/${dayaChoose.panelId}`,
      // url: `http://127.0.0.1:8000/api/panel${dayaChoose.panelId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: dataBody,
    };

    axios(config)
      .then(function (response) {
        var config = {
          method: "delete",
          url: `https://maskurtesting.site/public/api/products/${id}`,
          // url: `http://127.0.0.1:8000/api/products/${id}`,
        };

        axios(config)
          .then(function (response) {
            toast.success("Hapus beban berhasil", {
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
              window.location.reload();
            }, 2000);
          })
          .catch(function (error) {
            toast.warn("Hapus gagal", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      })
      .catch(function (error) {
        console.log(error);
      });

    // baru didelete
  };

  const handleSearch = (e) => {
    setSearchParams(e.target.value);
    // const searchDataNew = daya.filter((element) => {
    //   return element.burden.toLowerCase().includes(e.target.value.toLowerCase()) || element.panel.panelName.toLowerCase().includes(e.target.value.toLowerCase());
    // });
    // console.log(searchDataNew);
    // const searchData = daya.filter((element) => element.burden === e.target.value);
    // setDataSearch(searchDataNew);
    // if (e.target.value === "") {
    //   setDataSearch(undefined);
    // }
  };

  return (
    <>
      <PageTitle>Data Beban</PageTitle>
      <ToastContainer />
      <SectionTitle>Daftar Data Beban</SectionTitle>
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-xl mr-6 mb-4 focus-within:text-purple-500">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input onChange={handleSearch} className="pl-8 text-gray-700" placeholder="masukkan parameter pencarian" aria-label="Search" />
        </div>
        {user.roleId == 1 && (
          <Link to="daya/tambah-daya" className="mb-5">
            <Button iconLeft={AiOutlinePlus}>
              <span>Tambah Data</span>
            </Button>
          </Link>
        )}
      </div>

      <div className="mb-8">
        <TableContainer>
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Nama Panel</TableCell>

                <TableCell>Beban</TableCell>
                <TableCell>Tegangan</TableCell>
                <TableCell>Arus Listrik</TableCell>
                <TableCell>Daya</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Aksi</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {searchParams === "" ? (
                <>
                  {daya.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <span className="text-sm">{item.panel.panelName}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{item.burden}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{parseFloat(item.voltage).toLocaleString("id-ID")} V</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{parseFloat(item.electricCurrent).toLocaleString("id-ID")} A</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{parseFloat(item.power).toLocaleString("id-ID")} W</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{item.created_at.slice(0, 10)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{item.updated_at.slice(0, 10)}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-3">
                          <Link to={`daya/${item.id}`}>
                            <AiFillEye className="w-5 h-5 text-blue-500 hover:text-blue-600" aria-hidden="true" />
                          </Link>
                          {user.roleId == 1 && (
                            <Link to={`daya/edit-daya/${item.id}`}>
                              <AiFillEdit className="w-5 h-5 text-yellow-300 hover:text-yellow-500" aria-hidden="true" />
                            </Link>
                          )}
                          {user.roleId == 1 && (
                            <button>
                              <AiFillDelete onClick={() => deletedaya(item.id)} className="w-5 h-5 text-red-500 hover:text-red-600" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
                  {daya
                    .filter(
                      (el) =>
                        el.burden.toLowerCase().includes(searchParams.toLowerCase()) ||
                        el.panel.panelName.toLowerCase().includes(searchParams.toLowerCase()) ||
                        el.voltage.toLowerCase().includes(searchParams.toLowerCase()) ||
                        el.power.toLowerCase().includes(searchParams.toLowerCase()) ||
                        el.electricCurrent.toLowerCase().includes(searchParams.toLowerCase())
                    )
                    .map((item) => {
                      return (
                        <TableRow key={item.id}>
                          <TableCell>
                            <span className="text-sm">{item.panel.panelName}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{item.burden}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{parseFloat(item.voltage).toLocaleString("id-ID")} V</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{parseFloat(item.electricCurrent).toLocaleString("id-ID")} A</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{parseFloat(item.power).toLocaleString("id-ID")} W</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{item.created_at.slice(0, 10)}</span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{item.updated_at.slice(0, 10)}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-3">
                              <Link to={`daya/${item.id}`}>
                                <AiFillEye className="w-5 h-5 text-blue-500 hover:text-blue-600" aria-hidden="true" />
                              </Link>
                              {user.roleId == 1 && (
                                <Link to={`daya/edit-daya/${item.id}`}>
                                  <AiFillEdit className="w-5 h-5 text-yellow-300 hover:text-yellow-500" aria-hidden="true" />
                                </Link>
                              )}
                              {user.roleId == 1 && (
                                <button>
                                  <AiFillDelete onClick={() => deletedaya(item.id)} className="w-5 h-5 text-red-500 hover:text-red-600" aria-hidden="true" />
                                </button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Daya;

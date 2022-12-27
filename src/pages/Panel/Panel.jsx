import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { SearchIcon } from "../../icons";
import { toast, ToastContainer } from "react-toastify";
import { TableBody, TableContainer, Table, TableHeader, TableCell, TableRow, Avatar, Button, Input } from "@windmill/react-ui";
import { AiFillEye, AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
function Panel() {
  const [loading, setLoading] = useState(true);
  const [daya, setDaya] = useState([]);
  const [panel, setPanel] = useState([]);
  const [dataSearch, setDataSearch] = useState(undefined);
  const user = JSON.parse(localStorage.getItem("USER"));

  const formatNumber = (value) => {
    return value
      .toString()
      .split("")
      .reverse()
      .join("")
      .match(/\d{1,3}/g)
      .join(",")
      .split("")
      .reverse()
      .join("");
  };

  // get panel
  const getPanel = () => {
    var config = {
      method: "get",
      url: "https://maskurtesting.site/public/api/panel",
      // url: "http://127.0.0.1:8000/api/panel",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      },
    };

    axios(config)
      .then(function (response) {
        setPanel(response.data.data.reverse());
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getDaya = () => {
    var config = {
      method: "get",
      url: "https://maskurtesting.site/public/api/products",
      // url: `http://127.0.0.1:8000/api/products`,
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
    getPanel();
    getDaya();
    setLoading(false);
  }, []);

  const deletePanel = (id) => {
    const hasil = [daya.find((element) => parseInt(element.panelId) === parseInt(id))];
    // validas apakah panel ini dipake, jika ya. tidak bisa dihapus
    if ((hasil === undefined) | (hasil[0] === undefined)) {
      var config = {
        method: "delete",
        url: `https://maskurtesting.site/public/api/panel/${id}`,
        // url: `http://127.0.0.1:8000/api/panel/${id}`,
      };

      axios(config)
        .then(function (response) {
          toast.success("Hapus panel berhasil", {
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
          console.log(error);
        });
    } else {
      toast.warn("Tidak bisa dihapus, panel digunakan", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleSearch = (e) => {
    const searchData = panel.filter((element) => parseFloat(element.remainingPower) > parseFloat(e.target.value));
    setDataSearch(searchData);

    if (e.target.value === "") {
      setDataSearch(undefined);
    }
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <PageTitle>Panel</PageTitle>
          <ToastContainer />
          <SectionTitle>Daftar Panel</SectionTitle>
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-xl mr-6 mb-4 focus-within:text-purple-500">
              <div className="absolute inset-y-0 flex items-center pl-2">
                <SearchIcon className="w-4 h-4" aria-hidden="true" />
              </div>
              <Input onChange={handleSearch} className="pl-8 text-gray-700" placeholder="Berapa daya yang anda butuhkan ?" aria-label="Search" />
            </div>
            {user.roleId == 1 && (
              <Link to="panel/tambah-panel" className="mb-5">
                <Button iconLeft={AiOutlinePlus}>
                  <span>Tambah Panel</span>
                </Button>
              </Link>
            )}
          </div>

          <div className="mb-8">
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>Panel</TableCell>
                    <TableCell>Max Daya</TableCell>
                    <TableCell>Sisa Daya</TableCell>
                    <TableCell>Total Daya Terpakai</TableCell>
                    <TableCell>Total Beban</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Updated At</TableCell>
                    <TableCell>Aksi</TableCell>
                  </tr>
                </TableHeader>
                <>
                  <TableBody>
                    {dataSearch === undefined ? (
                      <>
                        {panel.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <span className="text-sm">{item.panelName}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{parseFloat(item.maxPower).toLocaleString("id-ID")} W</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{parseFloat(item.remainingPower).toLocaleString("id-ID")} W</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{(parseFloat(item.maxPower) - parseFloat(item.remainingPower)).toLocaleString("id-ID")} W</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.product.length}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.created_at.slice(0, 10)}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.updated_at.slice(0, 10)}</span>
                            </TableCell>

                            <TableCell>
                              <div className="flex space-x-3">
                                <Link to={`panel/${item.id}`}>
                                  <AiFillEye className="w-5 h-5 text-blue-500 hover:text-blue-600" aria-hidden="true" />
                                </Link>
                                {user.roleId == 1 && (
                                  <Link to={`panel/edit-panel/${item.id}`}>
                                    <AiFillEdit className="w-5 h-5 text-yellow-300 hover:text-yellow-500" aria-hidden="true" />
                                  </Link>
                                )}
                                {user.roleId == 1 && (
                                  <button>
                                    <AiFillDelete onClick={() => deletePanel(item.id)} className="w-5 h-5 text-red-500 hover:text-red-600" aria-hidden="true" />
                                  </button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ) : (
                      <>
                        {dataSearch.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <span className="text-sm">{item.panelName}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{parseFloat(item.maxPower).toLocaleString("id-ID")} W</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{parseFloat(item.remainingPower).toLocaleString("id-ID")} W</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{(parseFloat(item.maxPower) - parseFloat(item.remainingPower)).toLocaleString("id-ID")} W</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.product.length}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.created_at.slice(0, 10)}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{item.updated_at.slice(0, 10)}</span>
                            </TableCell>

                            <TableCell>
                              <div className="flex space-x-3">
                                <Link to={`panel/${item.id}`}>
                                  <AiFillEye className="w-5 h-5 text-blue-500 hover:text-blue-600" aria-hidden="true" />
                                </Link>
                                {user.roleId === 1 && (
                                  <Link to={`panel/edit-panel/${item.id}`}>
                                    <AiFillEdit className="w-5 h-5 text-yellow-300 hover:text-yellow-500" aria-hidden="true" />
                                  </Link>
                                )}
                                {user.roleId === 1 && (
                                  <button>
                                    <AiFillDelete onClick={() => deletePanel(item.id)} className="w-5 h-5 text-red-500 hover:text-red-600" aria-hidden="true" />
                                  </button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default Panel;

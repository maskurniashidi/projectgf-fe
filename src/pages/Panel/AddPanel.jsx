import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Button, Input, Label } from "@windmill/react-ui";
import { toast, ToastContainer } from "react-toastify";
import { NumericFormat } from "react-number-format";
import "./styles.css";
function AddPanel() {
  const [loading, setLoading] = useState(false);
  const [panelName, setPanelName] = useState("");
  const [panelPower, setPanelPower] = useState("");
  const history = useHistory();

  const save = () => {
    setLoading(true);
    var data = JSON.stringify({
      panelName: panelName,
      maxPower: parseFloat(panelPower.replace(/,/g, "")).toString(),
      remainingPower: parseFloat(panelPower.replace(/,/g, "")).toString(),
    });

    var config = {
      method: "post",
      url: "https://maskurtesting.site/public/api/panel",
      // url: `http://127.0.0.1:8000/api/panel`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        toast.success("Tambah Panel Berhasil", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        setTimeout(() => {
          history.push("/app/panel");
        }, 2000);
      })
      .catch(function (error) {
        toast.warn("tambah panel gagal, pastikan semua data terisi", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      <PageTitle>Tambah Panel</PageTitle>
      <ToastContainer />
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <SectionTitle>Masukkan Detail Panel</SectionTitle>

        <Label>
          <span>Nama Panel</span>
          <input
            type="text"
            className="mt-1 p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="panelName"
            value={panelName}
            onChange={(e) => setPanelName(e.target.value)}
          />
        </Label>

        <Label className="mt-4 mb-4">
          <span>Maksimum Daya</span>
          {/* <Input
            type="string"
            className="mt-1"
            name="panelPower"
            value={formatNumber(panelPower)}
            onChange={(e) => {
              setPanelPower(e.target.value);
            }}
          /> */}
          <br></br>
          <NumericFormat
            className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              setPanelPower(e.target.value);
            }}
            value={panelPower}
            thousandSeparator=","
          />
          <p class="mt-1 ml-1 text-xs text-gray-900 dark:text-white">Tanda koma desimal gunakan titik</p>
        </Label>

        <div className="flex flex-row justify-center">
          <div className="text-black-600">
            <Button className="px-10" onClick={save}>
              {loading ? "Loading..." : "Simpan"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPanel;

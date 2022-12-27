import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { TableBody, TableContainer, Table, TableHeader, TableCell, TableRow, Avatar, Button, Input, HelperText, Label, Textarea } from "@windmill/react-ui";
import { AiFillEye, AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { HeartIcon, EditIcon, MailIcon } from "../../icons";
import { Select } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { NumericFormat } from "react-number-format";
import "./styles.css";
function AddDaya() {
  const [data, setData] = useState({
    burden: "",
    voltage: "",
    electricCurrent: "",
    power: "",
  });
  const [panelId, setPanelId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState([]);
  const [newPanel, setNewPanel] = useState([]);
  const history = useHistory();

  const handleChange = (evt) => {
    setData({
      ...data,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleChangeSelect = (value) => {
    setPanelId(value.toString());
  };

  useEffect(() => {
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
        setPanel(response.data.data);
        setNewPanel(
          response.data.data.map(function (row) {
            return { value: row.id, label: row.panelName };
          })
        );
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const save = () => {
    // check sisa daya

    const panelChoose = panel.find((element) => parseInt(element.id) === parseInt(panelId));

    let newPower = parseFloat(data.power.replace(/,/g, "")).toString();
    if (parseFloat(panelChoose.remainingPower) < parseFloat(newPower)) {
      toast.warn("Menambahkan beban gagal, sisa daya panel tidak cukup", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      var body = JSON.stringify({
        panelId: panelId,
        burden: data.burden,
        voltage: parseFloat(data.voltage.replace(/,/g, "")).toString(),
        electricCurrent: parseFloat(data.electricCurrent.replace(/,/g, "")).toString(),
        power: parseFloat(data.power.replace(/,/g, "")).toString(),
      });

      var config = {
        method: "post",
        url: "https://maskurtesting.site/public/api/products",
        // url: "http://127.0.0.1:8000/api/products",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: body,
      };

      axios(config)
        .then(function (response) {
          var dataBody = JSON.stringify({
            remainingPower: parseFloat(panelChoose.remainingPower) - parseFloat(data.power.replace(/,/g, "")),
          });

          var config = {
            method: "put",
            url: `https://maskurtesting.site/public/api/panel/${panelId}`,
            // url: `http://127.0.0.1:8000/api/panel/${panelId}`,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            data: dataBody,
          };

          axios(config)
            .then(function (response) {
              toast.success("Menambahkan beban berhasil", {
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
                history.push("/app/daya");
              }, 2000);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          toast.warn("Menambahkan beban gagal", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          console.log(error);
        });
    }
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <PageTitle>Tambah Data Beban</PageTitle>
          <ToastContainer />
          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <SectionTitle>Detail Data Beban</SectionTitle>

            <Label className="mb-4">
              <p>Panel</p>
              <Select
                className="mt-1"
                showSearch
                onChange={handleChangeSelect}
                style={{
                  width: 200,
                }}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? "").includes(input)}
                filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
                options={newPanel}
              />
            </Label>

            {/* <Label>
              <span>SDP</span>
              <Input name="cableKind" value={data.cableKind} onChange={handleChange} type="text" className="mt-1" />
            </Label> */}

            <Label className="mt-4">
              <span>Beban</span>
              <input
                id="default-input"
                className="mt-1 p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="burden"
                value={data.burden}
                onChange={handleChange}
                type="text"
              />
            </Label>

            <Label className="mt-4">
              <span>Tegangan (V)</span>
              {/* <Input name="voltage" value={data.voltage} onChange={handleChange} type="number" className="mt-1" /> */}
              <br></br>
              <NumericFormat
                id="default-input"
                className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="voltage"
                value={data.voltage}
                onChange={handleChange}
                thousandSeparator=","
              />
            </Label>

            <Label className="mt-4">
              <span>Arus Listrik (A)</span>
              {/* <Input name="electricCurrent" value={data.electricCurrent} onChange={handleChange} type="number" className="mt-1" /> */}
              <br></br>
              <NumericFormat
                id="default-input"
                className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="electricCurrent"
                value={data.electricCurrent}
                onChange={handleChange}
                thousandSeparator=","
              />
            </Label>

            <Label className="mt-4">
              <span>Daya (P)</span>
              {/* <Input name="power" value={data.power} onChange={handleChange} type="number" className="mt-1" /> */}
              <br></br>
              <NumericFormat
                id="default-input"
                className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="power"
                value={data.power}
                onChange={handleChange}
                thousandSeparator=","
              />
            </Label>

            <p class="mt-3 ml-1 text-xs text-gray-900 dark:text-white">Tanda koma desimal gunakan titik</p>

            <div className="flex flex-row justify-center mt-4">
              <div className="text-black-600">
                <Button onClick={save} className="px-10">
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddDaya;

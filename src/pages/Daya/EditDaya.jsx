import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { TableBody, TableContainer, Table, TableHeader, TableCell, TableRow, Avatar, Button, Input, HelperText, Label, Textarea } from "@windmill/react-ui";
import { AiFillEye, AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { HeartIcon, EditIcon, MailIcon } from "../../icons";
import { Select } from "antd";
import { NumericFormat } from "react-number-format";
import "./styles.css";
import { toast, ToastContainer } from "react-toastify";
function EditDaya() {
  const [daya, setDaya] = useState();
  // const [data, setData] = useState({
  //   cableKind: "",
  //   burden: "",
  //   voltage: "",
  //   electricCurrent: "",
  //   power: "",
  // });
  const [panelName, setPanelName] = useState("");
  const [power, setPower] = useState("");
  const [electricCurrent, setElectricCurrent] = useState("");
  const [voltage, setVoltage] = useState("");
  const [burden, setBurden] = useState("");
  const [panelId, setPanelId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState([]);
  const [newPanel, setNewPanel] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  // const handleChange = (evt) => {
  //   setData({
  //     ...data,
  //     [evt.target.name]: evt.target.value,
  //   });
  // };

  // const handleChangeSelect = (value) => {
  //   setPanelId(value.toString());
  // };

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

    // get products id
    var config = {
      method: "get",
      url: `https://maskurtesting.site/public/api/products/${id}`,
      // url: `http://127.0.0.1:8000/api/products/${id}`,
    };

    axios(config)
      .then(function (response) {
        setDaya(response.data.data);
        setPanelName(response.data.data.panel.panelName);
        setBurden(response.data.data.burden);
        setElectricCurrent(response.data.data.electricCurrent);
        setVoltage(response.data.data.voltage);
        setPower(response.data.data.power);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // SAVE
  const save = () => {
    // check sisa daya
    const panelChoose = panel.find((element) => parseInt(element.id) === parseInt(daya.panel.id));

    let cekdaya = parseFloat(daya.power) - parseFloat(power.replace(/,/g, ""));

    if (parseFloat(cekdaya) === 0) {
      var body = JSON.stringify({
        panelId: daya.panel.id,
        burden: burden,
        voltage: parseFloat(voltage.replace(/,/g, "")).toString(),
        electricCurrent: parseFloat(electricCurrent.replace(/,/g, "")).toString(),
        power: parseFloat(power.replace(/,/g, "")).toString(),
      });

      var config = {
        method: "put",
        url: `https://maskurtesting.site/public/api/products/${id}`,
        // url: `http://127.0.0.1:8000/api/products/${id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: body,
      };

      axios(config)
        .then(function (response) {
          toast.success("edit data berhasil, daya tetap", {
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
          alert("menambahkan daya gagal");
          console.log(error);
        });
    } else if (parseFloat(cekdaya) > 0) {
      var body = JSON.stringify({
        panelId: daya.panel.id,
        burden: burden,
        voltage: parseFloat(voltage.replace(/,/g, "")).toString(),
        electricCurrent: parseFloat(electricCurrent.replace(/,/g, "")).toString(),
        power: parseFloat(power.replace(/,/g, "")).toString(),
      });

      var config = {
        method: "put",
        url: `https://maskurtesting.site/public/api/products/${id}`,
        // url: `http://127.0.0.1:8000/api/products/${id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: body,
      };

      axios(config)
        .then(function (response) {
          var dataBody = JSON.stringify({
            remainingPower: parseFloat(cekdaya) + parseFloat(daya.panel.remainingPower),
          });

          var config = {
            method: "put",
            url: `https://maskurtesting.site/public/api/panel/${daya.panel.id}`,
            // url: `http://127.0.0.1:8000/api/panel/${daya.panel.id}`,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            data: dataBody,
          };

          axios(config)
            .then(function (response) {
              toast.success("edit data berhasil", {
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
          alert("menambahkan daya gagal");
          console.log(error);
        });
    } else if (parseFloat(cekdaya) < 0) {
      if (parseFloat(panelChoose.remainingPower) + parseFloat(cekdaya) >= 0) {
        var body = JSON.stringify({
          panelId: daya.panel.id,
          burden: burden,
          voltage: parseFloat(voltage.replace(/,/g, "")).toString(),
          electricCurrent: parseFloat(electricCurrent.replace(/,/g, "")).toString(),
          power: parseFloat(power.replace(/,/g, "")).toString(),
        });

        var config = {
          method: "put",
          url: `https://maskurtesting.site/public/api/products/${id}`,
          // url: `http://127.0.0.1:8000/api/products/${id}`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: body,
        };

        axios(config)
          .then(function (response) {
            var dataBody = JSON.stringify({
              remainingPower: parseFloat(daya.panel.remainingPower) + parseFloat(cekdaya),
            });

            var config = {
              method: "put",
              url: `https://maskurtesting.site/public/api/panel/${daya.panel.id}`,
              // url: `http://127.0.0.1:8000/api/panel/${daya.panel.id}`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              data: dataBody,
            };

            axios(config)
              .then(function (response) {
                toast.success("edit data berhasil", {
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
            alert("menambahkan daya gagal");
            console.log(error);
          });
      } else {
        toast.warn("Gagal di edit, daya melebihi kapasitas", {
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
    }
    // cek dulu gan
    // misal
    // max daya = 1100, sisa = 100, dipake = 1000
    // case dikurangi
    // tak kurangi 900
    // cek beban = beban sebelumnya - beban sekarang = 1000 - 900 = 100
    // sisa daya ditambah = panel.remainingPower + 100 () = 200
    // case ditambah
    // ditambah, cukup
    // tak tambah 1050
    // cek beban = beban sebelumnya - beban sekarang = 1000 - 1050 = -50
    // sisa daya dikurangi = panel.remainingPower + -50 = 50
    // ditambah kurang
    // gagal
    // case tetap
    // tetap
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <PageTitle>Edit Data Beban</PageTitle>
          <ToastContainer />
          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <SectionTitle>Ubah Detail Data Beban</SectionTitle>

            <Label>
              <span>Panel</span>
              <Input name="panelName" value={panelName} disabled type="text" className="mt-1" />
            </Label>

            <Label className="mt-4">
              <span>Beban</span>
              <input
                id="default-input"
                className="mt-1 p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="burden"
                value={burden}
                onChange={(e) => setBurden(e.target.value)}
                type="text"
              />
            </Label>

            <Label className="mt-4">
              <span>Tegangan (V)</span>
              {/* <Input name="voltage" value={voltage} onChange={(e) => setVoltage(e.target.value)} type="number" className="mt-1" /> */}
              <br></br>
              <NumericFormat
                id="default-input"
                className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="voltage"
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                thousandSeparator=","
              />
            </Label>

            <Label className="mt-4">
              <span>Arus Listrik (A)</span>
              {/* <Input name="electricCurrent" value={electricCurrent} onChange={(e) => setElectricCurrent(e.target.value)} type="number" className="mt-1" /> */}
              <br></br>
              <NumericFormat
                id="default-input"
                className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="electricCurrent"
                value={electricCurrent}
                onChange={(e) => setElectricCurrent(e.target.value)}
                thousandSeparator=","
              />
            </Label>

            <Label className="mt-4">
              <span>Daya (P)</span>
              {/* <Input name="power" value={power} onChange={(e) => setPower(e.target.value)} type="number" className="mt-1" /> */}
              <br></br>
              <NumericFormat
                id="default-input"
                className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="power"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                thousandSeparator=","
              />
            </Label>

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

export default EditDaya;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Button, Input, Label } from "@windmill/react-ui";
import { toast, ToastContainer } from "react-toastify";
import { NumericFormat } from "react-number-format";
import "./styles.css";
function EditPanel() {
  const [loading, setLoading] = useState(true);
  const [panelPower, setPanelPower] = useState("");
  const [panelName, setPanelName] = useState("");
  const [data, setData] = useState({});
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    var config = {
      method: "get",
      url: `https://maskurtesting.site/public/api/panel/${id}`,
      // url: `http://127.0.0.1:8000/api/panel/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        setData(response.data.data);
        setPanelName(response.data.data.panelName);
        setPanelPower(response.data.data.maxPower);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const save = () => {
    // jika sama
    if (parseFloat(panelPower.replace(/,/g, "")) == parseFloat(data.maxPower)) {
      var dataBody = JSON.stringify({
        panelName: panelName,
      });
      var config = {
        method: "put",
        url: `https://maskurtesting.site/public/api/panel/${id}`,
        // url: `http://127.0.0.1:8000/api/panel/${id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: dataBody,
      };

      axios(config)
        .then(function (response) {
          toast.success("Edit panel Berhasil", {
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
          toast.warn("edit panel gagal", {
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
    } else if (parseFloat(panelPower.replace(/,/g, "")) > parseFloat(data.maxPower)) {
      // jika nambah
      const powerAdded = parseFloat(panelPower.replace(/,/g, "")) - parseFloat(data.maxPower);

      var dataBody = JSON.stringify({
        panelName: panelName,
        maxPower: parseFloat(panelPower.replace(/,/g, "")).toString(),
        remainingPower: parseFloat(data.remainingPower) + parseFloat(powerAdded),
      });
      var config = {
        method: "put",
        url: `https://maskurtesting.site/public/api/panel/${id}`,
        // url: `http://127.0.0.1:8000/api/panel/${id}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: dataBody,
      };

      axios(config)
        .then(function (response) {
          toast.success("Edit panel Berhasil", {
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
          toast.warn("edit panel gagal", {
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
    } else if (parseFloat(panelPower.replace(/,/g, "")) < parseFloat(data.maxPower)) {
      // jika kurang
      // misal
      // powerMin = 1200 - 1100 = 100
      // powerMin = 1200 - 900 = 300
      let powerMin = parseFloat(data.maxPower) - parseFloat(panelPower.replace(/,/g, ""));
      if (parseFloat(powerMin) <= parseFloat(data.remainingPower)) {
        var dataBody = JSON.stringify({
          panelName: panelName,
          maxPower: parseFloat(panelPower.replace(/,/g, "")).toString(),
          remainingPower: parseFloat(data.remainingPower) - parseFloat(powerMin),
        });
        var config = {
          method: "put",
          url: `https://maskurtesting.site/public/api/panel/${id}`,
          // url: `http://127.0.0.1:8000/api/panel/${id}`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: dataBody,
        };

        axios(config)
          .then(function (response) {
            toast.success("Edit panel Berhasil", {
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
            toast.warn("edit panel gagal", {
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
      } else {
        toast.warn("edit panel gagal, sisa daya kurang dari 0", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <PageTitle>Edit Panel</PageTitle>
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
                onChange={(e) => {
                  setPanelName(e.target.value);
                }}
              />
            </Label>

            <Label className="mt-4 mb-4">
              <span>Maksimum Daya</span>
              <br></br>
              <NumericFormat
                id="default-input"
                className="p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="panelPower"
                value={panelPower}
                onChange={(e) => {
                  setPanelPower(e.target.value);
                }}
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
        </div>
      )}
    </>
  );
}

export default EditPanel;

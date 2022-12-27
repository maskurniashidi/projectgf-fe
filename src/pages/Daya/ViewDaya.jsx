import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { Button, Input, Label } from "@windmill/react-ui";
import { Select } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
function ViewDaya() {
  const [data, setData] = useState();
  const [panelId, setPanelId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [panel, setPanel] = useState([]);
  const [newPanel, setNewPanel] = useState([]);
  const history = useHistory();
  const [labels, setLabels] = useState([]);
  const { id } = useParams();

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
      url: `https://maskurtesting.site/public/api/products/${id}`,
      // url: `http://127.0.0.1:8000/api/products/${id}`,
    };

    axios(config)
      .then(function (response) {
        setLabels([`${response.data.data.burden}`]);

        setData(response.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      {loading ? (
        "Loading... "
      ) : (
        <div>
          <PageTitle>Detail Penggunaan Daya</PageTitle>

          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <SectionTitle>Detail Penggunaan Daya</SectionTitle>

            <Label>
              <span>Panel</span>
              <Input name="cableKind" value={data.panel.panelName} type="text" className="mt-1" />
            </Label>

            {/* <Label>
              <span>SDP</span>
              <Input name="cableKind" value={data.cableKind} type="text" className="mt-1" />
            </Label> */}

            <Label className="mt-4">
              <span>Beban</span>
              <Input name="burden" value={data.burden} type="text" className="mt-1" />
            </Label>

            <Label className="mt-4">
              <span>Tegangan (V)</span>
              <Input name="voltage" value={parseFloat(data.voltage).toLocaleString("id-ID")} type="text" className="mt-1" />
            </Label>

            <Label className="mt-4">
              <span>Arus Listrik (I)</span>
              <Input name="electricCurrent" value={parseFloat(data.electricCurrent).toLocaleString("id-ID")} type="text" className="mt-1" />
            </Label>

            <Label className="mt-4">
              <span>Daya (P)</span>
              <Input name="power" value={parseFloat(data.power).toLocaleString("id-ID")} type="text" className="mt-1" />
            </Label>
          </div>
        </div>
      )}

      <div className="mb-8">
        <SectionTitle>Statistik</SectionTitle>
        <div className="px-6 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <SectionTitle>Statistik Penggunaan Beban</SectionTitle>
          <div style={{ width: "100%" }}>
            {loading ? (
              "Loading"
            ) : (
              <Bar
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Penggunaan Beban",
                    },
                  },
                }}
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Tegangan",
                      data: [parseFloat(data.voltage)],
                      backgroundColor: "rgba(255, 99, 132)",
                    },
                    {
                      label: "Arus Listrik",
                      data: [parseFloat(data.electricCurrent)],
                      backgroundColor: "rgba(53, 162, 235)",
                    },
                    {
                      label: "Daya",
                      data: [parseFloat(data.power)],
                      backgroundColor: "rgb(75, 192, 192)",
                    },
                  ],
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDaya;

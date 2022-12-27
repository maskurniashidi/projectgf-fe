import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import { TableBody, TableContainer, Table, TableHeader, TableCell, TableRow, Input, Label } from "@windmill/react-ui";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
function ViewPanel() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [labels, setLabels] = useState([]);

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
        setLabels(response.data.data.product.map((item) => item.burden));
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <PageTitle>Detail Panel</PageTitle>

          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <SectionTitle>Detail Panel</SectionTitle>

            <Label>
              <span>Nama Panel</span>
              <Input type="text" className="mt-1" value={data.panelName} />
            </Label>

            <Label className="mt-4 mb-4">
              <span>Maksimum Daya</span>
              <Input type="text" className="mt-1" value={parseFloat(data.maxPower).toLocaleString("id-ID")} />
            </Label>

            <Label className="mt-4 mb-4">
              <span>Sisa Daya</span>
              <Input type="text" className="mt-1" value={parseFloat(data.remainingPower).toLocaleString("id-ID")} />
            </Label>
          </div>

          <div className="mb-8">
            <SectionTitle>Daftar Penggunaan</SectionTitle>
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>Beban</TableCell>
                    <TableCell>Tegangan</TableCell>
                    <TableCell>Arus Listrik</TableCell>
                    <TableCell>Daya</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Updated At</TableCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {data.product.map((item) => (
                    <TableRow key={item.id}>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}

      <div className="mb-8">
        <SectionTitle>Statistik</SectionTitle>
        <div className="px-6 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <SectionTitle>Statistik Penggunaan Daya</SectionTitle>
          <div className="mb-10" style={{ width: "25%" }}>
            {loading ? (
              "loading"
            ) : (
              <Pie
                data={{
                  labels: ["Daya Tarpakai", "Sisa Daya"],
                  datasets: [
                    {
                      label: "# of Votes",
                      data: [parseFloat(data.maxPower) - parseFloat(data.remainingPower), parseFloat(data.remainingPower)],
                      backgroundColor: ["rgba(255, 99, 132)", "rgba(54, 162, 235)"],
                      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                      borderWidth: 1,
                    },
                  ],
                }}
              />
            )}
          </div>

          <SectionTitle>Statistik Penggunaan Panel</SectionTitle>
          <div style={{ width: "100%" }}>
            {loading ? (
              "Loading..."
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
                      text: "Penggunaan Panel",
                    },
                  },
                }}
                data={{
                  labels,
                  datasets: [
                    {
                      label: "Tegangan",
                      data: data.product.map((item) => parseFloat(item.voltage)),
                      backgroundColor: "rgba(255, 99, 132)",
                    },
                    {
                      label: "Arus Listrik",
                      data: data.product.map((item) => parseFloat(item.electricCurrent)),
                      backgroundColor: "rgba(53, 162, 235)",
                    },
                    {
                      label: "Daya",
                      data: data.product.map((item) => parseFloat(item.power)),
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

export default ViewPanel;

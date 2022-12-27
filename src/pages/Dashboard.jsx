import React, { useEffect, useState } from "react";
import axios from "axios";
import InfoCard from "../components/Cards/InfoCard";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import { MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import { TableBody, TableContainer, Table, TableHeader, TableCell, TableRow } from "@windmill/react-ui";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [daya, setDaya] = useState([]);
  const [panel, setPanel] = useState([]);
  const [totalDaya, setTotalDaya] = useState();
  const [totalUser, setTotalUser] = useState();
  const [totalPanel, setTotalPanel] = useState();
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
        setTotalDaya(response.data.data.length);
        const data = response.data.data.reverse();
        setDaya(data.reverse().slice(0, 5));
      })
      .catch(function (error) {
        console.log(error);
      });
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
        setTotalPanel(response.data.data.length);
        const data = response.data.data.reverse();

        setPanel(data.slice(0, 5));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // get user
  const getUser = () => {
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
        setTotalUser(response.data.data.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getDaya();
    getPanel();
    getUser();
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <PageTitle>Dashboard</PageTitle>
          {/* <!-- Cards --> */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
            {user.roleId == 1 && (
              <InfoCard title="Total User" value={totalUser}>
                <RoundIcon icon={PeopleIcon} iconColorClass="text-orange-500 dark:text-orange-100" bgColorClass="bg-orange-100 dark:bg-orange-500" className="mr-4" />
              </InfoCard>
            )}

            <InfoCard title="Total Panel" value={totalPanel}>
              <RoundIcon icon={MoneyIcon} iconColorClass="text-green-500 dark:text-green-100" bgColorClass="bg-green-100 dark:bg-green-500" className="mr-4" />
            </InfoCard>

            {/* <InfoCard title="Total Daya" value={totalDaya}>
              <RoundIcon icon={CartIcon} iconColorClass="text-blue-500 dark:text-blue-100" bgColorClass="bg-blue-100 dark:bg-blue-500" className="mr-4" />
            </InfoCard> */}
          </div>

          <SectionTitle>Panel Terbaru</SectionTitle>

          <div className="mb-8">
            <TableContainer>
              <Table>
                <TableHeader>
                  <tr>
                    {/* <TableCell>Id</TableCell> */}
                    <TableCell>Panel</TableCell>
                    <TableCell>Max Daya</TableCell>
                    <TableCell>Sisa Daya</TableCell>
                    <TableCell>Total Beban</TableCell>
                    <TableCell>Created At</TableCell>
                  </tr>
                </TableHeader>
                {panel.map((item) => (
                  <TableBody key={item.id}>
                    <TableRow>
                      <TableCell>
                        <span className="text-sm">{item.panelName}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{parseFloat(item.maxPower).toLocaleString("id-ID")} V</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{parseFloat(item.remainingPower).toLocaleString("id-ID")} V</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{item.product.length}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{item.created_at.slice(0, 10)}</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
          </div>

          <SectionTitle>Data Beban Terbaru</SectionTitle>

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
                  </tr>
                </TableHeader>
                <TableBody>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;

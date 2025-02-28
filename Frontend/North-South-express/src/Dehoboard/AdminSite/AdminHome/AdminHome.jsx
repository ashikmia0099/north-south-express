import React, { useContext, useEffect } from "react";
import Chart from "react-apexcharts";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useRole from "../../../hooks/useRole";

const AdminHome = () => {
    const { users, setUsers, totalUser } = useContext(AuthContext);

    const [role, isLoading] = useRole()
    console.log(role)

  

    const options = {
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
    };

    const series = [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
    ];

    return (
        <div>
         

            {/* chart */}
            <div className=" ">
                {/* bar chart */}
                <div className="my-10">
                    
                    <div className="app my-10">
                        <div className="row">
                            <div className="mixed-chart">
                                <Chart options={options} series={series} type="bar" width="100%" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* line chart */}
                <div className="mt-20">
                    <h1 className="2xl lg:text-4xl font-semibold uppercase">Delivered parcels</h1>
                    <div className="app">
                        <div className="row">
                            <div className="mixed-chart">
                                <Chart options={options} series={series} type="line" width="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;

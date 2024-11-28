// import { useState, useEffect } from "react";
// import {
//   ComposedChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import axiosInstance from "../../api/axiosInstance";

// const FranchiseSalesChart = () => {
//   const [salesData, setSalesData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get("/franchise/sales-categories");
//         console.log("API Response:", response.data); // Log the entire response

//         if (Array.isArray(response.data)) {
//           setSalesData(response.data);
//         } else if (response.data && Array.isArray(response.data.data)) {
//           setSalesData(response.data.data);
//         } else {
//           setError("Unexpected data format received");
//           console.error("Unexpected data format:", response.data);
//         }
//       } catch (err) {
//         setError("Error fetching data: " + err.message);
//         console.error("Error details:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!salesData) {
//     return <div>Loading...</div>;
//   }

//   // Prepare data for the chart
//   const chartData = salesData.map((range) => ({
//     name: range.rangeName,
//     franchises: range.franchises.length,
//     totalSales: range.franchises.reduce(
//       (sum, franchise) => sum + franchise.totalSales,
//       0
//     ),
//   }));

//   return (
//     <div style={{ width: "100%", height: 800 }}>
//       <h2>Franchise Sales Categories</h2>

//       <ResponsiveContainer width="100%" height={500}>
//         <ComposedChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//           <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//           <Tooltip />
//           <Legend />

//           {/* Bars for Number of Franchises */}
//           <Bar
//             yAxisId="left"
//             dataKey="franchises"
//             fill="#8884d8"
//             name="Number of Franchises"
//           />

//           {/* Line for Total Sales */}
//           <Line
//             yAxisId="right"
//             type="monotone"
//             dataKey="totalSales"
//             stroke="#82ca9d"
//             name="Total Sales"
//             activeDot={{ r: 8 }}
//           />
//         </ComposedChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default FranchiseSalesChart;
//============================================================
// import { useState, useEffect } from "react";
// import {
//   ComposedChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import axiosInstance from "../../api/axiosInstance";

// const FranchiseSalesChart = () => {
//   const [salesData, setSalesData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get("/franchise/sales-categories");
//         console.log("API Response:", response.data); // Log the entire response

// if (Array.isArray(response.data)) {
//   setSalesData(response.data);
// } else if (response.data && Array.isArray(response.data.data)) {
//   setSalesData(response.data.data);
// } else {
//   setError("Unexpected data format received");
//   console.error("Unexpected data format:", response.data);
// }
//       } catch (err) {
//         setError("Error fetching data: " + err.message);
//         console.error("Error details:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!salesData) {
//     return <div>Loading...</div>;
//   }

//   // Prepare data for the chart
//   const chartData = salesData.map((range) => ({
//     name: range.rangeName,
//     franchises: range.franchises.length,
//     totalSales: range.franchises.reduce(
//       (sum, franchise) => sum + franchise.totalSales,
//       0
//     ),
//   }));

//   return (
//     <div style={{ width: "100%" }}>
//       <h2>Franchise Sales Categories</h2>

//       <ResponsiveContainer width="100%" height={500}>
//         <ComposedChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//           <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//           <Tooltip />
//           <Legend />

//           {/* Bars for Number of Franchises */}
//           <Bar
//             yAxisId="left"
//             dataKey="franchises"
//             fill="#8884d8"
//             name="Number of Franchises"
//           />

//           {/* Line for Total Sales */}
//           <Line
//             yAxisId="right"
//             type="monotone"
//             dataKey="totalSales"
//             stroke="#82ca9d"
//             name="Total Sales"
//             activeDot={{ r: 8 }}
//           />
//         </ComposedChart>
//       </ResponsiveContainer>

//       <h3>Franchise Sales Data</h3>
//       <table
//         border="1"
//         cellPadding="10"
//         style={{ width: "100%", marginTop: "20px", textAlign: "left" }}
//       >
//         <thead>
//           <tr>
//             <th>Sales Range</th>
//             <th>Number of Franchises</th>
//             <th>Total Sales</th>
//           </tr>
//         </thead>
//         <tbody>
//           {chartData.map((data, index) => (
//             <tr key={index}>
//               <td>{data.name}</td>
//               <td>{data.franchises}</td>
//               <td>{data.totalSales.toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FranchiseSalesChart;
//===================================================
// import { useState, useEffect } from "react";
// import {
//   ComposedChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import axiosInstance from "../../api/axiosInstance";

// const FranchiseSalesChart = () => {
//   const [salesData, setSalesData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get("/franchise/sales-categories");
//         console.log("API Response:", response.data); // Log the entire response

//         // Check if response is in the expected format
//         if (
//           response.data &&
//           typeof response.data === "object" &&
//           !Array.isArray(response.data)
//         ) {
//           const data = response.data;

//           // Process the response data
//           const chartData = Object.keys(data).flatMap((period) => {
//             return data[period].map((range) => ({
//               month: period,
//               rangeName: range.rangeName,
//               franchises: range.franchises.length,
//               totalSales: range.franchises.reduce(
//                 (sum, franchise) => sum + (franchise.totalSales || 0),
//                 0
//               ),
//             }));
//           });

//           setSalesData(chartData);
//         } else {
//           setError("Unexpected response structure");
//           console.error("Unexpected response structure:", response.data);
//         }
//       } catch (err) {
//         setError("Error fetching data: " + err.message);
//         console.error("Error details:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!salesData.length) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ width: "100%" }}>
//       <h2>Franchise Sales Categories</h2>

//       <ResponsiveContainer width="100%" height={500}>
//         <ComposedChart data={salesData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//           <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//           <Tooltip />
//           <Legend />

//           {/* Bars for Number of Franchises */}
//           <Bar
//             yAxisId="left"
//             dataKey="franchises"
//             fill="#8884d8"
//             name="Number of Franchises"
//           />

//           {/* Line for Total Sales */}
//           <Line
//             yAxisId="right"
//             type="monotone"
//             dataKey="totalSales"
//             stroke="#82ca9d"
//             name="Total Sales"
//             activeDot={{ r: 8 }}
//           />
//         </ComposedChart>
//       </ResponsiveContainer>

//       <h3>Franchise Sales Data</h3>
//       <table
//         border="1"
//         cellPadding="10"
//         style={{ width: "100%", marginTop: "20px", textAlign: "left" }}
//       >
//         <thead>
//           <tr>
//             <th>Month</th>
//             <th>Sales Range</th>
//             <th>Number of Franchises</th>
//             <th>Total Sales</th>
//           </tr>
//         </thead>
//         <tbody>
//           {salesData.map((data, index) => (
//             <tr key={index}>
//               <td>{data.month}</td>
//               <td>{data.rangeName}</td>
//               <td>{data.franchises}</td>
//               <td>{data.totalSales.toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FranchiseSalesChart;
//==============================================
// import { useState, useEffect } from "react";
// import {
//   ComposedChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import axiosInstance from "../../api/axiosInstance";
// import { DateRangePicker } from "react-date-range";
// import "react-date-range/dist/styles.css"; // Include the date range picker styles
// import "react-date-range/dist/theme/default.css"; // Include the date range picker theme

// const FranchiseSalesChart = () => {
//   const [salesData, setSalesData] = useState([]);
//   const [error, setError] = useState(null);
//   const [dateRange, setDateRange] = useState({
//     startDate: new Date(new Date().setDate(new Date().getDate() - 28)),
//     endDate: new Date(),
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { startDate, endDate } = dateRange;
//         const response = await axiosInstance.get(
//           "/franchise/sales-categories",
//           {
//             params: {
//               startDate: startDate.toISOString(),
//               endDate: endDate.toISOString(),
//             },
//           }
//         );
//         console.log("API Response:", response.data); // Log the entire response

//         // Check if response is an array
//         if (Array.isArray(response.data)) {
//           const chartData = response.data.flatMap((range) => ({
//             month: range.month, // Adjust according to actual data structure
//             rangeName: range.rangeName,
//             franchises: range.franchises.length,
//             totalSales: range.franchises.reduce(
//               (sum, franchise) => sum + (franchise.totalSales || 0),
//               0
//             ),
//           }));

//           setSalesData(chartData);
//         } else {
//           setError("Unexpected response structure");
//           console.error("Unexpected response structure:", response.data);
//         }
//       } catch (err) {
//         setError("Error fetching data: " + err.message);
//         console.error("Error details:", err);
//       }
//     };

//     fetchData();
//   }, [dateRange]);

//   const handleDateRangeChange = (ranges) => {
//     setDateRange({
//       startDate: ranges.selection.startDate,
//       endDate: ranges.selection.endDate,
//     });
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!salesData.length) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ width: "100%" }}>
//       <h2>Franchise Sales Categories</h2>

//       <DateRangePicker
//         ranges={[
//           {
//             startDate: dateRange.startDate,
//             endDate: dateRange.endDate,
//             key: "selection",
//           },
//         ]}
//         onChange={handleDateRangeChange}
//       />

//       <ResponsiveContainer width="100%" height={500}>
//         <ComposedChart data={salesData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//           <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//           <Tooltip />
//           <Legend />

//           {/* Bars for Number of Franchises */}
//           <Bar
//             yAxisId="left"
//             dataKey="franchises"
//             fill="#8884d8"
//             name="Number of Franchises"
//           />

//           {/* Line for Total Sales */}
//           <Line
//             yAxisId="right"
//             type="monotone"
//             dataKey="totalSales"
//             stroke="#82ca9d"
//             name="Total Sales"
//             activeDot={{ r: 8 }}
//           />
//         </ComposedChart>
//       </ResponsiveContainer>

//       <h3>Franchise Sales Data</h3>
//       <table
//         border="1"
//         cellPadding="10"
//         style={{ width: "100%", marginTop: "20px", textAlign: "left" }}
//       >
//         <thead>
//           <tr>
//             <th>Month</th>
//             <th>Sales Range</th>
//             <th>Number of Franchises</th>
//             <th>Total Sales</th>
//           </tr>
//         </thead>
//         <tbody>
//           {salesData.map((data, index) => (
//             <tr key={index}>
//               <td>{data.month}</td>
//               <td>{data.rangeName}</td>
//               <td>{data.franchises}</td>
//               <td>{data.totalSales.toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FranchiseSalesChart;
//===============================================
// import { useState, useEffect } from "react";
// import {
//   ComposedChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import axiosInstance from "../../api/axiosInstance";
// import { DateRangePicker } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";

// const FranchiseSalesChart = () => {
//   const [salesData, setSalesData] = useState([]);
//   const [error, setError] = useState(null);
//   const [dateRange, setDateRange] = useState({
//     startDate: new Date(new Date().setDate(new Date().getDate() - 28)),
//     endDate: new Date(),
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { startDate, endDate } = dateRange;
//         const response = await axiosInstance.get(
//           "/franchise/sales-categories",
//           {
//             params: {
//               startDate: startDate.toISOString(),
//               endDate: endDate.toISOString(),
//             },
//           }
//         );
//         console.log("API Response:", response.data);

//         if (Array.isArray(response.data)) {
//           const chartData = response.data.flatMap((range) => ({
//             month: range.month,
//             rangeName: range.rangeName,
//             franchises: range.franchises.length,
//             totalSales: range.franchises.reduce(
//               (sum, franchise) => sum + (franchise.totalSales || 0),
//               0
//             ),
//           }));

//           setSalesData(chartData);
//         } else {
//           setError("Unexpected response structure");
//           console.error("Unexpected response structure:", response.data);
//         }
//       } catch (err) {
//         setError("Error fetching data: " + err.message);
//         console.error("Error details:", err);
//       }
//     };

//     fetchData();
//   }, [dateRange]);

//   const handleDateRangeChange = (ranges) => {
//     setDateRange({
//       startDate: ranges.selection.startDate,
//       endDate: ranges.selection.endDate,
//     });
//   };

//   const selectionRange = {
//     startDate: dateRange.startDate,
//     endDate: dateRange.endDate,
//     key: "selection",
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!salesData.length) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ width: "100%" }}>
//       <h2>Franchise Sales Categories</h2>

//       <div className="flex px-6">
//         <div className="w-2/3">
//           <ResponsiveContainer width="100%" height={500}>
//             <ComposedChart data={salesData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//               <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//               <Tooltip />
//               <Legend />

//               {/* Bars for Number of Franchises */}
//               <Bar
//                 yAxisId="left"
//                 dataKey="franchises"
//                 fill="#8884d8"
//                 name="Number of Franchises"
//               />

//               {/* Line for Total Sales */}
//               <Line
//                 yAxisId="right"
//                 type="monotone"
//                 dataKey="totalSales"
//                 stroke="#82ca9d"
//                 name="Total Sales"
//                 activeDot={{ r: 8 }}
//               />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="">
//           <DateRangePicker
//             ranges={[selectionRange]}
//             onChange={handleDateRangeChange}
//             className="date-picker"
//           />
//         </div>
//       </div>
//       <div className="w-full flex justify-between px-16">
//         <div className="flex-1">
//           <h3>Franchise Sales Data</h3>
//           <table
//             border="1"
//             cellPadding="10"
//             style={{ width: "100%", marginTop: "20px", textAlign: "left" }}
//           >
//             <thead>
//               <tr>
//                 <th>Sales Range</th>
//                 <th>Number of Franchises</th>
//                 <th>Total Sales</th>
//                 <th>Commission to Franchises and Agents</th>
//               </tr>
//             </thead>
//             <tbody>
//               {salesData.map((data, index) => (
//                 <tr key={index}>
//                   <td>{data.rangeName}</td>
//                   <td>{data.franchises}</td>
//                   <td>{data.totalSales.toLocaleString()}</td>
//                   <td>
//                     <input type="p-1 border border-gray-300 rounded mr-2"></input>
//                     <button className="border bg-gray-200 px-2 py-1 rounded-xl">
//                       OK
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FranchiseSalesChart;
//=========================================
import { useState, useEffect } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../api/axiosInstance";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const FranchiseSalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 28)),
    endDate: new Date(),
  });
  const [commissionRates, setCommissionRates] = useState({});
  const [commissionData, setCommissionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { startDate, endDate } = dateRange;
        const response = await axiosInstance.get(
          "/franchise/sales-categories",
          {
            params: {
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
            },
          }
        );
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          const chartData = response.data.flatMap((range) => ({
            month: range.month,
            rangeName: range.rangeName,
            franchises: range.franchises.length,
            totalSales: range.franchises.reduce(
              (sum, franchise) => sum + (franchise.totalSales || 0),
              0
            ),
          }));

          setSalesData(chartData);

          // Initialize commission rates
          const initialRates = {};
          chartData.forEach((data) => {
            initialRates[data.rangeName] = 0;
          });
          setCommissionRates(initialRates);
        } else {
          setError("Unexpected response structure");
          console.error("Unexpected response structure:", response.data);
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
        console.error("Error details:", err);
      }
    };

    fetchData();
  }, [dateRange]);

  const handleDateRangeChange = (ranges) => {
    setDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  const handleCommissionChange = (rangeName, value) => {
    setCommissionRates((prev) => ({
      ...prev,
      [rangeName]: parseFloat(value) || 0,
    }));
  };

  const handleDistributeCommissions = async () => {
    try {
      const { startDate, endDate } = dateRange;
      const response = await axiosInstance.post("/distribute-commissions", {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        commissionRates,
      });
      setCommissionData(response.data);
    } catch (err) {
      setError("Error distributing commissions: " + err.message);
      console.error("Error details:", err);
    }
  };

  const selectionRange = {
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    key: "selection",
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!salesData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <h2>Franchise Sales Categories</h2>

      <div className="flex px-6">
        <div className="w-2/3">
          <ResponsiveContainer width="100%" height={500}>
            <ComposedChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="franchises"
                fill="#8884d8"
                name="Number of Franchises"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalSales"
                stroke="#82ca9d"
                name="Total Sales"
                activeDot={{ r: 8 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="">
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleDateRangeChange}
            className="date-picker"
          />
        </div>
      </div>
      <div className="w-full flex justify-between px-16">
        <div className="flex-1">
          <h3>Franchise Sales Data</h3>
          <table
            border="1"
            cellPadding="10"
            style={{ width: "100%", marginTop: "20px", textAlign: "left" }}
          >
            <thead>
              <tr>
                <th>Sales Range</th>
                <th>Number of Franchises</th>
                <th>Total Sales</th>
                {/* <th>Commission Rate</th> */}
                {/* <th>Commission Amount</th> */}
              </tr>
            </thead>
            <tbody>
              {salesData.map((data, index) => {
                const commission = commissionData.find(
                  (c) => c.rangeName === data.rangeName
                );
                return (
                  <tr key={index}>
                    <td>{data.rangeName}</td>
                    <td>{data.franchises}</td>
                    <td>{data.totalSales.toLocaleString()}</td>
                    {/* <td>
                      <input
                        type="number"
                        className="p-1 border border-gray-300 rounded mr-2"
                        value={commissionRates[data.rangeName] || ""}
                        onChange={(e) =>
                          handleCommissionChange(data.rangeName, e.target.value)
                        }
                      />
                      %
                    </td> */}
                    {/* <td>
                      {commission
                        ? commission.commissionAmount.toLocaleString()
                        : "N/A"}
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* <button
            className="mt-4 border bg-blue-500 text-white px-4 py-2 rounded-xl"
            onClick={handleDistributeCommissions}
          >
            Distribute Commissions
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FranchiseSalesChart;

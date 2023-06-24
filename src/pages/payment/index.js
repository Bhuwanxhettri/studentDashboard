'use client';
import NavBar from "@/component/NavBar";
import Khalti from "@/component/khalti/Khalti";
import React from "react";

const index = () => {
  const payments = [
    { date: "2023-05-25", amount: 100 },
    { date: "2023-05-23", amount: 50 },
    { date: "2023-05-20", amount: 75 },
    // Add more payment data as needed
  ];
  return (
    <>
      <NavBar />
      <div className=" ml-56 pt-20  px-5">
        <div className="flex justify-end">
          <Khalti />
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Pay Your Fees
          </button> */}
        </div>
        <h2 className="text-2xl font-bold mb-4">Payment History</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2 px-4 text-center border-b">
                  {payment.date}
                </td>
                <td className="py-2 px-4 text-center border-b">
                  ${payment.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default index;

'use client';
import React, { useEffect } from 'react'
import KhaltiCheckout from "khalti-checkout-web";
import config from './KhaltiConfig';
const Khalti = () => {
  let checkout;
  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkout = new KhaltiCheckout(config);
    }
  }, []);
  return (
    <>
      <button className=" inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => { checkout.show({ amount: 20000 }); }}>Pay Your Bills</button>
    </>
  )
}

export default Khalti
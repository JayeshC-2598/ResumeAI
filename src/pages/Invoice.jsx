import React from "react";
import { Form } from "react-router-dom";

function Invoice() {
  return (
    <div className="w-full max-w-7xl mx-auto pb-8 px-5">
      <div className="grid grid-cols-8 text-slate-700">
        <div className="col-span-full md:col-span-2 -bg-red-400 p-5">
          <h2 className="font-bold text-xl mb-5">Invoice Form</h2>
          {/* <p className='pt-5 border-t-2'>Filters</p> */}
          <div className="pt-5 border-t-2 flex flex-wrap gap-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white -font-bold py-2 px-4 rounded pb-2.5">
              This week
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white -font-bold py-2 px-4 rounded pb-2.5">
              Last week
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white -font-bold py-2 px-4 rounded pb-2.5">
              This Month
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white -font-bold py-2 px-4 rounded pb-2.5">
              Last Month
            </button>
          </div>
          <div className="mt-5 border-t-2">
            <form className="mt-5">
              <div class="mb-5">
                <label
                  for="from"
                  class="block mb-2 text-sm font-medium"
                >
                  From Date
                </label>
                <input
                  type="date"
                  id="from"
                  class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div class="mb-5">
                <label
                  for="to"
                  class="block mb-2 text-sm font-medium"
                >
                  To Date
                </label>
                <input
                  type="date"
                  id="to"
                  class="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-full md:col-span-6 bg-green-300"></div>
      </div>
    </div>
  );
}

export default Invoice;

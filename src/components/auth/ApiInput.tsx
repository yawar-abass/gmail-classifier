"use client";
import React, { useState } from "react";

const ApiInput = () => {
  const [apiKey, setApiKey] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    localStorage.setItem("apiKey", newApiKey);
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor="api-key"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Please Enter Your API Key
      </label>
      <input
        type="text"
        id="api-key"
        value={apiKey}
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Enter your API key"
        required
      />
    </div>
  );
};

export default ApiInput;

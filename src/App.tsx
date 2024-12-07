import React, { useState, ChangeEvent } from "react";

type FieldsType = {
  YearsOfExperience: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  City: string;
  Email: string;
};

const DefaultFields: FieldsType = {
  YearsOfExperience: "",
  FirstName: "",
  LastName: "",
  PhoneNumber: "",
  City: "",
  Email: "",
};

const ChromeStorageComponent: React.FC = () => {
  const [fields, setFields] = useState<FieldsType>(DefaultFields);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handelSave = () => {
    if (typeof window !== "undefined" && "chrome" in window) {
      // Send message to the content script
      window.postMessage({ type: "SAVE_DETAILS", details: fields }, "*");
      alert("Email sent to Chrome Extension!");
    } else {
      console.error("Chrome APIs are not available.");
      alert("This feature works only in Chrome with the extension installed.");
    }
  };

  return (
    <div className="h-[500px] flex-shrink-0 antialiased">
      <div className="p-4 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Chrome Storage Example</h1>
          <form>
            {Object.keys(fields).map((key) => (
              <div key={key} className="mb-4">
                <label htmlFor={key} className="block text-gray-700 font-medium">
                  {key}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={(fields as Record<string, string>)[key]}
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2"
                />
              </div>
            ))}
          </form>
          <button
            onClick={handelSave}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChromeStorageComponent;
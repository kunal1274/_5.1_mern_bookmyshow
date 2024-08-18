import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
// https://medium.com/@gb.usmanumar/how-to-export-data-to-excel-xlsx-in-react-js-8f3ccccba875
// https://medium.com/@gb.usmanumar/how-to-import-data-from-excel-xlsx-in-react-js-f486a600dc9f
// https://www.youtube.com/watch?v=RN_hrvgd6xY

// Function to flatten nested objects
export const flattenObject = (obj, parentKey = "", separator = ".") => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = parentKey ? `${parentKey}${separator}${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      Object.assign(acc, flattenObject(obj[key], newKey, separator));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
};

// Function to handle arrays within the object (like contact and address)
export const flattenArray = (arr, parentKey = "", separator = ".") => {
  return arr.reduce((acc, item, index) => {
    Object.assign(
      acc,
      flattenObject(item, `${parentKey}${separator}${index}`, separator)
    );
    return acc;
  }, {});
};

// Function to transform data for export
export const transformData = (data) => {
  return data.map((item) => {
    const flattenedItem = flattenObject(item);
    if (item.contact && Array.isArray(item.contact)) {
      Object.assign(flattenedItem, flattenArray(item.contact, "contact"));
    }
    if (item.address && Array.isArray(item.address)) {
      Object.assign(flattenedItem, flattenArray(item.address, "address"));
    }
    return flattenedItem;
  });
};

const ExcelExport = ({ data, fileName }) => {
  const exportToExcel = () => {
    // Transform the data before exporting
    const transformedData = transformData(data);

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return <button onClick={exportToExcel}>Export to Excel</button>;
};

export default ExcelExport;

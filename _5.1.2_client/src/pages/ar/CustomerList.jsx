import axios from "axios";
import { act, useEffect, useState } from "react";
import cl from "../../utility/cl";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import ExcelExport, { transformData } from "../../excel/ExportExcel";
import { TbAlpha, TbBeta } from "react-icons/tb";

const baseUrl = `http://localhost:3501`;
const secondUrl = `/bms/api/v1`;
const thirdUrl = `/customers`;
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

// https://www.freecodecamp.org/news/how-to-work-with-multiple-checkboxes-in-react/

const data = [
  { id: 1, name: "John Doe", age: 30, profession: "Developer" },
  { id: 2, name: "Jane Smith", age: 25, profession: "Designer" },
];

export const HeaderComponent = ({ checkedProp, onCheckProp }) => {
  return (
    <>
      <tr
        tabIndex="0"
        className="focus:outline-none h-16 border border-gray-100 rounded"
      >
        <td>
          <div className="ml-5">
            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
              <input
                checked={checkedProp}
                onChange={onCheckProp}
                placeholder="checkbox"
                type="checkbox"
                className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
              />
              {checkedProp && (
                <div className="check-icon bg-indigo-700 text-white rounded-sm">
                  <svg
                    className="icon icon-tabler icon-tabler-check"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-base font-bold leading-none text-gray-700">
              Customer Code
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-base font-bold leading-none text-gray-700 ml-2">
              Full Name
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-base font-bold  leading-none text-gray-700 ml-2">
              Mobile
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-base font-bold  leading-none text-gray-700 ml-2">
              Alt. Mobile
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-base font-bold  leading-none text-gray-700 ml-2">
              Email
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-base font-bold  leading-none text-gray-700 ml-2">
              Address
            </p>
          </div>
        </td>
        <td className="pl-4">
          <div className="flex items-center">
            <p className="text-base font-bold leading-none text-gray-700 ml-2">
              Action
            </p>
          </div>
        </td>
      </tr>
      <tr className="h-5"></tr>
    </>
  );
};

export const SearchBarComponent = ({ searchValueProp, onSearchChangeProp }) => {
  return (
    <div className="relative  text-gray-600">
      <input
        className="border-2 border-gray-300 bg-white h-12 px-5 pr-16 rounded-lg text-sm focus:outline-1"
        type="search"
        name="search"
        value={searchValueProp}
        onChange={onSearchChangeProp}
        placeholder="Search ..."
      />
      <button type="submit" className="absolute right-0 top-0 mt-4 mr-4">
        <svg
          className="text-gray-600 h-4 w-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 56.966 56.966"
          width="512px"
          height="512px"
        >
          <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
        </svg>
      </button>
    </div>
  );
};

function fullAddressFormat2(obj) {
  let parts = [
    obj["street1"],
    obj["street2"],
    obj["city"],
    obj["district"] ?? "",
    [`${obj["state"]} - ${obj["pincode"]}`].filter(Boolean).join(""),
    obj["country"],
  ].filter(Boolean);

  const final = parts.join(" , ");
  // p(final);
  return final.trim();
}

function truncateString(string, start, gap) {
  let ans = "";
  for (let i = start; i < string.length; i += gap) {
    //p(commaedAddress.slice(i, i + gap));
    ans += string.slice(i, i + gap);
    if (i < string.length) {
      ans += "\n";
    }
  }
  return ans.trim();
}

export const RowComponent = ({
  customerCodeProp,
  fullNameProp,
  mobileProp,
  altMobileProp,
  emailProp,
  addressProp,
  checkedProp,
  checkBoxNameProp,
  viewButtonNameProp,
  ellipsisButtonNameProp,
  ellipsisProp,
  onEllipsisClickProp,
  onCheckProp,
  editButtonNameProp,
  onEditProp,
  deleteButtonNameProp,
  onDeleteProp,
  onViewProp,
}) => {
  return (
    <>
      <tr
        tabIndex="0"
        className="focus:outline-none  h-16 border border-gray-100 rounded"
      >
        <td>
          <div className="ml-5">
            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
              <input
                name={checkBoxNameProp}
                placeholder="checkbox"
                checked={checkedProp}
                onChange={onCheckProp}
                type="checkbox"
                className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
              />
              {checkedProp && (
                <div className="check-icon bg-indigo-700 text-white rounded-sm">
                  <svg
                    className="icon icon-tabler icon-tabler-check"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </td>
        <td className="focus:text-indigo-600 ">
          <div className="flex items-center pl-5">
            <p className="text-sm leading-none text-gray-700 mr-2">
              {customerCodeProp}
            </p>
          </div>
        </td>
        <td className="pl-5 ">
          <div className="flex items-center">
            <p
              className=" text-wrap text-sm leading-none text-gray-600 ml-2 max-w-[150px] break-words"
              title={fullNameProp}
            >
              {fullNameProp}
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">
              {mobileProp}
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">
              {altMobileProp}
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2">
              {emailProp}
            </p>
          </div>
        </td>
        <td className="pl-5">
          <div className="flex items-center">
            <p className="text-sm leading-none text-gray-600 ml-2 max-w-[200px] text-wrap break-words">
              {addressProp}
            </p>
          </div>
        </td>
        <td className="pl-4">
          <button
            name={viewButtonNameProp}
            onClick={onViewProp}
            className="relative focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
          >
            View
            <div className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2">
              <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                <TbAlpha />
              </span>
            </div>
          </button>
        </td>
        <td>
          <div className="relative px-5 pt-2">
            <button
              name={ellipsisButtonNameProp}
              className="relative focus:ring-2 rounded-md focus:outline-none"
              onClick={onEllipsisClickProp}
              role="button"
              aria-label="option"
            >
              <svg
                className="dropbtn"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z"
                  stroke="#9CA3AF"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z"
                  stroke="#9CA3AF"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z"
                  stroke="#9CA3AF"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                <span className="inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  <TbAlpha className="w-2 h-2" />
                </span>
              </div>
            </button>
            {ellipsisProp && (
              <div
                className={`dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6`}
              >
                <div
                  name={editButtonNameProp}
                  tabIndex="0"
                  onClick={onEditProp}
                  className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                >
                  <p>Edit</p>
                </div>
                <div
                  name={deleteButtonNameProp}
                  tabIndex="0"
                  onClick={onDeleteProp}
                  className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white"
                >
                  <p>Delete</p>
                </div>
              </div>
            )}
          </div>
        </td>
      </tr>
      <tr className="h-3"></tr>
    </>
  );
};

export const CustomerListComponent2 = () => {
  const [customerList, setCustomerList] = useState([]);
  useEffect(() => {
    async function loadCustomers() {
      const tokenCookie = Cookies.get("token");
      //cl("token in customer in frontend", tokenCookie);
      if (!tokenCookie) {
        // TO DO : Notification with Token Expired
        //navigate("/signin");
        throw new Error(
          "Token not found in the cookie. Please check the front end if we are getting the cookie correctly or not . "
        );
      }
      try {
        const dbResponse = await axios.get(`${mergedUrl}`, {
          headers: {
            Authorization: `Bearer ${tokenCookie}`,
          },
          withCredentials: true,
        });
        cl(dbResponse.data);

        if (dbResponse.data.status === "SUCCESS") {
          cl(dbResponse.data.count, dbResponse.data.data);
          setCustomerList(dbResponse.data.data);
        } else {
          throw new Error(
            `Manually catching this error as the error was not caught properly while fetching data withing first try catch block`
          );
        }
      } catch (error) {
        if (error.response) {
          cl(`Error in response ${error.response}`);
        } else if (error.request) {
          cl(`Error in Request ${error.request}`);
        } else {
          cl(`Error found in Generic section ${error}`);
        }
      }
    }
    loadCustomers();
  }, []);
  return (
    <>
      <div>This page is to display the customer list </div>
      <div>
        <h1>Count of Customers : {customerList.length} </h1>
        <ul>
          {customerList.map((ele, index) => {
            return (
              <li key={ele._id}>
                {ele.code ?? "Not Found"} -{" "}
                {`${ele.firstName ?? "Not Found"} ${
                  ele.lastName ?? "Not Found"
                }`}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export const CustomerListComponent = () => {
  const [customerList, setCustomerList] = useState([]);
  const [filteredCustomerList, setFilteredCustomerList] =
    useState(customerList);
  const [activeEllipsis, setActiveEllipsis] = useState(null);
  const [isCheckedHeader, setIsCheckedHeader] = useState(false);
  const [checkedElements, setCheckedElements] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedDropdown, setSortedDropdown] = useState("Oldest");
  const navigate = useNavigate();
  //const hookExcelExport = useExcelExport(data, "customers");

  const handleEllipsisButton = (customerCode) => {
    //const {name} = e.target;
    // setEllipsis((prevData)=>{
    //   const newValue = {

    //   }
    // })
    // cl(e.target.ellipsisButtonNameProp);
    //setEllipsis(!ellipsis);
    setActiveEllipsis((prevData) =>
      prevData === customerCode ? null : customerCode
    );
  };

  const handleSortingDropdown = (e) => {
    setSortedDropdown(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckHeader = () => {
    setIsCheckedHeader(!isCheckedHeader);

    const newUpdatedCheckedElements = checkedElements.map(
      (ele, index) => !isCheckedHeader
    );
    setCheckedElements(newUpdatedCheckedElements);
  };

  const handleCheckElement = (position) => {
    // const newUpdatedCheckedCustomers = [...checkedElements];
    // newUpdatedCheckedCustomers[index] = !newUpdatedCheckedCustomers[index];
    //cl("old", checkedElements);
    const newUpdatedCheckedCustomers = checkedElements.map((ele, index) =>
      index === position ? !ele : ele
    );
    //cl("new", newUpdatedCheckedCustomers);
    setCheckedElements(newUpdatedCheckedCustomers);
    // setIsCheckedElement((prevCheckedElements) =>
    //   prevCheckedElements.includes(customerCode)
    //     ? prevCheckedElements.filter((ele) => ele !== customerCode)
    //     : [...prevCheckedElements, customerCode]
    // );
  };

  useEffect(() => {
    async function loadCustomers() {
      const tokenCookie = Cookies.get("token");
      //cl("token in customer in frontend", tokenCookie);
      if (!tokenCookie) {
        // TO DO : Notification with Token Expired
        //navigate("/signin");
        navigate("/unauthenticated");
        throw new Error(
          "Token not found in the cookie. Please check the front end if we are getting the cookie correctly or not . "
        );
      }
      try {
        const dbResponse = await axios.get(`${mergedUrl}`, {
          headers: {
            Authorization: `Bearer ${tokenCookie}`,
          },
          withCredentials: true,
        });
        //cl(dbResponse.data);

        if (dbResponse.data.status === "SUCCESS") {
          cl(dbResponse.data.count, dbResponse.data.data);
          setCustomerList(dbResponse.data.data);
          setCheckedElements(new Array(dbResponse.data.count).fill(false));
          //cl("after fetched", checkedElements);
        } else {
          throw new Error(
            `Manually catching this error as the error was not caught properly while fetching data withing first try catch block`
          );
        }
      } catch (error) {
        if (error.response) {
          cl(`Error in response ${error.response}`);
        } else if (error.request) {
          cl(`Error in Request ${error.request}`);
        } else {
          cl(`Error found in Generic section ${error}`);
        }
      }
    }

    loadCustomers();
  }, []);

  useEffect(() => {
    const flatCustomerList = transformData(customerList);
    const filteredCustomers = flatCustomerList.filter((ele, idx) => {
      return Object.values(ele).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setFilteredCustomerList(filteredCustomers);
  }, [searchQuery]);

  // useEffect(() => {
  //   cl("checked elements", checkedElements);
  // }, [checkedElements]);

  return (
    <>
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p
              tabIndex="0"
              className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
            >
              Customers{" "}
              <span className="border mx-4 my-2 px-2 py-1 bg-indigo-600 text-white">
                {customerList.length}
              </span>
            </p>
            <div className="flex space-x-3">
              <SearchBarComponent
                searchValueProp={searchQuery}
                onSearchChangeProp={handleSearch}
              />

              <div className="relative py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                <p>Send SMS</p>
                <div className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    <TbAlpha />
                  </span>
                </div>
              </div>
              <div className="relative py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                <p>
                  <ExcelExport data={customerList} fileName={`example`} />
                </p>
                <div className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-green-600 rounded-full">
                    <TbBeta />
                  </span>
                </div>
              </div>
              <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                <p>Sort By:</p>
                <select
                  aria-label="select"
                  className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
                  value={sortedDropdown}
                  onChange={handleSortingDropdown}
                >
                  {["Oldest", "Latest"].map((ele, idx) => {
                    return (
                      <>
                        <option
                          key={idx}
                          value={ele}
                          className="text-sm text-indigo-800"
                        >
                          {ele}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center">
              <a
                className="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                href=" #"
              >
                <div className="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                  <p>All</p>
                </div>
              </a>

              <a
                className="relative rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="#"
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Done</p>
                </div>
                <div className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    <TbAlpha />
                  </span>
                </div>
              </a>

              <a
                className="relative rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                href="#"
              >
                <div className="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                  <p>Pending</p>
                </div>
                <div className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    <TbAlpha />
                  </span>
                </div>
              </a>
            </div>
            <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
              <p className="text-sm font-medium leading-none text-white">
                <Link to="/customer">Add Customer</Link>
              </p>
            </button>
          </div>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                <HeaderComponent
                  checkedProp={isCheckedHeader}
                  onCheckProp={handleCheckHeader}
                />
                {(searchQuery
                  ? filteredCustomerList
                  : sortedDropdown === "Oldest"
                  ? customerList.toSorted()
                  : customerList.toReversed()
                ).map((ele, idx) => {
                  return (
                    <RowComponent
                      key={ele.code}
                      customerCodeProp={ele.code ?? "Null"}
                      fullNameProp={
                        `${ele.firstName} ${ele.lastName}` ?? "Null"
                      }
                      mobileProp={ele.contact[0].mobile ?? "Not Found"}
                      altMobileProp={ele.contact[0].altMobile ?? "Not Found"}
                      emailProp={ele.contact[0].primaryEmail ?? "Not Found"}
                      addressProp={
                        fullAddressFormat2(ele.address[0]) ?? "Not Found"
                      }
                      checkedProp={checkedElements[idx]}
                      onCheckProp={() => handleCheckElement(idx)}
                      ellipsisButtonNameProp={ele.code}
                      ellipsisProp={activeEllipsis === ele.code}
                      onEllipsisClickProp={() => handleEllipsisButton(ele.code)}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

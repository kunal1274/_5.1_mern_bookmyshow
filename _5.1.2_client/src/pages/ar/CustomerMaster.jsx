import { FaMinus, FaPlus, FaSave, FaUserCircle } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import cl from "../../utility/cl";
import Cookies from "js-cookie";
import { countries } from "../../fixed-data/countries";
import axios from "axios";
import {
  NotificationComponent,
  useNotificationsHook,
} from "../../context/NotificationProvider";
import { useNavigate } from "react-router-dom";

const baseUrl = `http://localhost:3501`;
const secondUrl = `/bms/api/v1`;
const thirdUrl = `/customers`;
const mergedUrl = `${baseUrl}${secondUrl}${thirdUrl}`;

export const RadioButtonComponent = ({
  idValue,
  nameValue,
  checkedValue,
  htmlForValue,
  uiValue,
  classRadioColorValue,
  classRadioColorFocusedValue,
  onChange,
  radioValue,
}) => {
  return (
    <>
      <div className="flex items-center gap-x-3">
        <input
          id={idValue}
          name={nameValue}
          type="radio"
          value={radioValue}
          onChange={onChange}
          checked={checkedValue}
          className={`h-4 w-4 border-gray-300 ${classRadioColorValue} focus:${classRadioColorFocusedValue}`}
        />
        <label
          htmlFor={htmlForValue}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {uiValue}
        </label>
      </div>
    </>
  );
};

export const TextFieldComponent = ({
  htmlForValue,
  labelValue,
  idValue,
  nameValue,
  disabledValue,
  placeholderValue,
  mandatoryProp,
  goodToHaveProp,
  optionalProp,
  systemPushedProp,
  smClassColSpan,
  textValue,
  onChange,
}) => {
  return (
    <>
      <div className={`sm:${smClassColSpan}`}>
        <label
          htmlFor={htmlForValue}
          className={`block text-sm font-medium leading-6 text-gray-900`}
        >
          {labelValue}
          {` `}
          {mandatoryProp && <span className="inline-flex text-red-600">*</span>}
          {goodToHaveProp && (
            <span className="inline-flex text-blue-600">*</span>
          )}
          {optionalProp && (
            <span className="inline-flex text-yellow-500">*</span>
          )}
          {systemPushedProp && (
            <span className="inline-flex text-green-600">*</span>
          )}
        </label>

        <div className="mt-0">
          <input
            id={idValue}
            name={nameValue}
            disabled={disabledValue}
            placeholder={placeholderValue}
            value={textValue}
            onChange={onChange}
            type="text"
            autoComplete="given-name"
            className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          />
        </div>
      </div>
    </>
  );
};

export const ContactTextFieldComponent = ({
  inputTypeValue,
  htmlForValue,
  labelValue,
  idValue,
  nameValue,
  disabledValue,
  placeholderValue,
  autoCompleteValue,
  smClassColSpan,
  textValue,
  errorValue,
  onChange,
}) => {
  const isMobilefield =
    nameValue === "mobile" ||
    nameValue === "alternateMobile" ||
    nameValue === "phone" ||
    nameValue === "workPhone";
  return (
    <>
      <div className={`sm:${smClassColSpan}`}>
        <label
          htmlFor={htmlForValue}
          className={`block text-sm font-medium leading-6 text-gray-900`}
        >
          {labelValue}
        </label>
        <div className="mt-0">
          <input
            id={idValue}
            name={nameValue}
            disabled={disabledValue}
            placeholder={placeholderValue}
            value={textValue}
            onChange={onChange}
            type={inputTypeValue || "text"}
            autoComplete={autoCompleteValue}
            maxLength={isMobilefield ? 10 : undefined}
            className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          />
        </div>
        {errorValue && (
          <p className="text-red-500 text-sm mt-2">{errorValue}</p>
        )}
      </div>
    </>
  );
};

export const FieldGroupComponent = ({
  displayValue,
  subtitleValue,
  cssParentColSpan,
  cssMainTextColSpan,
  cssSubtitleTextColSpan,
  cssMainTextColor,
  cssSubtitleTextColor,
}) => {
  return (
    <>
      <div className={`${cssParentColSpan}`}>
        <h2
          className={`${cssMainTextColSpan} text-base font-semibold leading-7 ${cssMainTextColor}`}
        >
          {displayValue}
        </h2>
        <p
          className={`${cssSubtitleTextColSpan} text-sm leading-6 ${cssSubtitleTextColor}`}
        >
          {subtitleValue}
        </p>
      </div>
    </>
  );
};

export const DropdownComponent = ({
  htmlForValue,
  labelValue,
  idValue,
  nameValue,
  autoCompleteValue,
  disabledValue,
  cssParentColSpanValue,
  cssLabelColorValue,
  cssInputSelectMarginValue,
  currentSelectedValue,
  onChangeValue,
  selectionListValue,
}) => {
  return (
    <>
      <div className={`${cssParentColSpanValue}`}>
        <label
          htmlFor={htmlForValue}
          className={`block text-sm font-medium leading-6 ${cssLabelColorValue}`}
        >
          {labelValue}
        </label>
        <div className={`${cssInputSelectMarginValue}`}>
          <select
            id={idValue}
            name={nameValue}
            disabled={disabledValue}
            value={currentSelectedValue}
            onChange={onChangeValue}
            autoComplete={autoCompleteValue}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {selectionListValue.map((ele, idx) => {
              return (
                <option key={ele.id} value={`${ele.display} (${ele.id})`}>
                  {ele.display}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export const AddressTextFieldComponent = ({
  inputTypeValue,
  htmlForValue,
  labelValue,
  idValue,
  nameValue,
  disabledValue,
  placeholderValue,
  autoCompleteValue,
  cssClassColSpan,
  textValue,
  errorValue,
  notificationValue,
  onChangeAction,
}) => {
  return (
    <>
      <div className={`${cssClassColSpan}`}>
        <label
          htmlFor={htmlForValue}
          className={`block text-sm font-medium leading-6 text-gray-900`}
        >
          {labelValue}
        </label>
        <div className="mt-0">
          <input
            id={idValue}
            name={nameValue}
            disabled={disabledValue}
            placeholder={placeholderValue}
            value={textValue}
            onChange={onChangeAction}
            type={inputTypeValue || "text"}
            autoComplete={autoCompleteValue}
            // maxLength={isMobilefield ? 10 : undefined}
            className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          />
        </div>
        {errorValue && (
          <p className="text-red-500 text-sm mt-2">{errorValue}</p>
        )}
        {notificationValue && (
          <p className="text-green-500 text-sm mt-2">{notificationValue}</p>
        )}
      </div>
    </>
  );
};

export const FullAddressComputedFieldComponent = ({
  htmlForProp,
  labelProp,
  idProp,
  nameProp,
  rowsProp,
  valueProp,
  disabledProp,
  subtitleProp,
  cssParentColSpanProp,
  cssLabelColorProp,
  cssTextAreaMarginProp,
  cssSubtitleMarginProp,
  cssSubtitleColorProp,
}) => {
  return (
    <>
      <div className={`${cssParentColSpanProp}`}>
        <label
          htmlFor={htmlForProp}
          className={`block text-sm font-medium leading-2 ${cssLabelColorProp}`}
        >
          {labelProp}
        </label>
        <div className={`${cssTextAreaMarginProp}`}>
          <textarea
            id={idProp}
            name={nameProp}
            rows={rowsProp}
            className="px-2 block w-full rounded-md border-0 py-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={valueProp}
            disabled={disabledProp}
          />
        </div>
        <p
          className={`${cssSubtitleMarginProp} text-sm leading-6 ${cssSubtitleColorProp}`}
        >
          {subtitleProp}
        </p>
      </div>
    </>
  );
};

export const NotificationInfoComponent = () => {
  return (
    <>
      <div
        className="flex items-center justify-between p-5 leading-normal text-blue-600 bg-blue-100 rounded-lg"
        role="alert"
      >
        <p>Info alert</p>

        <svg
          className="inline w-4 h-4 fill-current ml-2 hover:opacity-80 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z" />
        </svg>
      </div>
    </>
  );
};

export const NotificationFailComponent = () => {
  return (
    <>
      <div className="sticky top-3 left-8 w-1/3 md:w-1/3 mx-auto bg-white pb-6">
        <div
          className="mt-5 flex items-center justify-between p-5 leading-normal text-red-600 bg-red-100 rounded-lg"
          role="alert"
        >
          <p>Error alert</p>

          <svg
            className="inline w-4 h-4 fill-current ml-2 hover:opacity-80 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z" />
          </svg>
        </div>
      </div>
    </>
  );
};
export const NotificationSuccessComponent = () => {
  return (
    <>
      <div class="sticky top-3 left-5 w-1/3 md:w-1/3 mx-auto bg-white p-14">
        <div
          className="mt-5 flex items-center justify-between p-5 leading-normal text-green-600 bg-green-100 rounded-lg"
          role="alert"
        >
          <p>Success alert</p>

          <svg
            className="inline w-4 h-4 fill-current ml-2 hover:opacity-80 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z" />
          </svg>
        </div>
      </div>
    </>
  );
};

const numberRegex = /^\d*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateEmail = (email, regex) => {
  return regex.test(email);
};

const radioOptions = [
  { name: "individual", label: "Individual", value: "Individual" },
  { name: "business", label: "Business", value: "Business" },
];

const contactsFields = [
  {
    htmlFor: "mobile",
    label: "Mobile",
    id: "mobile",
    name: "mobile",
    disabled: false,
    placeholder: "9313476591",
    smclasscolspan: "col-span-3",
    inputtype: "tel",
  },
  {
    htmlFor: "alternate-mobile",
    label: "Alternate Mobile",
    id: "alterante-mobile",
    name: "alternateMobile",
    disabled: false,
    placeholder: "8780680654",
    smclasscolspan: "col-span-3",
    inputtype: "tel",
  },
  {
    htmlFor: "phone",
    label: "Phone",
    id: "phone",
    name: "phone",
    disabled: false,
    placeholder: "8807849423",
    smclasscolspan: "col-span-3",
    inputtype: "tel",
  },
  {
    htmlFor: "work-phone",
    label: "Workphone",
    id: "work-phone",
    name: "workPhone",
    disabled: false,
    placeholder: "0654260654",
    smclasscolspan: "col-span-3",
    inputtype: "tel",
  },
  {
    htmlFor: "primary-email",
    label: "Primary Email address",
    id: "primary-email",
    name: "primaryEmail",
    disabled: false,
    placeholder: "bharat1lakhbce@gmail.com",
    smclasscolspan: "col-span-4",
    inputtype: "email",
  },
  {
    htmlFor: "secondary-email",
    label: "Secondary Email address",
    id: "secondary-email",
    name: "secondaryEmail",
    disabled: false,
    placeholder: "bharatsincebeginning@gmail.com",
    smclasscolspan: "col-span-4",
    inputtype: "email",
  },
];

const countriesTest = [
  { id: "IND", id2: "IN", display: "Bharat/India", value: "Bharat/India" },
  {
    id: "USA",
    id2: "US",
    display: "United States",
    value: "United States Of America",
  },
  { id: "CAN", id2: "CA", display: "Canada", value: "Canada" },
];

const dropdownField = [
  {
    htmlFor: "country",
    label: "Country",
    id: "country",
    name: "country",
    autoComplete: "country",
    disabled: false,
    cssParentColSpan: "sm:col-span-3",
    cssLabelColor: "text-gray-900",
    cssInputSelectMargin: "mt-0",
  },
  {
    htmlFor: "secondaryCountry",
    label: "Country",
    id: "secondaryCountry",
    name: "secondaryCountry",
    autoComplete: "country",
    disabled: false,
    cssParentColSpan: "sm:col-span-3",
    cssLabelColor: "text-gray-900",
    cssInputSelectMargin: "mt-0",
  },
];

const addressFields = [
  {
    htmlFor: "addressLine1",
    label: "Address Line 1",
    id: "addressLine1",
    name: "addressLine1",
    disabled: false,
    placeholder:
      "105 Apekshe Apartment,Room no. 5 , First Floor, Opposite Thirumala/Zolo PG",
    smclasscolspan: "sm:col-span-full",
    inputtype: "text",
    autoComplete: "street-address-1",
  },
  {
    htmlFor: "addressLine2",
    label: "Address Line 2",
    id: "addressLine2",
    name: "addressLine2",
    disabled: false,
    placeholder:
      "2nd Cross Road, Balaji Layout ,Mylasandra , Back Gate Global Village",
    smclasscolspan: "sm:col-span-full",
    inputtype: "text",
    autoComplete: "street-address-1",
  },
  {
    htmlFor: "city",
    label: "City",
    id: "city",
    name: "city",
    disabled: false,
    placeholder: "Bengaluru",
    smclasscolspan: "sm:col-span-2 sm:col-start-1",
    inputtype: "text",
    autoComplete: "city",
  },
  {
    htmlFor: "state",
    label: "State",
    id: "state",
    name: "state",
    disabled: false,
    placeholder: "Karnataka",
    smclasscolspan: "sm:col-span-2",
    inputtype: "text",
    autoComplete: "state",
  },
  {
    htmlFor: "zipcode",
    label: "Zip / Postal Code",
    id: "zipcode",
    name: "zipcode",
    disabled: false,
    placeholder: "560059",
    smclasscolspan: "sm:col-span-2",
    inputtype: "text",
    autoComplete: "zipcode",
  },
];

const secondaryAddressFields = [
  {
    htmlFor: "secondaryAddressLine1",
    label: "Address Line 1",
    id: "secondaryAddressLine1",
    name: "secondaryAddressLine1",
    disabled: false,
    placeholder:
      "105 Apekshe Apartment,Room no. 7 , Second Floor, Opposite Thirumala/Zolo PG",
    smclasscolspan: "sm:col-span-full",
    inputtype: "text",
    autoComplete: "street-secondary-address-1",
  },
  {
    htmlFor: "secondaryAddressLine2",
    label: "Address Line 2",
    id: "secondaryAddressLine2",
    name: "secondaryAddressLine2",
    disabled: false,
    placeholder:
      "2nd Cross Road, Balaji Layout ,Mylasandra , Back Gate Global Village",
    smclasscolspan: "sm:col-span-full",
    inputtype: "text",
    autoComplete: "street-secondary-address-2",
  },
  {
    htmlFor: "secondaryCity",
    label: "City",
    id: "secondaryCity",
    name: "secondaryCity",
    disabled: false,
    placeholder: "Bengaluru",
    smclasscolspan: "sm:col-span-2 sm:col-start-1",
    inputtype: "text",
    autoComplete: "secondary-city",
  },
  {
    htmlFor: "secondaryState",
    label: "State",
    id: "secondaryState",
    name: "secondaryState",
    disabled: false,
    placeholder: "Karnataka",
    smclasscolspan: "sm:col-span-2",
    inputtype: "text",
    autoComplete: "secondary-state",
  },
  {
    htmlFor: "secondaryZipcode",
    label: "Zip / Postal Code",
    id: "secondaryZipcode",
    name: "secondaryZipcode",
    disabled: false,
    placeholder: "560059",
    smclasscolspan: "sm:col-span-2",
    inputtype: "text",
    autoComplete: "secondary-zipcode",
  },
];

export const CustomerComponent = () => {
  const [selectedOption, setSelectedOption] = useState(radioOptions[0].value);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");

  // all the value of initialization should be equal to name of each field input
  const [contactsFormSectionData, setContactsFormSectionData] = useState({
    mobile: "",
    alternateMobile: "",
    phone: "",
    workPhone: "",
    primaryEmail: "",
    secondaryEmail: "",
    contactFormErrors: {},
  });

  const [selectedDropdown, setSelectedDropdown] = useState(
    `${countries[0].display} (${countries[0].id})`
  );

  const [selectedSecondaryDropdown, setSelectedSecondaryDropdown] = useState(
    `${countries[0].display} (${countries[0].id})`
  );

  const [addressFormSectionData, setAddressFormSectionData] = useState({
    fields: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipcode: "",
      fullAddress: `${countries[0].display} (${countries[0].id})`,
    },
    errors: {},
    messages: {},
  });

  const [secondaryAddressFormSectionData, setSecondaryAddressFormSectionData] =
    useState({
      fields: {
        secondaryAddressLine1: "",
        secondaryAddressLine2: "",
        secondaryCity: "",
        secondaryState: "",
        secondaryZipcode: "",
        fullSecondaryAddress: `${countries[0].display} (${countries[0].id})`,
      },
      errors: {},
      messages: {},
    });

  const [isAccordionOpen, setIsAccordionOpen] = useState({
    personalInfoAccordion: false,
    primaryContactsAccordion: false,
    primaryAddressAccordion: false,
    secondaryAddressAccordion: false,
    listOfTabsAccordion: false,
  });

  const [customer, setCustomer] = useState({
    orgType: "",
    firstName: "",
    lastName: "",
    contact: [
      {
        mobile: "",
        altMobile: "",
        phone: "",
        workPhone: "",
        primaryEmail: "",
        secondaryEmail: "",
      },
    ],
    address: [
      {
        street1: "",
        street2: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        country: "",
      },
    ],
    isActive: true,
  });

  const [status, setStatus] = useState("IDLE");

  const navigate = useNavigate();
  const notify = useNotificationsHook();

  const handleSelectedOption = (e) => {
    const checkedValue = e.target.value;
    setSelectedOption(checkedValue);
  };

  const handleChangeFirstName = (e) => {
    const newInputValue = e.target.value;
    setFirstName(newInputValue);
    setFullName(`${newInputValue} ${lastName}`.trim());
  };
  const handleChangeLastName = (e) => {
    const newInputValue = e.target.value;
    setLastName(newInputValue);
    setFullName(`${firstName} ${newInputValue}`.trim());
  };

  const handleChangeContactsFormSection = (e) => {
    const { type, name, value } = e.target;
    const isEmailField = type === "email";

    let errorMessage = "";

    const isMobilefield =
      name === "mobile" ||
      name === "alternateMobile" ||
      name === "phone" ||
      name === "workPhone";

    if (isMobilefield && !numberRegex.test(value)) {
      errorMessage = "Only Numbers are allowed";
      return;
    }

    if (isEmailField && !validateEmail(value, emailRegex)) {
      //   cl("Email id format error message ");
      if (value) {
        errorMessage = "Email Id format is not valid.";
      }
    }

    setContactsFormSectionData((prevData) => {
      const newContactsFormSectionData = {
        ...prevData,
        [name]: value,
        contactFormErrors: {
          ...prevData.contactFormErrors,
          [name]: errorMessage,
        },
      };

      return newContactsFormSectionData;
    });
  };

  const handleSelectDropdown = (e) => {
    setSelectedDropdown(e.target.value);
    // setAddressFormSectionData(addressFormSectionData.fields.fullAddress);
  };

  const handleSelectSecondaryDropdown = () => {
    setSelectedSecondaryDropdown(e.target.value);
  };

  const handleChangeAddressFormSection = (e) => {
    const { id, type, name, value } = e.target;
    let errorMessage = "";
    let notificationMessage = "";
    // write any validation if required.
    const isZipCode = name === "zipcode";
    //cl("selected dropdown value", selectedDropdown);
    if (
      selectedDropdown === `Bharat/India (IND)` &&
      isZipCode &&
      !numberRegex.test(value)
    ) {
      errorMessage = "Only Numbers are allowed";
      return;
    }

    if (isZipCode && value.length > 6) {
      errorMessage = "Zip/Postal code can't exceed 6 digits";
      return;
    }

    setAddressFormSectionData((prevData) => {
      const newAddressFormSectionData = {
        ...prevData,
        fields: {
          ...prevData.fields,
          [name]: value,
        },
        errors: {
          ...prevData.errors,
          [name]: errorMessage,
        },
        messages: {
          ...prevData.messages,
          [name]: notificationMessage,
        },
      };

      // write any formula or function for computed method like Full Address

      return newAddressFormSectionData;
    });
  };

  const handleChangeSecondaryAddressFormSection = (e) => {
    const { id, type, name, value } = e.target;
    let errorMessage = "";
    let notificationMessage = "";
    // write any validation if required.
    const isZipCode = name === "secondaryZipcode";
    //cl("selected dropdown value", selectedSecondaryDropdown);
    if (
      selectedSecondaryDropdown === `Bharat/India (IND)` &&
      isZipCode &&
      !numberRegex.test(value)
    ) {
      errorMessage = "Only Numbers are allowed";
      return;
    }

    if (isZipCode && value.length > 6) {
      errorMessage = "Zip/Postal code can't exceed 6 digits";
      return;
    }

    setSecondaryAddressFormSectionData((prevData) => {
      const newSecondaryAddressFormSectionData = {
        ...prevData,
        fields: {
          ...prevData.fields,
          [name]: value,
        },
        errors: {
          ...prevData.errors,
          [name]: errorMessage,
        },
        messages: {
          ...prevData.messages,
          [name]: notificationMessage,
        },
      };

      // write any formula or function for computed method like Full Address

      return newSecondaryAddressFormSectionData;
    });
  };

  const fullAddressComputed = useMemo(() => {
    const { addressLine1, addressLine2, city, state, zipcode } =
      addressFormSectionData.fields;
    if (addressLine1 || addressLine2 || city || state || zipcode) {
      //   const fullAddressComputed = `${addressLine1}\n${addressLine2}\n${
      //     city ? `${city},` : ""
      //   }${state ? `${state}-` : ""}${
      //     zipcode ? `${zipcode}` : ""
      //   }\n${selectedDropdown}`;

      const parts = [
        addressLine1,
        addressLine2,
        [city, state && `,${state}`, zipcode && `-${zipcode}`]
          .filter(Boolean)
          .join(""),
      ].filter(Boolean);

      const finalFullAddressAfterComputation = `${parts.join(
        "\n"
      )}\n${selectedDropdown}`;
      return finalFullAddressAfterComputation.trim();
    }
    return "";
  }, [
    addressFormSectionData.fields.addressLine1,
    addressFormSectionData.fields.addressLine2,
    addressFormSectionData.fields.city,
    addressFormSectionData.fields.state,
    addressFormSectionData.fields.zipcode,
    selectedDropdown,
  ]);

  const fullSecondaryAddressComputed = useMemo(() => {
    const {
      secondaryAddressLine1,
      secondaryAddressLine2,
      secondaryCity,
      secondaryState,
      secondaryZipcode,
    } = secondaryAddressFormSectionData.fields;
    if (
      secondaryAddressLine1 ||
      secondaryAddressLine2 ||
      secondaryCity ||
      secondaryState ||
      secondaryZipcode
    ) {
      //   const fullAddressComputed = `${addressLine1}\n${addressLine2}\n${
      //     city ? `${city},` : ""
      //   }${state ? `${state}-` : ""}${
      //     zipcode ? `${zipcode}` : ""
      //   }\n${selectedDropdown}`;

      const parts = [
        secondaryAddressLine1,
        secondaryAddressLine2,
        [
          secondaryCity,
          secondaryState && `,${secondaryState}`,
          secondaryZipcode && `-${secondaryZipcode}`,
        ]
          .filter(Boolean)
          .join(""),
      ].filter(Boolean);

      const finalFullSecondaryAddressAfterComputation = `${parts.join(
        "\n"
      )}\n${selectedSecondaryDropdown}`;
      return finalFullSecondaryAddressAfterComputation.trim();
    }
    return "";
  }, [
    secondaryAddressFormSectionData.fields.secondaryAddressLine1,
    secondaryAddressFormSectionData.fields.secondaryAddressLine2,
    secondaryAddressFormSectionData.fields.secondaryCity,
    secondaryAddressFormSectionData.fields.secondaryState,
    secondaryAddressFormSectionData.fields.secondaryZipcode,
    selectedSecondaryDropdown,
  ]);

  const handleCustomerCreate = async (e) => {
    e.preventDefault();
    const tokenCookie = Cookies.get("token");
    //cl("token in customer in frontend", tokenCookie);
    if (!tokenCookie) {
      // TO DO : Notification with Token Expired
      //navigate("/signin");
      throw new Error(
        "Token not found in the cookie. Please check the front end if we are getting the cookie correctly or not . "
      );
    }

    const newCustomer = {
      orgType: selectedOption ?? "Individual",
      firstName: firstName,
      lastName: lastName,
      contact: [
        {
          mobile: contactsFormSectionData.mobile,
          altMobile: contactsFormSectionData.alternateMobile,
          phone: contactsFormSectionData.phone,
          workPhone: contactsFormSectionData.workPhone,
          primaryEmail: contactsFormSectionData.primaryEmail,
          secondaryEmail: contactsFormSectionData.secondaryEmail,
        },
      ],
      address: [
        {
          street1: addressFormSectionData.fields.addressLine1 ?? "NA",
          street2: addressFormSectionData.fields.addressLine2 ?? "NA",
          city: addressFormSectionData.fields.city ?? "NA",
          district: "NA",
          state: addressFormSectionData.fields.state ?? "NA",
          pincode: addressFormSectionData.fields.zipcode ?? 0,
          country: selectedDropdown,
        },
        // {
        //   street1:
        //     secondaryAddressFormSectionData.fields.secondaryAddressLine1 ??
        //     "NA",
        //   street2:
        //     secondaryAddressFormSectionData.fields.secondaryAddressLine2 ??
        //     "NA",
        //   city: secondaryAddressFormSectionData.fields.secondaryCity ?? "NA",
        //   district: "NA",
        //   state: secondaryAddressFormSectionData.fields.secondaryState ?? "NA",
        //   pincode: secondaryAddressFormSectionData.fields.secondaryZipcode ?? 0,
        //   country: selectedSecondaryDropdown,
        // },
      ],
      isActive: true,
    };

    try {
      //cl(newCustomer);
      const dbResponse = await axios.post(`${mergedUrl}`, newCustomer, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenCookie}`,
        },
        withCredentials: true,
      });

      //cl(dbResponse.data);
      if (dbResponse.data.status === "SUCCESS") {
        //cl("The Customer has been created successfully");
        const emitSuccessNotification = {
          type: "green",
          message: `The Customer has been created successfully with code : ${dbResponse.data.data.code} and name :${dbResponse.data.data.fullName}  `,
        };
        notify.addNotification(emitSuccessNotification, 15000);
        //cl("notifications list ", notify.notifications);
        //setStatus("SUCCESS");
        navigate("/customerlist");
      } else {
        throw new Error({
          type: "red",
          message:
            "The error has been found at the time of doing the creation of the customer",
        });
      }
    } catch (error) {
      if (error.response) {
        //cl("error response", error.response);
        const emitFailedNotification = {
          type: "red",
          message: `The Customer creation has been failed Error Response . ${error.response.data.message}`,
        };
        notify.addNotification(emitFailedNotification, 300000);
        //cl("notifications list ", notify.notifications);
      } else if (error.request) {
        //cl("error response", error.response);
        const emitFailedNotification = {
          type: "red",
          message: `The Customer creation has been failed Error Request. ${error.request}`,
        };
        notify.addNotification(emitFailedNotification, 300000);
        //cl("notifications list ", notify.notifications);
      } else {
        //cl("Extra Error caught ", error);
        const emitFailedNotification = {
          type: "red",
          message: `The Customer creation has been failed Error Uncaught. ${error}`,
        };
        notify.addNotification(emitFailedNotification, 300000);
        //cl("notifications list ", notify.notifications);
      }
    }
  };

  useEffect(() => {
    setAddressFormSectionData((prevData) => {
      if (addressFormSectionData.fields.fullAddress != fullAddressComputed) {
        const newAddressFormSectionDataWithFullAddress = {
          ...prevData,
          fields: {
            ...prevData.fields,
            fullAddress: fullAddressComputed,
          },
        };

        return newAddressFormSectionDataWithFullAddress;
      } else {
        return prevData;
      }
    });
  }, [fullAddressComputed]);

  // different use effect as secondary address if not filled then no need to render at all .

  useEffect(() => {
    setSecondaryAddressFormSectionData((prevData) => {
      if (
        secondaryAddressFormSectionData.fields.fullSecondaryAddress !=
        fullSecondaryAddressComputed
      ) {
        const newSecondaryAddressFormSectionDataWithFullAddress = {
          ...prevData,
          fields: {
            ...prevData.fields,
            fullSecondaryAddress: fullSecondaryAddressComputed,
          },
        };

        return newSecondaryAddressFormSectionDataWithFullAddress;
      } else {
        return prevData;
      }
    });
  }, [fullSecondaryAddressComputed]);

  //   useEffect(() => {
  //     cl(
  //       `Current notifications : ${notify.notifications.length} > ${notify.notifications}`
  //     );
  //   }, [notify.notifications]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 border border-gray-300 shadow-md rounded-md my-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {``}
            <div className="text-3xl font-extrabold">Create New Customer</div>
            <button
              className="border m-4 p-2 bg-blue-400 hover:cursor-pointer"
              onClick={() => {
                const newNote = {
                  type: "green",
                  message: `Test Green`,
                };

                notify.addNotification(newNote);
              }}
            >
              Add Green Notification
            </button>

            <button
              className="border m-4 p-2 bg-blue-400 hover:cursor-pointer"
              onClick={() => {
                const newNote = {
                  type: "red",
                  message: `Test RED`,
                };

                notify.addNotification(newNote);
              }}
            >
              Add Red Notification
            </button>

            <button
              className="border m-4 p-2 bg-blue-400 hover:cursor-pointer"
              onClick={() => {
                const newNote = {
                  type: "blue",
                  message: `Test BLUE  <button
              className="border m-4 p-2 bg-blue-400 hover:cursor-pointer"
              onClick={() => notify.setNotificationList([])}
            >
              Clear All Notifications
            </button>`,
                };

                notify.addNotification(newNote);
              }}
            >
              Add Blue Notification
            </button>

            <button
              className="border m-4 p-2 bg-blue-400 hover:cursor-pointer"
              onClick={() => notify.setNotificationList([])}
            >
              Clear All Notifications
            </button>

            <form>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold  border px-3 py-2 shadow-sm rounded-md text-gray-900 hover:bg-gray-600 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomerCreate}
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
              <div className="mt-0 space-y-0">
                <div className="border-b border-gray-900/10 pb-12 mb-4">
                  {/* <AccordionImPure
                    accordionTitleProp={
                      <>
                        <div className="col-span-full">
                          <h2 className="text-base font-semibold leading-7 text-indigo-600">
                            Personal Information
                          </h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            Use this to enter your personal profile.
                          </p>
                        </div>
                      </>
                    }
                    isAccordionOpenProp={isAccordionOpen.personalInfoAccordion}
                    setIsAccordionOpenProp={() => {
                      setIsAccordionOpen((prevData) => {
                        const newAccordionState = {
                          ...prevData,
                          personalInfoAccordion:
                            !isAccordionOpen.personalInfoAccordion,
                        };
                        return newAccordionState;
                      });
                    }}
                    cssParentMarginTopProp={`mt-6`}
                    cssLabelColorProp={`text-indigo-600`}
                    gridRowsProp={1}
                    lgGridColsProp={6}
                    mdGridColsProp={6}
                    smGridColsProp={6}
                    gapProp={4}
                    contentProp={
                      <>
                        <div className="col-span-full">
                          <label
                            htmlFor="photo"
                            className="block mt-8 text-sm font-medium leading-6 text-gray-900"
                          >
                            Photo
                          </label>
                          <div className="mt-2 space-x-4 flex items-center gap-x-3">
                            <FaUserCircle
                              aria-hidden="true"
                              className="h-12 w-12 text-gray-300"
                            />
                            <button
                              type="button"
                              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-not-allowed"
                            >
                              Change
                            </button>
                          </div>
                        </div>

                        <fieldset>
                          <div className="mt-6  space-x-4 flex flex-row items-start justify-start">
                            {radioOptions.map((ele, idx) => {
                              return (
                                <RadioButtonComponent
                                  key={idx}
                                  idValue={ele.name}
                                  nameValue={ele.name}
                                  checkedValue={selectedOption === ele.name}
                                  htmlForValue={ele.name}
                                  uiValue={ele.value}
                                  classRadioColorValue="text-indigo-600"
                                  classRadioColorFocusedValue="text-indigo-500"
                                  onChange={handleSelectedOption}
                                />
                              );
                            })}
                          </div>
                        </fieldset>

                        <div className="mt-8 grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <TextFieldComponent
                            htmlForValue="first-name"
                            labelValue="First Name"
                            idValue="first-name"
                            nameValue="firstName"
                            disabledValue={false}
                            placeholderValue="Bharat"
                            smClassColSpan="col-span-3"
                            textValue={firstName}
                            onChange={handleChangeFirstName}
                          />
                          <TextFieldComponent
                            htmlForValue="last-name"
                            labelValue="Last Name"
                            idValue="last-name"
                            nameValue="lastName"
                            disabledValue={false}
                            placeholderValue="Singh"
                            smClassColSpan="col-span-3"
                            textValue={lastName}
                            onChange={handleChangeLastName}
                          />
                          <TextFieldComponent
                            htmlForValue="full-name"
                            labelValue="Full Name"
                            idValue="full-name"
                            nameValue="fullName"
                            disabledValue={true}
                            placeholderValue="Bharat Singh"
                            smClassColSpan="col-span-4"
                            textValue={fullName}
                          />
                        </div>
                      </>
                    }
                  /> */}

                  <div className="col-span-full">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use this to enter your personal profile.
                    </p>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="photo"
                      className="block mt-8 text-sm font-medium leading-6 text-gray-900"
                    >
                      Photo
                    </label>
                    <div className="mt-2 space-x-4 flex items-center gap-x-3">
                      <FaUserCircle
                        aria-hidden="true"
                        className="h-12 w-12 text-gray-300"
                      />
                      <button
                        type="button"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-not-allowed"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <fieldset>
                    <div className="mt-6  space-x-4 flex flex-row items-start justify-start">
                      {radioOptions.map((ele, idx) => {
                        return (
                          <RadioButtonComponent
                            key={idx}
                            idValue={ele.name}
                            nameValue={ele.name}
                            checkedValue={selectedOption === ele.value}
                            htmlForValue={ele.name}
                            radioValue={ele.value}
                            uiValue={ele.value}
                            classRadioColorValue="text-indigo-600"
                            classRadioColorFocusedValue="text-indigo-500"
                            onChange={handleSelectedOption}
                          />
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <TextFieldComponent
                      htmlForValue="first-name"
                      labelValue="First Name"
                      idValue="first-name"
                      nameValue="firstName"
                      disabledValue={false}
                      placeholderValue="Bharat"
                      smClassColSpan="col-span-3"
                      textValue={firstName}
                      onChange={handleChangeFirstName}
                      mandatoryProp={true}
                      optionalProp={false}
                      goodToHaveProp={false}
                      systemPushedProp={false}
                    />

                    <TextFieldComponent
                      htmlForValue="last-name"
                      labelValue="Last Name"
                      idValue="last-name"
                      nameValue="lastName"
                      disabledValue={false}
                      placeholderValue="Singh"
                      smClassColSpan="col-span-3"
                      textValue={lastName}
                      onChange={handleChangeLastName}
                      mandatoryProp={false}
                      optionalProp={false}
                      goodToHaveProp={true}
                      systemPushedProp={false}
                    />
                    <TextFieldComponent
                      htmlForValue="full-name"
                      labelValue="Full Name"
                      idValue="full-name"
                      nameValue="fullName"
                      disabledValue={true}
                      placeholderValue="Bharat Singh"
                      smClassColSpan="col-span-4"
                      textValue={fullName}
                      mandatoryProp={false}
                      optionalProp={false}
                      goodToHaveProp={false}
                      systemPushedProp={true}
                    />

                    {/* <div className="col-span-full">
                      <h2 className="col-span-full text-base font-semibold leading-7 text-indigo-600">
                        Contacts
                      </h2>
                      <p className="col-span-full text-sm leading-6 text-gray-600">
                        Use this as current or primary or correspondence or
                        emergency contacts
                      </p>
                    </div> */}

                    {/* {contactsFields.map((ele, idx) => {
                      return (
                        <>
                          <ContactTextFieldComponent
                            key={ele.id}
                            inputTypeValue={ele.inputtype}
                            htmlForValue={ele.htmlFor}
                            labelValue={ele.label}
                            idValue={ele.id}
                            nameValue={ele.name}
                            placeholderValue={ele.placeholder}
                            autoCompleteValue="off"
                            smClassColSpan={ele.smclasscolspan}
                            textValue={contactsFormSectionData[ele.name]}
                            errorValue={
                              contactsFormSectionData["contactFormErrors"][
                                ele.name
                              ]
                            }
                            onChange={handleChangeContactsFormSection}
                          />
                        </>
                      );
                    })} */}

                    <AccordionImPure
                      accordionTitleProp={
                        <>
                          <FieldGroupComponent
                            displayValue={`Contacts`}
                            subtitleValue={`Use this as current or primary or correspondence or emergency contacts`}
                            cssParentColSpan={`col-span-full`}
                            cssMainTextColSpan={`col-span-full`}
                            cssSubtitleTextColSpan={`col-span-full`}
                            cssMainTextColor={`text-indigo-600`}
                            cssSubtitleTextColor={`text-gray-600`}
                          />
                        </>
                      }
                      contentProp={
                        <>
                          {contactsFields.map((ele, idx) => {
                            return (
                              <>
                                <ContactTextFieldComponent
                                  key={ele.id}
                                  inputTypeValue={ele.inputtype}
                                  htmlForValue={ele.htmlFor}
                                  labelValue={ele.label}
                                  idValue={ele.id}
                                  nameValue={ele.name}
                                  placeholderValue={ele.placeholder}
                                  autoCompleteValue="off"
                                  smClassColSpan={ele.smclasscolspan}
                                  textValue={contactsFormSectionData[ele.name]}
                                  errorValue={
                                    contactsFormSectionData[
                                      "contactFormErrors"
                                    ][ele.name]
                                  }
                                  onChange={handleChangeContactsFormSection}
                                />
                              </>
                            );
                          })}
                        </>
                      }
                      isAccordionOpenProp={
                        isAccordionOpen.primaryContactsAccordion
                      }
                      setIsAccordionOpenProp={() => {
                        setIsAccordionOpen((prevData) => {
                          const newAccordionState = {
                            ...prevData,
                            primaryContactsAccordion:
                              !isAccordionOpen.primaryContactsAccordion,
                          };
                          return newAccordionState;
                        });
                      }}
                      cssParentMarginTopProp={`mt-2`}
                      cssLabelColorProp={`text-indigo-600`}
                      gridRowsProp={1}
                      lgGridColsProp={6}
                      mdGridColsProp={6}
                      smGridColsProp={6}
                      gapProp={4}
                    />

                    <AccordionImPure
                      accordionTitleProp={
                        <>
                          <FieldGroupComponent
                            displayValue={`Primary Address`}
                            subtitleValue={`Use this as current or primary or correspondence address`}
                            cssParentColSpan={`col-span-full`}
                            cssMainTextColSpan={`col-span-full`}
                            cssSubtitleTextColSpan={`col-span-full`}
                            cssMainTextColor={`text-indigo-600`}
                            cssSubtitleTextColor={`text-gray-600`}
                          />
                        </>
                      }
                      contentProp={
                        <>
                          <DropdownComponent
                            htmlForValue={dropdownField[0].htmlFor}
                            labelValue={dropdownField[0].label}
                            idValue={dropdownField[0].id}
                            nameValue={dropdownField[0].name}
                            autoCompleteValue={dropdownField[0].autoComplete}
                            disabledValue={dropdownField[0].disabled}
                            cssParentColSpanValue={
                              dropdownField[0].cssParentColSpan
                            }
                            cssLabelColorValue={dropdownField[0].cssLabelColor}
                            cssInputSelectMarginValue={
                              dropdownField[0].cssInputSelectMargin
                            }
                            currentSelectedValue={selectedDropdown}
                            onChangeValue={handleSelectDropdown}
                            selectionListValue={countries}
                          />

                          {addressFields.map((ele, idx) => {
                            return (
                              <>
                                <AddressTextFieldComponent
                                  key={ele.id}
                                  inputTypeValue={ele.inputtype || "text"}
                                  htmlForValue={ele.htmlFor}
                                  labelValue={ele.label}
                                  idValue={ele.id}
                                  nameValue={ele.name}
                                  disabledValue={ele.disabled}
                                  placeholderValue={ele.placeholder}
                                  autoCompleteValue={ele.autoComplete}
                                  cssClassColSpan={ele.smclasscolspan}
                                  textValue={
                                    addressFormSectionData["fields"][ele.name]
                                  }
                                  errorValue={
                                    addressFormSectionData["errors"][ele.name]
                                  }
                                  notificationValue={
                                    addressFormSectionData["messages"][ele.name]
                                  }
                                  onChangeAction={
                                    handleChangeAddressFormSection
                                  }
                                />
                              </>
                            );
                          })}

                          <FullAddressComputedFieldComponent
                            htmlForProp={`fullAddress`}
                            idProp={`fullAddress`}
                            nameProp={`fullAddress`}
                            labelProp={`Full Address`}
                            rowsProp={4}
                            valueProp={
                              addressFormSectionData.fields.fullAddress
                            }
                            disabledProp={true}
                            subtitleProp={`This address is as per Indian Format`}
                            cssParentColSpanProp={`col-span-full`}
                            cssLabelColorProp={`text-gray-900`}
                            cssTextAreaMarginProp={`mt-0`}
                            cssSubtitleMarginProp={`mt-0`}
                            cssSubtitleColorProp={`text-gray-600`}
                          />
                        </>
                      }
                      isAccordionOpenProp={
                        isAccordionOpen.primaryAddressAccordion
                      }
                      setIsAccordionOpenProp={() => {
                        setIsAccordionOpen((prevData) => {
                          const newAccordionState = {
                            ...prevData,
                            primaryAddressAccordion:
                              !isAccordionOpen.primaryAddressAccordion,
                          };
                          return newAccordionState;
                        });
                      }}
                      cssParentMarginTopProp={`mt-2`}
                      cssLabelColorProp={`text-indigo-600`}
                      gridRowsProp={1}
                      lgGridColsProp={6}
                      mdGridColsProp={6}
                      smGridColsProp={6}
                      gapProp={4}
                    />

                    {/* <AccordionImPure
                      accordionTitleProp={
                        <>
                          <FieldGroupComponent
                            displayValue="Secondary Address"
                            subtitleValue={`Use this as emergency or permanent or alternative
                        address`}
                            cssParentColSpan={`col-span-full`}
                            cssMainTextColSpan={`col-span-full`}
                            cssSubtitleTextColSpan={`col-span-full`}
                            cssMainTextColor={`text-indigo-600`}
                            cssSubtitleTextColor={`text-gray-600`}
                          />
                        </>
                      }
                      contentProp={
                        <>
                          <DropdownComponent
                            htmlForValue={dropdownField[0].htmlFor}
                            labelValue={dropdownField[0].label}
                            idValue={dropdownField[0].id}
                            nameValue={dropdownField[0].name}
                            autoCompleteValue={dropdownField[0].autoComplete}
                            disabledValue={dropdownField[0].disabled}
                            cssParentColSpanValue={
                              dropdownField[0].cssParentColSpan
                            }
                            cssLabelColorValue={dropdownField[0].cssLabelColor}
                            cssInputSelectMarginValue={
                              dropdownField[0].cssInputSelectMargin
                            }
                            currentSelectedValue={selectedDropdown}
                            onChangeValue={handleSelectDropdown}
                            selectionListValue={countries}
                          />

                          {secondaryAddressFields.map((ele, idx) => {
                            return (
                              <>
                                <AddressTextFieldComponent
                                  key={ele.id}
                                  inputTypeValue={ele.inputtype || "text"}
                                  htmlForValue={ele.htmlFor}
                                  labelValue={ele.label}
                                  idValue={ele.id}
                                  nameValue={ele.name}
                                  disabledValue={ele.disabled}
                                  placeholderValue={ele.placeholder}
                                  autoCompleteValue={ele.autoComplete}
                                  cssClassColSpan={ele.smclasscolspan}
                                  textValue={
                                    secondaryAddressFormSectionData["fields"][
                                      ele.name
                                    ]
                                  }
                                  errorValue={
                                    secondaryAddressFormSectionData["errors"][
                                      ele.name
                                    ]
                                  }
                                  notificationValue={
                                    secondaryAddressFormSectionData["messages"][
                                      ele.name
                                    ]
                                  }
                                  onChangeAction={
                                    handleChangeSecondaryAddressFormSection
                                  }
                                />
                              </>
                            );
                          })}

                          <FullAddressComputedFieldComponent
                            htmlForProp={`fullSecondaryAddress`}
                            idProp={`fullSecondaryAddress`}
                            nameProp={`fullSecondaryAddress`}
                            labelProp={`Full Secondary Address`}
                            rowsProp={4}
                            valueProp={
                              secondaryAddressFormSectionData.fields
                                .fullSecondaryAddress
                            }
                            disabledProp={true}
                            subtitleProp={`This address is as per Indian Format`}
                            cssParentColSpanProp={`col-span-full`}
                            cssLabelColorProp={`text-gray-900`}
                            cssTextAreaMarginProp={`mt-0`}
                            cssSubtitleMarginProp={`mt-0`}
                            cssSubtitleColorProp={`text-gray-600`}
                          />
                        </>
                      }
                      isAccordionOpenProp={
                        isAccordionOpen.secondaryAddressAccordion
                      }
                      setIsAccordionOpenProp={() => {
                        setIsAccordionOpen((prevData) => {
                          const newAccordionState = {
                            ...prevData,
                            secondaryAddressAccordion:
                              !isAccordionOpen.secondaryAddressAccordion,
                          };

                          return newAccordionState;
                        });
                      }}
                      cssParentMarginTopProp={`mt-2`}
                      cssLabelColorProp={`text-indigo-600`}
                      gridRowsProp={1}
                      lgGridColsProp={6}
                      mdGridColsProp={6}
                      smGridColsProp={6}
                      gapProp={4}
                    /> */}

                    {/*
                    <FieldGroupComponent
                      displayValue="Primary Address"
                      subtitleValue={`Use this as current or primary or correspondence address`}
                      cssParentColSpan={`col-span-full`}
                      cssMainTextColSpan={`col-span-full`}
                      cssSubtitleTextColSpan={`col-span-full`}
                      cssMainTextColor={`text-indigo-600`}
                      cssSubtitleTextColor={`text-gray-600`}
                    />

                    <DropdownComponent
                      htmlForValue={dropdownField[0].htmlFor}
                      labelValue={dropdownField[0].label}
                      idValue={dropdownField[0].id}
                      nameValue={dropdownField[0].name}
                      autoCompleteValue={dropdownField[0].autoComplete}
                      disabledValue={dropdownField[0].disabled}
                      cssParentColSpanValue={dropdownField[0].cssParentColSpan}
                      cssLabelColorValue={dropdownField[0].cssLabelColor}
                      cssInputSelectMarginValue={
                        dropdownField[0].cssInputSelectMargin
                      }
                      currentSelectedValue={selectedDropdown}
                      onChangeValue={handleSelectDropdown}
                      selectionListValue={countries}
                    />

                    {addressFields.map((ele, idx) => {
                      return (
                        <>
                          <AddressTextFieldComponent
                            key={ele.id}
                            inputTypeValue={ele.inputtype || "text"}
                            htmlForValue={ele.htmlFor}
                            labelValue={ele.label}
                            idValue={ele.id}
                            nameValue={ele.name}
                            disabledValue={ele.disabled}
                            placeholderValue={ele.placeholder}
                            autoCompleteValue={ele.autoComplete}
                            cssClassColSpan={ele.smclasscolspan}
                            textValue={
                              addressFormSectionData["fields"][ele.name]
                            }
                            errorValue={
                              addressFormSectionData["errors"][ele.name]
                            }
                            notificationValue={
                              addressFormSectionData["messages"][ele.name]
                            }
                            onChangeAction={handleChangeAddressFormSection}
                          />
                        </>
                      );
                    })}

                    <FullAddressComputedFieldComponent
                      htmlForProp={`fullAddress`}
                      idProp={`fullAddress`}
                      nameProp={`fullAddress`}
                      labelProp={`Full Address`}
                      rowsProp={4}
                      valueProp={addressFormSectionData.fields.fullAddress}
                      disabledProp={true}
                      subtitleProp={`This address is as per Indian Format`}
                      cssParentColSpanProp={`col-span-full`}
                      cssLabelColorProp={`text-gray-900`}
                      cssTextAreaMarginProp={`mt-0`}
                      cssSubtitleMarginProp={`mt-0`}
                      cssSubtitleColorProp={`text-gray-600`}
                    />
                    

                    <FieldGroupComponent
                      displayValue="Secondary Address"
                      subtitleValue={`Use this as emergency or permanent or alternative
                        address`}
                      cssParentColSpan={`col-span-full`}
                      cssMainTextColSpan={`col-span-full`}
                      cssSubtitleTextColSpan={`col-span-full`}
                      cssMainTextColor={`text-indigo-600`}
                      cssSubtitleTextColor={`text-gray-600`}
                    />

                    <DropdownComponent
                      htmlForValue={dropdownField[0].htmlFor}
                      labelValue={dropdownField[0].label}
                      idValue={dropdownField[0].id}
                      nameValue={dropdownField[0].name}
                      autoCompleteValue={dropdownField[0].autoComplete}
                      disabledValue={dropdownField[0].disabled}
                      cssParentColSpanValue={dropdownField[0].cssParentColSpan}
                      cssLabelColorValue={dropdownField[0].cssLabelColor}
                      cssInputSelectMarginValue={
                        dropdownField[0].cssInputSelectMargin
                      }
                      currentSelectedValue={selectedDropdown}
                      onChangeValue={handleSelectDropdown}
                      selectionListValue={countries}
                    />

                    {secondaryAddressFields.map((ele, idx) => {
                      return (
                        <>
                          <AddressTextFieldComponent
                            key={ele.id}
                            inputTypeValue={ele.inputtype || "text"}
                            htmlForValue={ele.htmlFor}
                            labelValue={ele.label}
                            idValue={ele.id}
                            nameValue={ele.name}
                            disabledValue={ele.disabled}
                            placeholderValue={ele.placeholder}
                            autoCompleteValue={ele.autoComplete}
                            cssClassColSpan={ele.smclasscolspan}
                            textValue={
                              secondaryAddressFormSectionData["fields"][
                                ele.name
                              ]
                            }
                            errorValue={
                              secondaryAddressFormSectionData["errors"][
                                ele.name
                              ]
                            }
                            notificationValue={
                              secondaryAddressFormSectionData["messages"][
                                ele.name
                              ]
                            }
                            onChangeAction={
                              handleChangeSecondaryAddressFormSection
                            }
                          />
                        </>
                      );
                    })}

                    <FullAddressComputedFieldComponent
                      htmlForProp={`fullSecondaryAddress`}
                      idProp={`fullSecondaryAddress`}
                      nameProp={`fullSecondaryAddress`}
                      labelProp={`Full Secondary Address`}
                      rowsProp={4}
                      valueProp={
                        secondaryAddressFormSectionData.fields
                          .fullSecondaryAddress
                      }
                      disabledProp={true}
                      subtitleProp={`This address is as per Indian Format`}
                      cssParentColSpanProp={`col-span-full`}
                      cssLabelColorProp={`text-gray-900`}
                      cssTextAreaMarginProp={`mt-0`}
                      cssSubtitleMarginProp={`mt-0`}
                      cssSubtitleColorProp={`text-gray-600`}
                    />
                    */}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Comments
                  </label>
                  <div className="mt-0">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-0 text-sm leading-6 text-gray-600">
                    Write a few sentences in case anything to highlight or for
                    remarks or comments
                  </p>
                </div>
              </div>
              <UnderlinedTabs className="" />

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold  border px-3 py-2 shadow-sm rounded-md text-gray-900 hover:bg-gray-600 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomerCreate}
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export const UnderlinedTabs = () => {
  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 mt-2 ">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
            >
              Home
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className="inline-block p-4 text-indigo-600 border-b-2 border-indigo-600 rounded-t-lg active "
              aria-current="page"
            >
              Calendar
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
            >
              Results
            </a>
          </li>
          <li className="mr-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 "
            >
              Live
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export const AccordionPure = () => {
  // Independent component state and no dependency on the parent .
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  return (
    <>
      <div className="mt-8">
        <div
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="flex flex-row justify-between items-center hover:cursor-pointer py-2"
        >
          <div className="col-span-full hover:cursor-pointer">
            <label
              htmlFor="general"
              className="block text-sm font-medium leading-6 text-gray-900 hover:cursor-pointer"
            >
              Accordion
              <span className="ml-4 text-sm font-light text-gray-300 hover:cursor-pointer">
                {
                  "You can click across the width anywhere to expand or collapse "
                }
              </span>
            </label>
          </div>
          {isAccordionOpen ? (
            <FaMinus className="h-2.5 w-2.5 text-indigo-600" />
          ) : (
            <>
              <FaPlus className="h-2.5 w-2.5 text-indigo-600" />
            </>
          )}
        </div>
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out text-gray-400 text-sm ${
            isAccordionOpen
              ? `grid-rows-[1fr] opacity-100`
              : `grid-rows-[0fr] opacity-0`
          }`}
        >
          <div className="overflow-hidden">This is the accordion values </div>
        </div>
      </div>
    </>
  );
};

export const AccordionImPure = ({
  contentProp,
  accordionTitleProp,
  isAccordionOpenProp,
  setIsAccordionOpenProp,
  cssParentMarginTopProp,
  cssLabelColorProp,
  cssContentColorProp,
  cssContentSizeProp,
  gridRowsProp,
  lgGridColsProp,
  mdGridColsProp,
  smGridColsProp,
  gapProp,
}) => {
  // Independent component state and no dependency on the parent .

  return (
    <>
      <div
        className={`${cssParentMarginTopProp} col-span-full ${
          isAccordionOpenProp ? "" : `bg-gray-100 p-2 rounded-md`
        }`}
      >
        <div
          onClick={() => setIsAccordionOpenProp(!isAccordionOpenProp)}
          className="flex flex-row justify-between items-center hover:cursor-pointer py-2"
        >
          <div className="col-span-full hover:cursor-pointer">
            <label
              htmlFor="general"
              className={`block text-sm font-medium leading-6 ${cssLabelColorProp} hover:cursor-pointer`}
            >
              {accordionTitleProp}
            </label>
          </div>
          {isAccordionOpenProp ? (
            <FaMinus className="h-2.5 w-2.5 text-indigo-600" />
          ) : (
            <FaPlus className="h-2.5 w-2.5 text-indigo-600" />
          )}
        </div>
        {/* <div
          className={`grid overflow-hidden transition-all duration-300 ease-in-out ${cssContentColorProp} ${cssContentSizeProp} ${
            isAccordionOpenProp
              ? `grid-rows-[${rowsProp}fr] opacity-100`
              : `grid-rows-[0fr] opacity-0`
          }`}
        > */}
        <div
          className={`grid transition-all duration-300 ease-in-out ${cssContentColorProp} ${cssContentSizeProp} ${
            isAccordionOpenProp
              ? `grid-rows-[${gridRowsProp}] opacity-100`
              : `grid-rows-[0fr] opacity-0`
          } overflow-hidden`}
        >
          <div
            className={`grid gap-${gapProp}  lg:grid-cols-${lgGridColsProp} md:grid-cols-${mdGridColsProp} sm:grid-cols-${smGridColsProp} overflow-hidden`}
          >
            {contentProp}
          </div>
        </div>
      </div>
    </>
  );
};

export const CustomerComponent1 = () => {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 border border-gray-300 shadow-md rounded-md my-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="text-3xl font-extrabold">Create New Customer</div>
            <form>
              <div className="flex flex-row col-span-1  shadow-inner mt-4  px-3 py-2 space-x-6">
                <FaSave className="w-6 h-6 text-indigo-600 hover:cursor-pointer hover:text-indigo-500" />
                {/* <FcCancel className="w-6 h-6 text-gray-900 hover:cursor-pointer" /> */}
                <MdCancel className="w-6 h-6 text-gray-900 hover:cursor-pointer hover:text-gray-500" />
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base mt-8 font-semibold leading-7 text-indigo-600">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use this to enter your personal profile.
                </p>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block mt-8 text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 space-x-4 flex items-center gap-x-3">
                    <FaUserCircle
                      aria-hidden="true"
                      className="h-12 w-12 text-gray-300"
                    />
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <fieldset>
                  <div className="mt-6  space-x-4 flex flex-row items-start justify-start">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Individual
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Business
                      </label>
                    </div>
                  </div>
                </fieldset>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        id="first-name"
                        name="first-name"
                        type="text"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="w-full col-span-4">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">
                      Contacts
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use this as current or primary or correspondence or
                      emergency contacts
                    </p>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Mobile
                    </label>
                    <div className="mt-0">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Alternate Mobile
                    </label>
                    <div className="mt-0">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-0">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Workphone
                    </label>
                    <div className="mt-0">
                      <input
                        id="last-name"
                        name="last-name"
                        type="text"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Primary Email address
                    </label>
                    <div className="mt-0">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Secondary Email address
                    </label>
                    <div className="mt-0">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="w-full col-span-4">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">
                      Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use this as current or primary or correspondence address
                    </p>
                  </div>

                  <h2 className="text-base font-semibold leading-7 text-gray-900 col-span-4 underline underline-offset-2">
                    Primary Address
                  </h2>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>Bharat/India</option>
                        <option>United States</option>
                        <option>Canada</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street 1
                    </label>
                    <div className="">
                      <input
                        id="street-address"
                        name="street-address"
                        type="text"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street 2
                    </label>
                    <div className="">
                      <input
                        id="street-address"
                        name="street-address"
                        type="text"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="">
                      <input
                        id="region"
                        name="region"
                        type="text"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="">
                      <input
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <h2 className="text-base font-semibold leading-7 text-gray-900 col-span-4 underline underline-offset-2">
                    Secondary Address
                  </h2>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="">
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>Bharat/India</option>
                        <option>United States</option>
                        <option>Canada</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street 1
                    </label>
                    <div className="">
                      <input
                        id="street-address"
                        name="street-address"
                        type="text"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street 2
                    </label>
                    <div className="">
                      <input
                        id="street-address"
                        name="street-address"
                        type="text"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="">
                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="">
                      <input
                        id="region"
                        name="region"
                        type="text"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="">
                      <input
                        id="postal-code"
                        name="postal-code"
                        type="text"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm font-semibold  border px-3 py-2 shadow-sm rounded-md text-gray-900 hover:bg-gray-600 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

/*
<div className="border-b-0 border-gray-900/10 pb-12">
                  <div className="flex flex-row col-span-1  shadow-inner mt-4  px-3 py-2 space-x-6">
                    <FaSave className="w-6 h-6 text-indigo-600 hover:cursor-pointer hover:text-indigo-500" />
                    <FcCancel className="w-6 h-6 text-gray-900 hover:cursor-pointer" />
                    <MdCancel className="w-6 h-6 text-gray-900 hover:cursor-pointer hover:text-gray-500" />
                  </div> 
                </div> 
<div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Workphone
                      </label>
                      <div className="mt-0">
                        <input
                          id="first-name"
                          name="first-name"
                          type="text"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Primary Email address
                      </label>
                      <div className="mt-0">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    */

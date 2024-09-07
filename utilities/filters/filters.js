import { helper } from "@kinetics254/cassandra-base/utilities";

const filters = [
  {
    name: "capitalize",
    execute: (value) => {
      if (!value) return "";
      value = value.toString();
      value = value.toLowerCase();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  {
    name: "currency",
    execute: (value) => {
      if (!value) return "KES 0.00";
      value = `KES ${parseFloat(value).toFixed(2)}`;
      return value;
    },
  },
  {
    // this adds the commas to the number and floating point
    name: "currencyFormat",
    execute: (value) => {
      if (!value) return "0.00";
      value = parseFloat(value).toFixed(2);
      return new Intl.NumberFormat("en-KE", {
        minimumFractionDigits: 2,
      }).format(value);
    },
  },
  {
    name: "number",
    execute: (value) => {
      if (!value) return 0;
      value = parseFloat(value).toFixed(1);
      return value;
    },
  },
  {
    name: "percentage",
    execute: (value) => {
      if (!value) return 0;
      value = parseFloat(value).toFixed(1);
      return `${value}%`;
    },
  },
  {
    name: "date",
    execute: (value) => {
      if (!value) return "";
      value = new Date(value);
      return helper.getDateFormat(value);
    },
  },
  {
    name: "formatDate",
    execute: (date) => {
      if (!date) return new Date().toLocaleDateString();
      return helper.shortDateFormat(date);
    },
  },
  {
    name: "time",
    execute: (value) => {
      if (!value) return "";
      value = new Date(value);
      return value.toLocaleTimeString();
    },
  },
  {
    name: "datetime",
    execute: (value) => {
      if (!value) return "";
      value = new Date(value);
      return value.toLocaleString();
    },
  },
  {
    name: "uppercase",
    execute: (value) => {
      if (!value) return "";
      value = value.toString();
      return value.toUpperCase();
    },
  },
  {
    name: "lowercase",
    execute: (value) => {
      if (!value) return "";
      value = value.toString();
      return value.toLowerCase();
    },
  },
  {
    name: "trim",
    execute: (value) => {
      if (!value) return "";
      value = value.toString();
      return value.trim();
    },
  },
  {
    name: "truncate",
    execute: (value, length) => {
      if (!value) return "";
      value = value.toString();
      if (value.length > length) {
        value = value.substring(0, length) + "...";
      }
      return value;
    },
  },
  {
    name: "replace",
    execute: (value, search, replace) => {
      if (!value) return "";
      value = value.toString();
      return value.replace(search, replace);
    },
  },
  {
    name: "replaceAll",
    execute: (value, search, replace) => {
      if (!value) return "";
      value = value.toString();
      return value.split(search).join(replace);
    },
  },
  {
    name: "replaceFirst",
    execute: (value, search, replace) => {
      if (!value) return "";
      value = value.toString();
      return value.replace(search, replace);
    },
  },
  {
    name: "replaceLast",
    execute: (value, search, replace) => {
      if (!value) return "";
      value = value.toString();
      return value.split(search).join(replace);
    },
  },
  {
    name: "replaceRegex",
    execute: (value, regex, replace) => {
      if (!value) return '' // eslint-disable-line
    },
  },
];

export default filters;

import moment from "moment/moment";
import mime from "mime-types";
import { fromBuffer } from "file-type";

class Helper {
  isEmpty(obj) {
    for (var prop in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  prepareFormData(formData) {
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] === null) formData[key] = "";
      data.append(key, formData[key]);
    }
    return data;
  }

  stringify(object) {
    for (const key in object) {
      if (typeof object[key] === "object") {
        object[key] = JSON.stringify(object[key]);
      }
    }
    return object;
  }

  dateFix(date) {
    if (date) {
      if (
        moment(date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") ===
        date
      ) {
        return date;
      }
      return moment(date).format("Do MMMM YYYY");
    }
    return "";
  }

  changeToHumanReadable(date) {
    if (date) {
      if (
        moment(date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss") ===
        date
      ) {
        return moment(date).format("Do MMMM YYYY");
      }
    }
    return "";
  }

  prepareDate(date) {
    return date ? moment(date).format().substr(0, 10) : "";
  }

  sanitizeDate(date) {
    return moment(date).format().substr(0, 10);
  }

  getFileIconColor(fileName) {
    if (!fileName) return "#727071";
    const fileExtension = fileName.split(".").pop();
    switch (fileExtension) {
      case "docx":
        return "#0276c0";
      case "pdf":
        return "#e62f34";
      case "pptx":
        return "#f39301";
      case "xls":
        return "#82bd8d";
      case "xlsx":
        return "#82bd8d";
      case "png":
        return "#a7ce59";
      case "jpg":
        return "#a7ce59";
      default:
        return "#727071";
    }
  }

  getFileIcon(fileName) {
    if (!fileName) return "fa fa-file-o";
    const fileExtension = fileName.split(".").pop();
    switch (fileExtension) {
      case "docx":
        return "fa fa-file-word";
      case "pdf":
        return "fa fa-file-pdf";
      case "pptx":
        return "fa fa-file-powerpoint";
      case "xls":
        return "fa fa-file-excel";
      case "xlsx":
        return "fa fa-file-excel";
      case "png":
        return "fa fa-file-image";
      case "jpg":
        return "fa fa-file-image";
      default:
        return "fa fa-file";
    }
  }

  getColor(status) {
    let colorObject = {};
    switch (status) {
      case "Open":
      case "Draft":
        colorObject = {
          icon_color: "amber lighten-1",
          icon: "error_outline",
          color: "warning",
        };
        break;
      case "Review":
        colorObject = {
          icon_color: "orange lighten-1",
          icon: "rate_review",
          color: "orange",
        };
        break;
      case "Pending":
      case "Pending Approval":
        colorObject = {
          icon_color: "yellow darken-1",
          icon: "rate_review",
          color: "yellow darken-2",
        };
        break;
      case "Released":
      case "Issued":
        colorObject = {
          icon_color: "green lighten-1",
          icon: "done",
          color: "success",
        };
        break;
      case "Posted":
        colorObject = {
          icon_color: "teal lighten-1",
          icon: "done",
          color: "teal accent-3",
        };
        break;
      case "Approved":
        colorObject = {
          icon_color: "green lighten-1",
          icon: "done",
          color: "success",
        };
        break;
      case "Rejected":
      case "Declined":
      case "Canceled":
        colorObject = {
          icon_color: "deep-orange lighten-1",
          icon: "close",
          color: "red",
        };
        break;
      default:
        colorObject = {
          icon_color: "blue lighten-1",
          icon: "new_releases",
          color: "info",
        };
        break;
    }
    return colorObject;
  }

  getFeedBackColor(accept) {
    let colorObject = {};
    switch (accept) {
      case "Accepted":
      case "Draft":
        colorObject = {
          icon_color: "amber lighten-1",
          icon: "error_outline",
          color: "success",
        };
        break;
      case "Rejected":
        colorObject = {
          icon_color: "orange lighten-1",
          icon: "rate_review",
          color: "orange",
        };
        break;
      default:
        colorObject = {
          icon_color: "blue lighten-1",
          icon: "new_releases",
          color: "red",
        };
        break;
    }
    return colorObject;
  }

  getEntryDateFormat(date) {
    return moment(date).format("Do dddd, MMM YYYY hh:mm:ss a");
  }

  getDateFormat(date) {
    return moment(date).format("Do ddd, MMM YYYY");
  }

  /**
   * A date format without days of the week as the one above(getDateFormat())
   * @param date
   * @returns {string}
   */
  shortDateFormat(date) {
    return moment(date).format("Do MMM YYYY");
  }

  detectMimeType(b64) {
    const signatures = {
      JVBERi0: "application/pdf",
      iVBORw0KGgo: "image/png",
      "/9j/": "image/jpg",
    };
    for (var s in signatures) {
      if (b64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
  }

  fileExtension(b64) {
    const signatures = {
      JVBERi0: ".pdf",
      iVBORw0KGgo: ".png",
      "/9j/": ".jpg",
      UEsDBBQ: ".xlsx",
    };
    for (var s in signatures) {
      if (b64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
  }

  /**
   * use this method to shorten numbers such as 20K, 1M, 1B,100K, etc
   * @param number
   * @returns {string|number}
   */
  shortNumberPipe(number) {
    if (isNaN(number)) return 0; // will only work value is a number
    if (number === null) return 0;
    if (number === 0) return 0;
    let abs = Math.abs(number);
    const rounder = Math.pow(10, 1);
    const isNegative = number < 0; // will also work for Negative numbers
    let key = "";

    const powers = [
      { key: "Q", value: Math.pow(10, 15) },
      { key: "T", value: Math.pow(10, 12) },
      { key: "B", value: Math.pow(10, 9) },
      { key: "M", value: Math.pow(10, 6) },
      { key: "K", value: 1000 },
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.floor(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? "-" : "") + abs + key;
  }

  /**
   * helper to count array length on 2 conditions
   * @param array
   * @param key
   * @param value
   * @param keyTwo
   * @param valueTwo
   * @returns {number}
   */
  countByStatus(array, key, value, keyTwo, valueTwo) {
    let count = 0;
    array.forEach((i) => {
      if (i[key] === value && i[keyTwo] === valueTwo) {
        count++;
      }
    });
    return count;
  }

  /**
   * Add a method to add a read more link to a string
   */
  addReadMore(text, length) {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    } else {
      return text;
    }
  }

  /**
   *
   * use this method to shorten numbers such as 20K,
   * 1M, 1B,100K, etc  * @param file
   * @returns {Promise<unknown>}
   */
  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * Check if a string is base64
   * @param str
   * @returns {boolean}
   */
  isBase64(str) {
    // check if the string only contains numbers
    const num = /^\d+$/.test(str);
    // return false if empty or a number
    if (str === "" || str.trim() === "" || num) {
      return false;
    }
    // check if the string is base64
    try {
      //  This method attempts to decode then encode and compare to the original
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }

  /**
   * statuses color codes
   * @param val
   * @returns {*}
   */
  status(val) {
    const status = {
      Open: { primary: "amber", secondary: "amber lighten-5" },
      Planned: { primary: "orange", secondary: "orange lighten-5" },
      Pending: { primary: "deep-orange", secondary: "deep-orange lighten-5" },
      Fulfilled: { primary: "teal", secondary: "teal lighten-5" },
      Archived: { primary: "red", secondary: "red lighten-5" },
      Procured: { primary: "green", secondary: "green lighten-5" },
      Released: { primary: "green", secondary: "green lighten-5" },
    };
    return status[val];
  }

  accept(val) {
    const accept = {
      Rejected: { primary: "deep-orange", secondary: "deep-orange lighten-5" },

      Accepted: { primary: "green", secondary: "green lighten-5" },
    };
    return accept[val];
  }

  stringToColour(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (let i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  }

  /** Get File Blob */
  async getFileBlob(url, fileName) {
    const response = await fetch(url);
    const data = await response.blob();
    const metadata = {
      type: mime.lookup(url),
    };
    return new File([data], fileName, metadata);
  }

  /** using file-type **/
  async getFileType(base64) {
    return await fromBuffer(Buffer.from(base64, "base64"));
  }

  encode(value) {
    return btoa(value).toString();
  }
  decode(value) {
    return atob(value).toString();
  }
}
export default new Helper();

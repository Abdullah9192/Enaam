import axios from "axios";

const baseUrl = "http://172.16.1.114:3000";



export function calculatePercentage(value, total) {
  if (total === 0 || total === undefined || total === null) {
    return 0; // Avoid division by zero
  }
  return Math.round((value / total) * 100);
}
export function formatDate(dateString) {
  const date = new Date(dateString);
  
  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function calculateOfferEndDate(createdAt, timeLeft) {
  // Parse the createdAt date
  const createdDate = new Date(createdAt);

  // Split the timeLeft into hours, minutes, and seconds
  const [hours, minutes, seconds] = timeLeft.split(":").map(Number);

  // Add the remaining time to the created date
  createdDate.setHours(createdDate.getHours() + hours);
  createdDate.setMinutes(createdDate.getMinutes() + minutes);
  createdDate.setSeconds(createdDate.getSeconds() + seconds);

  return createdDate.toISOString(); // Return as ISO string or format as needed
}

export async function Post(route, body) {
  try {
    const res = await axios.post(`${baseUrl}/${route}`, body);
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
    return err.response || { status: 500, message: "Unknown error occurred" };
  }
}
export async function Get(route) {
  try {
    const res = await axios.get(`${baseUrl}/${route}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res;
  } catch (err) {
    return err.response || { status: 500, message: "internal server error" };
  }
}
  export async function GetWihoutHead(route) {
    try {
      const res = await axios.get(`${baseUrl}${route}`);
      // console.log(res,"response")
      return res;
    } catch (err) {
      // console.log(err)
      return err.response || { status: 500, message: "internal server error" };
    }
  }
  export async function PutCart(route) {
    try {
      const res = await axios.put(`${baseUrl}${route}`);
      // console.log(res,"response")
      return res;
    } catch (err) {
      // console.log(err)
      return err.response || { status: 500, message: "internal server error" };
    }
  }

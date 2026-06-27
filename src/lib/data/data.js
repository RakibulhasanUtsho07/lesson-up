import { authHeader } from "@/lib/core/sarver";
const getValidHeader = async () => {
  const headers = await authHeader();

  
  if (!headers.authorization || headers.authorization.includes("undefined")) {
    console.warn("⚠️ Warning: Authorization token is undefined in Server Action!");
  }
  return headers;
};
export const getPublicLessons = async (queryString) => {
  const res = await fetch(`http://localhost:5000/lessons?${queryString}`);
  const data = await res.json();
  return data;
};
export const getLessonDetails = async (id) => {
  const res = await fetch(`http://localhost:5000/lessons/${id}`, {
    cache: "no-store",
    headers: await getValidHeader()
  });

  if (!res.ok) {
    throw new Error("Failed to fetch lesson details");
  }

  const data = await res.json();
  return data;
};
// export const getLessonUpdate= async (id) => {

//   const res = await fetch(`http://localhost:5000/lesson-update/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch lesson details");
//   }

//   const data = await res.json();
//   return data;
// };
export const getFavoriteLessons = async (userId) => {
  try {
    if (!userId) return [];

    const res = await fetch(`http://localhost:5000/savePosts/${userId}`, {
      cache: "no-store",
      headers: await getValidHeader()
    });

    console.log(
      `📡 API URL: http://localhost:5000/savePosts/${userId} | Status: ${res.status}`,
    );

    if (!res.ok) {
      console.error(`❌ Server replied with status code: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getFavoriteLessons:", error);
    return [];
  }
};
export const countUserLessons = async (userId) => {
  try {
    const res = await fetch(`http://localhost:5000/lessons/count/${userId}`, {
      cache: "no-store",
      headers: await getValidHeader()
    });

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in countUserLessons fetch:", error);
    return { totalLessons: 0 };
  }
};

export const countUserFavoriteLessons = async (userId) => {
  try {
    const res = await fetch(`http://localhost:5000/savePosts/count/${userId}`, {
      cache: "no-store",
      headers: await getValidHeader()
    });

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in countUserLessons fetch:", error);
    return { totalLessons: 0 };
  }
};
export const getUsers = async () => {
  try {
    const res = await fetch(`http://localhost:5000/users`, {
      cache: "no-store",
      headers: await authHeader()
    });

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getUsers:", error);
    return [];
  }
};
export const getReportedData = async () => {
  try {
    const res = await fetch("http://localhost:5000/lessons/report/get", {
      cache: "no-store",
      headers: await getValidHeader()
    });
    const data = await res.json();
    return data;
    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }
  } catch (error) {
    console.error("Error in getUsers:", error);
    return [];
  }
};
export const getReportsCount = async () => {
  try {
    // ⚡ ফিক্স ১: ইউআরএল স্ট্রিং থেকে অতিরিক্ত কোটেশন এবং ডাবল স্ল্যাশ (//) মুছে ফেলা হলো
    const res = await fetch("http://localhost:5000/lessons/reports/count", {
      cache: "no-store",
      headers: await getValidHeader()
       // Next.js ক্যাশিং এড়াতে এবং ইনস্ট্যান্ট লাইভ কাউন্ট পেতে
    });

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();
    
    // যদি ব্যাকএন্ডে অবজেক্ট ফিক্স করে থাকেন তবে data.count রিটার্ন হবে, অন্যথায় সেফটি ব্যাকআপ হিসেবে 0
    return data?.success ? data.count : 0;
  } catch (error) {
    console.error("Error in getReportsCount:", error);
    return 0; // ⚡ ফিক্স ২: এরর খেলে কাউন্ট হিসেবে ০ রিটার্ন করা নিরাপদ
  }
};
export const getTodayLessonsCount = async () => {
  try {
    const res = await fetch("http://localhost:5000/lessons/today/count", {
      cache: "no-store", 
      headers: await getValidHeader()
    });

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();
    return data?.success ? data.count : 0;
  } catch (error) {
    console.error("Error in getTodayLessonsCount:", error);
    return 0; // কোনো কারণে এরর হলে ব্যাকআপ হিসেবে ০ রিটার্ন করবে
  }
};
export const getMonthlyLessonsCount = async () => {
  try {
    const res = await fetch("http://localhost:5000/lessons/monthly-count", {
      cache: "no-store",
      headers: await getValidHeader()
    });
    if (!res.ok) throw new Error("Failed to fetch monthly data");
    
    const resData = await res.json();
    return resData?.success ? resData.data : [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
export const getTopContributors = async () => {
  try {
    const res = await fetch("http://localhost:5000/users/top-contributors", { cache: "no-store" });
    const data = await res.json();
    return data?.success ? data.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMostSavedLessons = async () => {
  try {
    const res = await fetch("http://localhost:5000/lessons/most-saved", { cache: "no-store" });
    const data = await res.json();
    return data?.success ? data.data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
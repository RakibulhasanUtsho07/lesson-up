"use server";

export const postLesson = async (formData) => {
  try {
    const res = await fetch("http://localhost:5000/lessons", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  } catch (error) {}
};

export const userPostedLessons = async (userId) => {
  try {
    if (!userId || userId === "undefined") {
      console.warn(
        "⚠️ userPostedLessons aborted: userId is missing or undefined",
      );
      return [];
    }

    // 💡 Log this URL to see exactly what is being sent to your backend terminal
    const targetUrl = `http://localhost:5000/lessons/user/${userId}`;
    console.log("🚀 Outgoing Fetch URL:", targetUrl);

    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      console.error(`❌ Backend responded with status: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Detailed Error in userPostedLessons:", error.message);
    return [];
  }
};

export const postLikedData = async (likedData) => {
  console.log(likedData, "liked Data");
  const res = await fetch("http://localhost:5000/likes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(likedData),
  });
};

export const postSavedData = async (savedData) => {
  console.log(savedData, "saved Data");
  const res = await fetch("http://localhost:5000/savePosts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(savedData),
  });
};

// export  const updateLessonData= async(id)=> {
//   const res = await fetch(`http://localhost:5000/lessons/${id}`, {
//   method: "PATCH",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(updatedFormData),
// });
// }
export const getLessonsCount = async () => {
  try {
    const res = await fetch(`http://localhost:5000/lessons/count`);
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
export const getTotalUserCount = async () => {
  try {
    const res = await fetch(`http://localhost:5000/lesson-up/user/count`);
    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }
    const data = res.json();
    return data;
  } catch (error) {
    console.error("Error in countUserLessons fetch:", error);
    return { totalLessons: 0 };
  }
};
export const updateUserPlan = async (userId) => {
  try {
    // ⚡ এখানে স্পষ্ট করে method: 'PATCH' উল্লেখ করতে হবে
    const res = await fetch(
      `http://localhost:5000/user/update-plan/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        // যদি বডিতেও আইডি পাঠাতে চান (অপশনাল, কারণ ইউআরএল-এই আইডি আছে)
        body: JSON.stringify({ userId }),
      },
    );

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json(); // এখানে await যুক্ত করা নিশ্চিত করুন
    return data;
  } catch (error) {
    console.error("Error in updateUserPlan fetch:", error);
    throw error;
  }
};
export const setFeatured = async (lessonId) => {
  console.log(lessonId, "hi lesson Id");
  try {
    const res = await fetch(
      `http://localhost:5000/lesson/feature/${lessonId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in setFeatured fetch:", error);
    throw error;
  }
};
export const adminDeleteLesson = async (lessonId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/lessons/delete/${lessonId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in adminDeleteLesson fetch:", error);
    throw error;
  }
};
export const handleReport = async (reportedData) => {
  try {
    const res = await fetch(`http://localhost:5000/lessons/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportedData),
    });

    const data = await res.json(); // ✅ always parse first

    if (!res.ok) {
      throw new Error(
        data?.message || `Server responded with status: ${res.status}`,
      );
    }

    return data;
  } catch (error) {
    console.error("Error in handleReport fetch:", error);
    throw error;
  }
};

export const adminHandleReports = async (reportedId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/lessons/delete/report/${reportedId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      throw new Error(
        data?.message || `Server responded with status: ${res.status}`,
      );
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in handleReport fetch:", error);
    throw error;
  }
};

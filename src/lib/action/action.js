"use server";

export const postLesson = async (formData) => {
  const res = await fetch("http://localhost:5000/lessons", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData)
  });
};

export const userPostedLessons = async (userId) => {
  try {
    if (!userId || userId === "undefined") {
      console.warn("⚠️ userPostedLessons aborted: userId is missing or undefined");
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
      next: { revalidate: 0 } 
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
    body: JSON.stringify(likedData)
  });
};

export const postSavedData = async (savedData) => {
  console.log(savedData, "saved Data");
  const res = await fetch("http://localhost:5000/savePosts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(savedData)
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
export const getTotalUserCount = async()=>{
  try{
    const res = await fetch(`http://localhost:5000/lesson-up/user/count`)
    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`);
    }
    const data = res.json()
    return data

  }catch(error){
    console.error("Error in countUserLessons fetch:", error);
    return { totalLessons: 0 };
  }
}
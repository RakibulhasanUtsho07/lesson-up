"use server";
export  const postLesson = async (formData) => {
    
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
    if (!userId) return [];

    
    const res = await fetch(`http://localhost:5000/lessons/${userId}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-store" 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data from server");
    }

    const data = await res.json();
    return data; // 👈 এটি অবশ্যই থাকতে হবে, অন্যথায় 'undefined' আসবে!

  } catch (error) {
    console.error("Error in userPostedLessons:", error);
    return [];
  }
};

export  const postLikedData = async (likedData) => {
  console.log(likedData, "liked Data")
    
  const res = await fetch("http://localhost:5000/likes", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(likedData)
  });
};
export  const postSavedData = async (savedData) => {
  console.log(savedData, "saved Data")
    
  const res = await fetch("http://localhost:5000/savePosts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(savedData)
  });
};
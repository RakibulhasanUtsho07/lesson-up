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



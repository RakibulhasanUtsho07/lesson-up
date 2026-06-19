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

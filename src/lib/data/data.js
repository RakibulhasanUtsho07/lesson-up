export const getPublicLessons = async () => {
  const res = await fetch("http://localhost:5000/lessons");
  const data = await res.json();
  return data;
};
export const getLessonDetails = async (id) => {
  const res = await fetch(`http://localhost:5000/lessons/${id}`, {
    cache: "no-store",
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

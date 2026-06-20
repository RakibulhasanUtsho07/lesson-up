export const getPublicLessons =async()=>{
    const res =await fetch("http://localhost:5000/lessons")
    const data = await res.json()
    return data
}
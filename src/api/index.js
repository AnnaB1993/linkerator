import axios from "axios";

// export async function getSomething() {
//   try {
//     const { data } = await axios.get("/api");
//     console.log(data);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

export async function getAllLinks() {
  try {
    const { data } = await axios.get("http://localhost:3000/api/links");
    return data.allLinks;
  } catch (error) {
    console.error(error);
  }
}

// export async function sortAllLinksByPopularity() {
//   try {
//     const { data } = await axios.get(
//       "http://localhost:3000/api/links/sorted-by-popularity"
//     );
//     console.log("sorted links array", data.allLinks);
//     return data.allLinks;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function createNewLinks([url, comments, tags] = "") {
  try {
    const { data } = await axios.post("/api/links", {
      url: url,
      comments: comments,
      tags: tags,
    });
    console.log("createNewLinksAPI:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

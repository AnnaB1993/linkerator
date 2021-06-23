import axios from "axios";

export async function getAllLinks() {
  try {
    const { data } = await axios.get("/api/links");
    return data.allLinks;
  } catch (error) {
    console.error(error);
  }
}

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

export async function updateClicks(linkId) {
  try {
    const { data } = await axios.patch(`api/links/${linkId}`, {
      linkId,
    });
    console.log("countWasUpdated", data);
    return data;
  } catch (error) {
    console.log("updateClickApi", error);
  }
}

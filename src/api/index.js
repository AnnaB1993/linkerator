import axios from 'axios';

export async function getSomething() {
  try {
    const { data } = await axios.get('/api');
    console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
}


export async function getLinksOnPage(){
  try {
    const {data} = await axios.get('http://localhost:3000/api/links');
    console.log(data.allLinks);
    return data.allLinks
  } catch (error) {
    console.error(error)
  }
}
export function sortLinksByPopularity(links) {
  return [...links].sort((a, b) => {
    const aClicks = a.clicks;
    const bClicks = b.clicks;
    return bClicks - aClicks;
  });
}

export function sortLinksByDate(links) {
  return [...links].sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return bDate - aDate;
  });
}

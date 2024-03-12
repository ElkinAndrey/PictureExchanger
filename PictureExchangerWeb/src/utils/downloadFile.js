const downloadFile = async (url) => {
  const resp = await fetch(url);
  const blob = await resp.blob();
  const name = url.split("/").pop().replace("jpeg", "jpg");
  const anchor = document.createElement("a");
  anchor.setAttribute("download", name || "");
  const blobUrl = URL.createObjectURL(blob);
  anchor.href = blobUrl + (url ? "#" + url : "");
  anchor.click();
};

export default downloadFile;

export function productImages(data) {
  const goodSizes = [];
  data[0].formats.forEach((image) => {
    if (image.width < 1000 && image.width > 200) {
      goodSizes.push(image);
    }
  });
  return goodSizes;
}

export function doEveryMinute(callback) {
  setInterval((callback) => callback(), 10*1000);
}

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

export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

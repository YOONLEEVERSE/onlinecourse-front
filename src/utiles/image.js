//load 이벤트는 리소스와 그것에 의존하는 리소스들의 로딩이 완료되면 실행됩니다.
//이미지 업로드 했을 때 해당 이미지 가져와서 그걸 넣어주면 되는경, 저기서 imageFile은 e.target.files[0]임.

export function resizeImage(sourceImg, size) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    const WIDTH = size ? size + 200 : 500;
    const HEIGHT = size ? size : 300;

    fileReader.onload = (e) => {
      const img = document.createElement("img");
      img.onload = (e) => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = WIDTH;
          canvas.height = HEIGHT;
          const ctx = canvas.getContext("2d");
          ctx.mozImageSmoothingEnabled = false;
          ctx.webkitImageSmoothingEnabled = false;
          ctx.msImageSmoothingEnabled = false;
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);
          const resizedImg = canvas.toDataURL(sourceImg.type);
          resolve(resizedImg);
        } catch (e) {
          reject(new Error("리사이즈 에러" + e));
        }
      };
      img.src = e.target.result;
    };
    fileReader.readAsDataURL(sourceImg);
  });
}

export function encodeToBase64(imgFile) {
  return btoa(imgFile);
}

export function makeSmallBase64(imgFile) {
  const resizedImage = resizeImage(imgFile);
  const encodedRisizedImg = encodeToBase64(resizedImage);
  return encodedRisizedImg;
}

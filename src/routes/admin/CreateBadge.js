import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useState, useRef, forwardRef } from "react";

function CreateBadge(props, ref) {
  const [state, setState] = useState({ imageSrc: "" });
  const fileInputRef = useRef(null);
  const cropperRef = useRef(null);
  const fileReader = new FileReader();

  function handleFileRead() {
    const binaryData = fileReader.result;
    const base64Data = window.btoa(binaryData);
    setState((imageSrc) => ({ ...imageSrc, base64: base64Data }));
  }

  function IsOverFileSizeLimit(size) {
    const LIMIT_SIZE = 500; //제한 : 500KB
    const fileSize = (size / 1024).toFixed(4); //KB로 바꿈
    return fileSize > LIMIT_SIZE ? true : false;
  }

  function handleChange(e) {
    const file = fileInputRef.current.files[0];
    const { name, size, type } = file;
    if (IsOverFileSizeLimit(size)) {
      throw new Error("file is too big");
    }
    const imageSrc = URL.createObjectURL(e.target.files[0]);
    setState({ ...state, name, size, type, imageSrc, croppedImgSrc: null });
    fileReader.onloadend = handleFileRead;
    fileReader.readAsBinaryString(file);
  }

  function handleCropChange() {
    const croppedImgData = cropperRef.current.cropper.getCroppedCanvas();
    const roundCroppedImgData = getRoundedCanvas(
      croppedImgData,
      64
    ).toDataURL();
    setState((state) => ({ ...state, croppedImgSrc: roundCroppedImgData }));
  }

  function getRoundedCanvas(sourceCanvas, size = null) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const width = size || sourceCanvas.width;
    const height = size || sourceCanvas.height;
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = "destination-in";
    context.beginPath();
    context.arc(
      width / 2,
      height / 2,
      Math.min(width, height) / 2,
      0,
      2 * Math.PI,
      true
    );
    context.fill();
    return canvas;
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
      ></input>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Cropper
          style={{ maxWidth: "100px", height: "100px" }}
          ref={cropperRef}
          src={state.imageSrc}
          aspectRatio={1}
          cropend={handleCropChange}
          cropBoxResizable={true}
        />
        <img
          src={state.croppedImgSrc}
          style={{ maxWidth: "400px" }}
          alt="크롭된 이미지가 뭔가 잘못됨."
          ref={ref}
        />
      </div>
    </div>
  );
}

export default forwardRef(CreateBadge);

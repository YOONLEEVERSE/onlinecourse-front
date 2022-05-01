import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useState, useRef, forwardRef } from "react";
import { BadgeImg } from "../../shared/Image";

function CreateBadge(props, ref) {
  const [state, setState] = useState({ imageSrc: "" });
  const fileInputRef = useRef(null);
  const cropperRef = useRef(null);
  const fileReader = new FileReader();

  function handleFileRead() {
    const binaryData = fileReader.result;
    const base64Data = window.btoa(binaryData);
    setState((imageSrc) => ({
      ...imageSrc,
      base64: base64Data,
      croppedImgSrc: "",
    }));
  }

  function IsOverFileSizeLimit(size) {
    const LIMIT_SIZE = 1024; //제한 : 1MB
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
    setState({ ...state, name, size, type, imageSrc, croppedImgSrc: imageSrc });
    fileReader.onloadend = handleFileRead;
    fileReader.readAsBinaryString(file);
  }

  function getRoundedCanvas(sourceCanvas) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const width = sourceCanvas.width;
    const height = sourceCanvas.height;
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

  function handleCropChange() {
    const croppedImgData = cropperRef.current.cropper.getCroppedCanvas();
    const roundCroppedImgData = getRoundedCanvas(croppedImgData).toDataURL();
    setState((state) => ({ ...state, croppedImgSrc: roundCroppedImgData }));
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
      />
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
        <BadgeImg src={state.croppedImgSrc} ref={ref} />
      </div>
    </div>
  );
}

export default forwardRef(CreateBadge);

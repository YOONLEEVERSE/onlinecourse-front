import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useState, useRef } from "react";

export default function CreateBadge(props) {
  const [state, setState] = useState({ imageSrc: "" });
  const fileInputRef = useRef(null);
  const cropperRef = useRef(null);
  const fileReader = new FileReader();

  function handleFileRead() {
    const binaryData = fileReader.result;
    const base64Data = window.btoa(binaryData);
    setState((imageSrc) => ({ ...imageSrc, base64: base64Data }));
  }

  function handleChange(e) {
    const file = fileInputRef.current.files[0];
    const { name, size, type } = file;
    const imageSrc = URL.createObjectURL(e.target.files[0]);
    setState({ ...state, name, size, type, imageSrc, croppedImgSrc: null });
    fileReader.onloadend = handleFileRead;
    fileReader.readAsBinaryString(file);
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
  function handleCropChange() {
    console.log("REF", cropperRef.current);
    const croppedImgData = cropperRef.current.cropper.getCroppedCanvas();
    const roundCroppedImgData = getRoundedCanvas(
      croppedImgData,
      64
    ).toDataURL();
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
      <div>
        <Cropper
          style={{ maxWidth: "600px", height: "400px" }}
          ref={cropperRef}
          src={state.imageSrc}
          aspectRatio={1}
          cropend={handleCropChange}
          cropBoxResizable={true}
        />
        <h2>Cropped image preview</h2>
        <img
          src={state.croppedImgSrc}
          style={{ maxWidth: "400px" }}
          alt="크롭된 이미지가 뭔가 잘못됨."
        />
      </div>
    </div>
  );
}

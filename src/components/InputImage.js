import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {faImage} from "@fortawesome/free-regular-svg-icons";
import ValidateMimeType from "../helper/ValidateMimeType";
import {alertError} from "./AlertDialogs";

function InputImage({setFile, id, removeFile, value})
{
  const [file_preview, setFilePreview] = useState(null)
  const [file, setFileSelected] = useState(null)

  const handleChangeFile = (e) => {
    let is_valid = ValidateMimeType(e.target.files[0])
    if(!is_valid) {
      alertError('', 'ไฟล์ต้องเป็นประเภท .png หรือ .jpg เท่านั้น')
      return
    }
    setFileSelected(e.target.files[0])
    setFile(e.target.files[0])
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (ev) {
        setFilePreview(ev.target.result)
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const removeImage = (id) => {
    setFileSelected(null)
    setFilePreview(null)
    removeFile(id)
  }

  useEffect(() => {
    setFilePreview(value)
  }, [value]);

  return (
    <div className="input-image-container">
      {
        file_preview
          ? <div className="preview-image d-flex align-items-center justify-content-center">
            <img src={file_preview} alt={"farm image"}  id="file-preview"/>
            <div className="remove-image" onClick={() => removeImage(id)}>
              <FontAwesomeIcon icon={faMinusCircle} style={{color: '#ED2227', fontSize: 18}}/>
            </div>
          </div>
          : <label htmlFor={id} className="w-100">
            <div className="img-box">
              <div className="container-img mb-2">
                <div className="image-icon">
                  <FontAwesomeIcon icon={faImage} style={{color: '#BEBEBE', fontSize: 24}} />
                </div>
              </div>

              <div style={{color: '#A9A6A6'}} className="mb-2">
                อัปโหลดรูปภาพ
              </div>

              <input type="file" accept="image/*"
                     id={id}
                     style={{display:"none"}}
                     onChange={handleChangeFile}/>
            </div>
          </label>

      }
    </div>
  )
}

export default InputImage;

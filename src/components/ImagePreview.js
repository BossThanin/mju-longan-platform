import userDefaultImg from "../assets/images/default_user.png";

const ImagePreview = ({src, styleImgBox}) => {
  return (
    <div>
      <div className="image-preview" style={styleImgBox || {}}>
        <img src={src || userDefaultImg} alt="preview image" className="w-100 h-100"/>
      </div>
    </div>
  )
}

export default ImagePreview;

import userDefaultImg from "../../assets/images/default_user.png";

const CardFarmer = ({farmer}) => {
  return (
    <div className="farmer-owner p-2 mb-3 mt-2 d-flex">
      <div style={{width: '20%'}}>
        <div className="image-farmer">
          <img src={farmer && farmer.full_picture_path || userDefaultImg} alt="farmer image" className="w-100 h-100"/>
        </div>
      </div>

      <div style={{width: '80%'}}>
        <div style={{fontSize: 16, color: '#292727'}}>
          <p className="text-nowrap overflow-hidden text-ellipsis mb-0">
            {farmer && farmer.name}
          </p>
        </div>

        <div className="d-flex align-items-center mt-2 text-nowrap overflow-hidden overflow-x-scroll">
          <div className="d-flex align-items-center me-2" style={{fontSize: 12}}>
            <img className="me-2"/>
            <span>{farmer && farmer.count_of_farm} สวน</span>
          </div>

          <div className="d-flex align-items-center me-2" style={{fontSize: 12}}>
            <img className="me-2"/>
            <span>{farmer && farmer.count_of_tree} ต้น</span>
          </div>

          <div className="d-flex align-items-center justify-content-between" style={{fontSize: 12}}>
            <div className="d-flex align-items-center">
              <img className="me-2"/>
              <span>{farmer && farmer.count_of_package} แพ็กเกจ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardFarmer;

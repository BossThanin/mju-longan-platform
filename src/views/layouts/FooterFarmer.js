import FooterImag from '../../assets/images/Footer.png'
function FooterFarmer(){

    return (
        <>
            <div className='Footer'>
                <img src={FooterImag} style={{width:'100%',height:100,objectFit:"cover"}} className='footer-img ' alt="" />
            </div>
        </>
    )
}

export default FooterFarmer;
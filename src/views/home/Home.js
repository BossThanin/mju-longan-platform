
import {useEffect, useState} from "react";
import {getFarmList} from "../../api/FarmsApi";

import {store} from "../../redux/store";
import '../../assets/css/home.css'
import Layout from "../layouts/Layout";
import HeaderFarmer from "../layouts/HeaderFarmer";
import Footer from "../layouts/Footer";
import {dismissPopup, showProgress} from "../../components/AlertDialogs";
function Home() {
    const [farm_id, setFarmID] = useState(null);
    const [farms, setFarms] = useState([]);
    useEffect(() => {
        let user = store.getState() && store.getState().app && store.getState().app.user;
        // console.log('user >>> ', user)
        showProgress('')
        getFarmList(user.id)
            .then(res => {
                if (res.data && res.data.success) {
                    setFarms(res.data.data);
                    if (setFarmID && res.data.data.length > 0) {
                        setFarmID(res.data.data[0].id)
                    }
                }
            }).finally(() => {
            dismissPopup()
        })
    }, []);

    console.log('farms >> ',farms)


    return (
        <div className={'Container'}>
            <HeaderFarmer HeadTitle={'รายการสวน'} showBack={true}/>
            <Layout header={{title: 'OPEN INNOVATION', showRightSide: true, showNoti: true, showLogout: true}}
                    footer={{display: true}}
                    content={{style: {overflowY: 'hidden'}}}
            >
                {farms.map((farm,index)=>(
                    <div className={'card bg-second mb-3 p-3'} key={index} >
                        <div className={'w-100 mb-3'}>
                            <img src={farm.full_picture_path} alt="no image" width={'100%'} height={200} style={{borderRadius:14,objectFit:"cover"}}/>
                        </div>
                        <h1 style={{fontSize:16}} className={'fw-bold text-dark'}>
                            ชื่อสวน : <span className={'text-muted fw-normal'}>{farm.name}</span>
                        </h1>
                        <h1 style={{fontSize:16}} className={'fw-bold text-dark'}>
                            พิกัดสวน : <span className={'text-muted fw-normal'}>{farm.location}</span>
                        </h1>
                        <h1 style={{fontSize:16}} className={'fw-bold text-dark m-0'}>
                            ขนาดพื้นที่ : <span className={'text-muted fw-normal'}>{farm.amount_of_rai} ไร่ {farm.amount_of_square_wa} ตร.ว.</span>
                        </h1>
                    </div>

                ))}

            </Layout>
            <Footer/>
        </div>

    )
}

export default Home;

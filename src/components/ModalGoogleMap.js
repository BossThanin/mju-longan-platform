import {
    Autocomplete,
    DrawingManager,
    GoogleMap,
    Marker,
    OverlayView,
    Polygon,
    useJsApiLoader,
} from "@react-google-maps/api";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Modal, ModalBody} from "reactstrap";
import {alertError} from "./AlertDialogs";
import '../assets/css/GoogleMap.css'
import Longan_tree from "../assets/images/longan_tree";
import {logout} from "../api/AuthApi";
import image_emtry from '../assets/images/image_emtry.png'

const containerStyle = {
    width: '100vw',
    height: '70vh'
};

const defaultCenter = {
    lat: 18.7977228,
    lng: 98.9574443
};


const libraries = ['places', 'drawing']
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
let polygons = null;
let boundary = [];
let areas = 0;
let markerPosition = null;
const ModalGoogleMap = ({modalIsOpen, closeModal, setPolygon, setArea, setLocation, propPolygons, drawingModes, propMarker, propMarkerName, isCreateFarm}) => {
    const [searchResult, setSearchResult] = useState();
    const [center, setCenter] = useState(defaultCenter);


    const [imageMap, setImageMap] = useState('');
    const [addressMap, setAddressMap] = useState('')
    const [nameMap, setNameMap] = useState('');

    const [checkValue, setCheckValue] = useState('');

    let { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries,
        language:'th'
    })

    const onLoadDrawing = (drawingManager) => {
        if(propPolygons) {
            const google = window.google;
            setCenter(propPolygons[0])
            polygons = new google.maps.Polygon({ paths: propPolygons }); //polygon format
        }

        if(propMarker) {
            let propMarkerSplit = propMarker.split(',')
            if(propMarkerSplit && propMarkerSplit.length > 0) {
                markerPosition = {
                    lat: parseFloat(propMarkerSplit[0]),
                    lng: parseFloat(propMarkerSplit[1])
                }
                setCenter(markerPosition)
            }
        }

        if(!propPolygons && !propMarker) {
            navigator.geolocation.getCurrentPosition(({coords}) => {
                setCenter({lat: coords.latitude, lng: coords.longitude})
            })
        }
    }

    const onPolygonComplete = (polygon) => {
        polygon.setMap(null)
        markerPosition = null;
        setLocation('')
        const poly = polygon.getPath()
        const google = window.google;
        let area = google.maps.geometry.spherical.computeArea(poly)
        setArea && setArea(area)
        mapBoundaryToArray(poly)
    };

    const mapBoundaryToArray = (poly) => {
        let bounds = [];
        for (let i = 0; i < poly.length; i++) {
            let point = {
                lat: poly.getAt(i).lat(),
                lng: poly.getAt(i).lng()
            };
            bounds.push(point);
        }
        const google = window.google;
        polygons = new google.maps.Polygon({ paths: bounds }); //polygon format
        setPolygon(bounds) //array lat lng of polygon
    }

    const onMarkerComplete = (marker) => {
        console.log('polygons >>> ', polygons)
        if(polygons){
            markerPosition = marker.getPosition();
            let locationStr = `${parseFloat(markerPosition.lat()).toFixed(6)}, ${parseFloat(markerPosition.lng()).toFixed(6)}`
            const google = window.google;
            let is_inside = google.maps.geometry.poly.containsLocation(markerPosition, polygons)
            if(is_inside) {
                setLocation(locationStr)
            }else {

                alertError('', `กรุณาเลือกพิกัด${isCreateFarm ? 'สวน' : 'ต้นลำไย'}ให้อยู่ในขอบเขต`)
            }
        }else {
            alertError('', 'กรุณาวาดขอบเขตของสวนก่อนเลือกพิกัด')
            // setLocation(locationStr)
        }
    }

    const handleCloseMap = () => {
        closeModal()
    }

    const unMountModal = () => {
        markerPosition = null
        polygons = [];
        areas = 0;
    }

    const onLoadSearchPlace = (autoComplete) => {
        setSearchResult(autoComplete)
    }

    const onPlaceChanged = () => {
        console.log('searchResult .... ', searchResult.getPlace())
        if (searchResult != null) {
            //variable to store the result
            const place = searchResult.getPlace();
            console.log(place)
            try {
                if (place.photos[0].getUrl()){
                    setImageMap(place.photos[0].getUrl())
                }else{
                    setImageMap(null)
                }
                setAddressMap(place.formatted_address)
                setNameMap(place.name)
            }catch (e){
                setImageMap(null)
                setAddressMap('')
                setNameMap('')
            }


            if(place && place.geometry){
                const latLng = place.geometry.location;
                setCenter(latLng)
            }
        } else {
            alert("Please enter text");
        }
    }

    const options = {
        region: 'th',
        language: 'th',
        componentRestrictions: {
            country: 'th'
        },
    }

    return isLoaded ? (
        <Modal  isOpen={modalIsOpen}
                centered={true}
                scrollable={true}
                fade={true}
                fullscreen={true}
                className={'position-relative'}
        >
            <div className={'Google-map-container'} style={{height:"100vh"}}>

                <GoogleMap
                    id="farm-google-map"
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={18}
                    options={{
                        zoomControl:false,
                        mapTypeId:'satellite'
                    }}
                    // mapTypeId={'satellite'}
                >
                    <DrawingManager
                        onLoad={onLoadDrawing}
                        onPolygonComplete={onPolygonComplete}
                        onMarkerComplete={onMarkerComplete}
                        onUnmount={unMountModal}
                        options={{
                            drawingControlOptions: {
                                drawingModes,
                                position: window.google.maps.ControlPosition.RIGHT_BOTTOM
                            },
                            drawingControl: true,
                            polygonOptions: {
                                clickable: isCreateFarm,
                                editable: isCreateFarm,
                                draggable: false,
                                strokeColor: '#FF0000',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#FF0000',
                                fillOpacity: 0.1,
                            },
                            markerOptions: {
                                visible: false,
                            }
                        }}
                    />

                    {
                        markerPosition &&
                        <Marker position={markerPosition}/>
                    }

                    {
                        markerPosition &&
                        <OverlayView mapPaneName="markerLayer" position={markerPosition}>
                            <div className="marker-label">
                                <div style={{color: 'black', fontSize: 16}} className="mb-2">{propMarkerName}</div>
                                <div style={{fontSize: 12, color: '#727178'}}>{propMarker}</div>
                            </div>
                        </OverlayView>
                    }

                    {
                        propPolygons &&
                        <Polygon paths={propPolygons}
                                 options={{
                                     strokeColor: '#FF0000',
                                     strokeOpacity: 0.8,
                                     strokeWeight: 2,
                                     fillColor: '#FF0000',
                                     fillOpacity: 0.1,
                                     editable: false,
                                     clickable: false
                                 }}
                        />
                    }




                </GoogleMap>
                <div style={styleSearchContainer}>
                    <Autocomplete
                        apiKey={apiKey}
                        onPlaceChanged={onPlaceChanged}
                        onLoad={onLoadSearchPlace}
                        options={options}
                        language={'th'}
                    >
                        <input
                            type="text"
                            placeholder="ค้นหาสวน"
                            style={{}}
                            className={'form-control'}
                            onChange={(e)=>setCheckValue(e.target.value)}
                        />
                    </Autocomplete>
                    {
                        checkValue === '' ? (
                            <div className={'w-100 d-flex justify-content-center align-items-center  h-100 position-relative'}>
                                <div className={'position-absolute mt-4'} style={{top:0}} >
                                    <Longan_tree/>
                                    <p style={{fontSize:20}}>ไม่พบผลการค้นหา</p>
                                </div>
                            </div>
                        ) :
                            <div className={'w-100 h-100 position-relative'}>
                                <div className={'position-absolute w-100 mt-4 d-flex justify-content-start overflow-scroll bg-second p-3 align-items-center'}
                                     style={{
                                         top:0,
                                         borderRadius:14
                                }}
                                >
                                    <div className={'image'}>
                                        <img src={imageMap ? imageMap : image_emtry} alt="" width={60} height={60} style={{borderRadius:20}}/>
                                    </div>
                                    <div className={'ms-2 overflow-hidden'}>
                                        <h1 className={'p-0 m-0 mb-2 fw-bold'} style={{fontSize:16}}>{nameMap}</h1>
                                        <p className={'p-0 m-0'} style={{fontSize:14}}>
                                            <span className={'fw-bold'}>ที่อยู่ :</span> {addressMap}
                                        </p>
                                    </div>
                                </div>

                            </div>
                    }
                </div>

                <button className="btn btn-success"
                                    style={{position: 'absolute', bottom: 12, left: '30%', padding: 10, width: '40%', borderRadius: '8px !important',zIndex:1000}}
                                    onClick={() => handleCloseMap()}>ตกลง</button>
            </div>
        </Modal>

    ) : <Modal isOpen={modalIsOpen}
               centered={true}
               scrollable={true}
               fade={true}
    >
        <ModalBody>
            <div className="text-center main-green-color p-3">
                <h5>ไม่สามารถโหลดข้อมูลแผนที่ได้</h5>
                <h5>กรุณาติดต่อผู้ดูแลระบบ</h5>
            </div>
        </ModalBody>
    </Modal>
}

export default ModalGoogleMap;

const styleSearchContainer = {
    bottom:'30vh',
    position: "absolute",
    zIndex: 1000,
    width: '100%',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop:20,
    background: 'white',
    borderRadius: '40px 40px 0px 0px',
}


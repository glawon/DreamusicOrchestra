import React, {Component, useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import videoPoster from "../externals/posterVideo.png";
import { fetchImages } from './services/admin';

function Video(){
    return(
        <>
            <h1 className="title mt-5 mb-0">Video</h1>
            <span className="text mt-0">Visita la nostra pagina YouTube</span>
            <div className="mt-3">
                <a href="https://www.youtube.com/watch?v=KaR5VUd1_Rs">
                    <video className="img-fluid text-center w-50" poster={videoPoster}>
                        <source src="https://www.youtube.com/watch?v=KaR5VUd1_Rs"/>
                    </video>
                </a>
            </div>
        </>
    );
}

function Gallery(){
        const [index, setIndex] = useState(0);

        const handleSelect = (selectedIndex) => {
            setIndex(selectedIndex);
        };
        const[images, setImages] = useState([]);

        useEffect(()=>{
            async function getImages() {
                try {
                    const images = await fetchImages();
                    console.log(images);
                    setImages(images);
                } catch (error) {
                    alert("Errore nel caricare le immagini: ", error);
                }
            }
                getImages();
        }, [])

    return (
        <>
            <h1 className="header pt-3">Foto</h1>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                
            {images.map(i=>
            {
                return (
                    <Carousel.Item>
                        <img src={i.percorso} className="img-fluid w-50 text-center" alt=""/>
                    </Carousel.Item>
                )
            })
            }   
            </Carousel>
            <Video/>
        </>

    );
}
        /*return(
            <>
            <h1 className="header">Gallery</h1>
            <div id="galleryCarousel" className="carousel slide" data-bs-ride="true">
                <div className="carousel-inner justify-content-center">
                    <div className="carousel-item active" style={{justifyContent:"center"}}>
                    <img src={gallery1} className="img-fluid w-50 text-center" alt="..."/>
                    </div>
                    <div className="carousel-item">
                    <img src={gallery2} className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </>
        );
    }*/

export default Gallery;
import Gallery, { RenderImageProps } from "react-photo-gallery";
import { VendorDetailsBQuery } from "../../http/generated";
import { useCallback, useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { isMobile } from "react-device-detect";
import { getBaseUrl } from "../../utils/other";


const SIZES = [
    //portrait
    { ht: 1000, wd: 700 },
    { ht: 1000, wd: 500 },

    { ht: 800, wd: 600 },
    { ht: 800, wd: 400 },
    { ht: 600, wd: 400 },
    // { ht: 600, wd: 300 },
    // { ht: 500, wd: 300 },
    // { ht: 500, wd: 240 },
    // { ht: 400, wd: 250 },
    // { ht: 400, wd: 200 },
    // { ht: 300, wd: 180 },

    //wide
    { wd: 1000, ht: 800 },
    { ht: 800, wd: 700 },
    { ht: 500, wd: 500 },
    { ht: 350, wd: 350 }

    // { ht: 200, wd: 300 },
    // { ht: 250, wd: 300 },
    // { ht: 150, wd: 300 },
    // { ht: 100, wd: 300 },
    // { ht: 350, wd: 400 },
    // { ht: 300, wd: 400 },
    // { ht: 250, wd: 400 },
    // { ht: 200, wd: 400 },
    // { ht: 150, wd: 400 },
];

function buildUrl(str: string, ht: number, wd: number, _?: number) {

    // return `/p/${str}_q90.jpg`;
    // if (q) return `/p/${str}_${wd}x${ht}q${q}.jpg`;
    return getBaseUrl()+`/p/${str}_${wd}x${ht}q40.jpg`;
}

function chooseNear(goal: number, counts: number[]) {
    return counts.reduce(function(prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
}

function port(ht: number, wd: number) {
    const isWide = wd > ht;
    const ar = isWide ? ht / wd : wd / ht;

    const fixedArs = SIZES.filter(item => isWide ? item.wd > item.ht : item.ht > item.wd)
        .map(val => isWide ? val.ht / val.wd : val.wd / val.ht);

    const wow = chooseNear(ar, fixedArs);

    // size.ht = size.ht * 2;
    // size.wd = size.wd * 2;
    return SIZES.find(val => isWide ? val.wd > val.ht && val.ht / val.wd === wow : val.ht > val.wd && val.wd / val.ht === wow) || SIZES[2];
}

export function GallerySection({ data }: { data: VendorDetailsBQuery; }) {

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setIndex] = useState(0);
    const [images, setImages] = useState(data.vendorDetailsB?.galleryPhoto.map(item => `${getBaseUrl()}/p/${item.id}.jpg`) ?? []);
    const [galleryFold, setGalleryFold] = useState(true);

    useEffect(() => {
        if (images.length < 1)
            setImages(data.vendorDetailsB?.galleryPhoto.map(item => `${getBaseUrl()}/p/${item.id}.jpg`) || []);
        if (images.length < 8)
            setGalleryFold(false);
    }, [data]);

    const targetRowHeight = (_: number): number => {
        //_ containerWidth
        return 340;
    };

    const reactPhotoGalleryColumns = (containerWidth: number): number => {
        // _ containerWidth
        // return 4;
        let columnCount = 4;
        if (containerWidth >= 500) columnCount = 2;
        if (containerWidth >= 768) columnCount = 3;
        if (containerWidth >= 992) columnCount = 4;
        return columnCount;
    };

    function getContainerWidth() {
        let containerWidth = 3;
        let winWidth = window.innerWidth;
        if (winWidth >= 400) containerWidth = winWidth - 50;
        if (winWidth >= 590) containerWidth = 510;
        if (winWidth >= 700) containerWidth = winWidth - 100;
        if (winWidth >= 1290) containerWidth = 1220;
        if (winWidth >= 1400) containerWidth = 1390;
        return containerWidth;
    }

    function getPhotos() {

        type dim = { x: number, y: number }
        const cols = reactPhotoGalleryColumns(getContainerWidth());

        // resized image for perfect row image size
        function getResizedImage(images: dim[], imgIndex: number, containerDim: dim, prevImages: dim[]) {

            const imgX = images[imgIndex]?.x;
            const imgY = images[imgIndex]?.y;
            const containerHeight = containerDim.y;
            const getRowX = (x, y) => {
                if (x === undefined || y === undefined) {
                    return 0;
                }
                return x * containerHeight / y;
            };
            const getRealX = (rowX, realY) => {
                return rowX * realY / containerHeight;
            };
            const getMaxRowX = (realX, realY, rowX) => {
                let d = (realX - rowX) * 0.35 / 2;
                return rowX + 2 * d;
            };
            const rowXs = images.map(i => getRowX(i.x, i.y));
            const prevRowXs = prevImages.map(i => getRowX(i.x, i.y));
            // debugger // verify below
            let curRowXs = [...prevRowXs, ...rowXs.slice(prevRowXs.length)];
            // .splice(0, images.length);

            // avoid errors
            if (!images[imgIndex]?.x || !images[imgIndex]?.y) {
                return images[imgIndex];
            }

            // ignore landscape
            if (imgX > imgY) return images[imgIndex];

            const totalShrinkedX = (() => {
                let totalShrinkedXValue = 0;
                curRowXs.forEach(r => totalShrinkedXValue += r);
                return totalShrinkedXValue;
            })();
            const shrinkedTargetX = getRowX(imgX, imgY);
            const remainingShrinkedX = containerDim.x - totalShrinkedX;
            if (remainingShrinkedX < 5) {
                return images[imgIndex];
            }
            const maxShrinkedTargetX = getMaxRowX(imgX, imgY, shrinkedTargetX);
            const modifiedShrinkedTargetX = ((totalShrinkedX - totalShrinkedX + maxShrinkedTargetX) < containerDim.x) ? maxShrinkedTargetX : shrinkedTargetX + remainingShrinkedX;
            if (shrinkedTargetX < modifiedShrinkedTargetX) return {
                x: getRealX(modifiedShrinkedTargetX, imgY),
                y: imgY
            };
            return images[imgIndex];
        }

        let prevRowImages: dim[] = [];
        return data?.vendorDetailsB?.galleryPhoto.map(
            (image, index, array) => {
                if (!(index % cols)) prevRowImages = [];
                let imageResized;
                try {

                    const dssds = (index: number, maxLenght: number): [dim[], number] => {
                        let r = index;
                        while ((r - 1) % cols) {
                            r--;
                        }
                        r--;
                        let ind = index - r - 1;
                        index++;
                        while (index % cols) {
                            index++;
                        }
                        // let nearestFactorial = index > maxLenght ? maxLenght : index;
                        let nearestFactorial = index;
                        let count = index > maxLenght ? index - maxLenght : cols;
                        let res = [];

                        let c1 = cols;
                        for (let i = 0; i < c1; i++) {
                            res.push(nearestFactorial - (c1 - i));
                        }
                        let dd = [];
                        for (let i = 0; i < count; i++) {
                            dd.push(res[i]);
                        }
                        return [dd.map(g => ({ x: array[g].wd, y: array[g].ht })), ind];
                    };
                    const fs = dssds(index + 1, array.length);
                    // overindex error
                    imageResized = getResizedImage(fs[0], fs[0].length < fs[1] ? fs[0].length - 1 : fs[1], {
                        x: getContainerWidth(),
                        y: targetRowHeight(getContainerWidth())
                    }, prevRowImages);
                    prevRowImages.push(imageResized || { x: image.wd, y: image.ht });
                } catch (e) {
                    console.log(e);
                }
                let dd = port(image.ht, imageResized?.x || image.wd);
                return {
                    src: (() => {
                        return buildUrl(image.id, dd.ht, dd.wd, 95);
                    })(),
                    width: dd.wd,
                    height: dd.ht
                };
            }
        ) || [];
    }

    const imageRenderer = useCallback(
        ({ index, photo, margin }: RenderImageProps) => {
            return (
                <img style={{
                    display: "block",
                    margin: `${margin}px`,
                    cursor: "pointer"
                }} src={photo.src} key={index}
                     onClick={() => {
                         setIndex(index);
                         setIsOpen(true);
                     }}
                     width={photo.width}
                     height={photo.height}
                    // width={photo.height <= 500 ? photo.width : photo.width * 500 / photo.height}
                    // height={photo.height <= 500 ? photo.height : 500}
                />
            );
        }, []
    );

    return (
        <div style={{ marginTop: 50 }}>
            <div className={"container text-center"}>
                <div className={"row"} style={{
                    maxHeight: galleryFold ? isMobile ? "900px" : "800px" : "8000px",
                    overflow: "hidden",
                    position: "relative",
                    transition: `max-height ${isMobile ? 0.6 : 0.3}s ease`
                }}>
                    {/*<div className={'row'}>*/}
                    <div className="col-md-12 col-sm-12" style={{
                        paddingRight: isMobile ? "5px" : null,
                        paddingLeft: isMobile ? "5px" : null
                    }}>
                        <Gallery
                            renderImage={imageRenderer}
                            columns={reactPhotoGalleryColumns}
                            targetRowHeight={targetRowHeight}
                            direction="row"
                            photos={getPhotos()} />
                    </div>
                    {/*</div>*/}
                    {
                        galleryFold &&
                        <div style={{
                            position: "absolute",
                            zIndex: 18,
                            left: 0,
                            right: 0,
                            bottom: "0px",
                            height: "110px",
                            pointerEvents: "none",
                            backgroundImage: "linear-gradient(hsla(0,0%,98.8%,0),#fff 90%)"
                        }} />
                    }
                </div>
                {
                    // images.length > 5 &&
                    <button type={"button"} className={"v2-button secondary-button"} style={{
                        marginTop: !galleryFold ? 28 : 3,
                        position: "relative",
                        zIndex: 30,
                        minWidth: 200
                    }}
                            onClick={() => {
                                if (!galleryFold) {
                                    // window.scrollTo(0,0+100)
                                    window.scrollTo({ top: 150, behavior: "smooth" });
                                }
                                setGalleryFold(!galleryFold);
                            }}>{galleryFold ? "View Full Gallery" : "See Less"}</button>
                }
            </div>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setIndex((photoIndex + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={() =>
                        setIndex((photoIndex + 1) % images.length)
                    }
                />
            )}
        </div>

    );
}

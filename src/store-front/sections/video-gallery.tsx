import { VendorDetailsBQuery, VendorType, VideoUrl } from "../../http/generated";
import Slider, { Settings } from "react-slick";
import { useEffect, useState } from "react";
import { commonState, galleryPreviewPopupState } from "../../state";
import styled from "styled-components";


type Props = {
    videoUrl: VideoUrl
};

function buildUrl(id: string, ht?: number, wd?: number, q?: number) {
    if (!ht || !wd)
        return `/p/${id}.jpg`;
    return `/p/${id}_${wd}x${ht}.jpg`;
}

async function getVimeoThumb(videoUrl) {
    const getId = (url: string) => {
        let regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
        let parseUrl = regExp.exec(url);
        return parseUrl[5];
    };
    let url = "https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/" + getId(videoUrl) + "&width=480&height=360";

    try {
        let res = await fetch(url);
        return (await res.json()).thumbnail_url;
    } catch (error) {
        return null;
    }
}

function getYoutubeThumb(videoUrl) {

    let re = /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
    const getId = (url: string) => {
        return url.match(re)[7];
    };
    return `https://img.youtube.com/vi/${getId(videoUrl)}/maxresdefault.jpg`;
}


/* Views */

function View({ videoUrl }: Props) {
    const [thumb, setThumb] = useState<string>();
    const [isMobile] = commonState.useGlobalState('isMobile')
    useEffect(() => {
        getThumbnail().then(thum => {
            setThumb(thum);
        });
    }, []);

    const getThumbnail = async () => {
        if (videoUrl.customThumbnail?.id) {
            return buildUrl(videoUrl.customThumbnail?.id);
        }
        if (videoUrl.youtubeUrl) {
            return getYoutubeThumb(videoUrl.youtubeUrl);
        }
        if (videoUrl.vimeoUrl) {
            return getVimeoThumb(videoUrl.vimeoUrl);
        }
        return null;
    };

    const onClick = () => {
        galleryPreviewPopupState.setGlobalState("url", videoUrl.youtubeUrl || videoUrl.vimeoUrl);
        galleryPreviewPopupState.setGlobalState("galleryPopupActive", true);
        galleryPreviewPopupState.setGlobalState("title", videoUrl.videoTitle || "");
    };

    const Container = styled.div`
      width: 100%;
      height: 100%;

      &:hover button {
        visibility: visible;
      }

      .title {
        margin-top: 8px;
        color: #003b58;
        font-weight: 500;
        font-size: 14px;
        margin-bottom: -3px;
        :first-letter {text-transform: uppercase}

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .type {
        color: #21201f;
        font-weight: 400;
        font-size: 13px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `;
    const ImgWrapper = styled.div`
      width: 100%;
      padding-top: 56.25%;
      position: relative;

      .img-container {
        border: 1px solid #fff;
        background-color: #ecf7f9;
        position: absolute !important;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 50%;

        }
      }
    `;

    const PlayBtn = styled.div`
      left: 10px;
      bottom: 10px;
      font-size: 20px;
      visibility: hidden;
      position: absolute;
      display: flex;
      flex-direction: column;

      button {
        cursor: pointer;
        background-color: #fff;
        color: #01b4c0;
        border-radius: 50%;
        height: 35px;
        width: 35px;
        font-size: 20px;
        border: none;
        padding: 0;
      }
    `;

    return (
        <Container onClick={() => {
            if (isMobile) {
                onClick()
            }
        }}>
            <ImgWrapper>
                <div className={"img-container"}>
                    {
                        thumb &&
                        <img src={thumb} width={"100%"} />
                    }
                    <PlayBtn onClick={onClick}>
                        <button>
                            <i className={"fa fa-play"} />
                        </button>
                    </PlayBtn>
                </div>
            </ImgWrapper>
            <h5 className={"title"}>{videoUrl.videoTitle}</h5>
            <span className={"type"}>{videoUrl.videoType}</span>
        </Container>
    );
}

export function DeskopView({ data }: { data: VendorDetailsBQuery }) {

    const getVideoGallery = (): VideoUrl[] => {
        switch (data.vendorDetailsB.vendor_type) {
            case VendorType.BandsDj:
                return data.vendorDetailsB.vendorTypes?.band_djs_type?.videoSample;
            case VendorType.Videographer:
                return data.vendorDetailsB.vendorTypes?.videographer_type?.videoSample;
        }
        return [];
    };
    return (
        <div className={"row"}>
            {getVideoGallery()?.map((value, index) =>
                <div className={"col-12 col-sm-6 col-lg-6 col-xl-3"} key={index}>
                    <View videoUrl={value} />
                </div>
            )}
        </div>
    );
}


const CusPaging = (index: number) => {
    const slideNumber = index + 1;
    const Button = styled.button`
      border: none;
      margin: 0;
      vertical-align: middle;
      padding: 0 !important;
      cursor: pointer;
      background-color: transparent;

      &::before {
        content: none !important;
      }

      & > div {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid #767676;

        .slick-active & {
          width: 15px;
          height: 15px;
          background-color: #01b4c0;
          border: none;
        }
      }

    `;

    return (
        <Button
            type="button"
            className="carousel-dot__container"
            aria-label={`Select Slide ${slideNumber}`}
        >
            <div className="carousel-dot" />
        </Button>
    );
};

function MobileView({ data }: { data: VendorDetailsBQuery }) {
    const getVideoGallery = (): VideoUrl[] => {
        switch (data.vendorDetailsB.vendor_type) {
            case VendorType.BandsDj:
                return data.vendorDetailsB.vendorTypes?.band_djs_type?.videoSample;
            case VendorType.Videographer:
                return data.vendorDetailsB.vendorTypes?.videographer_type?.videoSample;
        }
        return [];
    };


    const carouselSettings: Settings = {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true as any,
        dots: true,
        arrows: false,
        customPaging: CusPaging
    };
    return (
        <div>
            <Slider {...carouselSettings}>
                {getVideoGallery()?.map((value, index) =>
                    <div className={"col-12 mb-2"} key={index}>
                        <View videoUrl={value} />
                    </div>
                )}
            </Slider>
        </div>
    );
}


export function VideoGallery({ data }: { data: VendorDetailsBQuery }) {
    const getTitle = () => {
        switch (data.vendorDetailsB.vendor_type) {
            case VendorType.BandsDj:
                return "Performance Samples";
            case VendorType.Videographer:
                return "Wedding Video Samples";
        }
        return "Videos";
    };
    const Title = styled.h1`
      font-family: Serif;
      margin-bottom: 27px;
      @media(max-width: 767px) {
        margin-bottom: 37px;
        text-align: center;
      }
    `;
    return (
        <div>
            <div className={"hidden-xs"}>
                <div className={"container"} style={{marginTop: 50}}>
                    <Title>
                        {getTitle()}
                    </Title>
                    <DeskopView data={data} />
                </div>
            </div>
            <div className={"visible-xs"}style={{marginTop: 50}}>
                <Title>
                    {getTitle()}
                </Title>
                <MobileView data={data} />
            </div>
        </div>
    );
}


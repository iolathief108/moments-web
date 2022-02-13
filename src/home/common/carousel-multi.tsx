import Slider, { Settings } from "react-slick";
import { commonState } from "../../state";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";


type ItemProps = {
    img: string
    name: string
    link: string
    icon: string
}
const Item = ({ img, name, link, icon }: ItemProps) => {
    const [isMobile] = commonState.useGlobalState("isMobile");
    const history = useHistory();
    let mousePos = undefined;

    const A1 = styled.a`
      ${isMobile ? "width: 240px" : ""};

      .text {
        background-color: rgb(255, 255, 255);
        color: rgb(0 0 0 / 85%);
        
        //margin: 4px;
        //padding-left: 8px;
        //padding-right: 14px;
        font-weight: 500;
        font-size: 14px;
        font-family: roboto, sans-serif;
      }

      > div {
        cursor: pointer;
        display: inline-block;

        &:hover .text{
          color: #0075ae;
          //rgb(85, 85, 85)
        }

        > div {
          box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
          background-color: #fff;
          border-radius: 0 0 3px 4px;

          > div {
            border-radius: 5px;
            overflow: hidden;
            cursor: pointer;
          }
        }
      }
    `;

    if (isMobile === undefined) return null;

    return (
        <A1
            onMouseUp={e => {
                if (e.button !== 0) return;
                if (mousePos === e.clientX) {
                    history.push(link);
                }
            }}
            onMouseDown={e => {
                mousePos = e.clientX;
            }}
        >
            <div className={"pl-2 pr-2 pt-2 pb-2"}>
                <div>
                    <div>
                        <img height={"290px"} style={{
                            objectFit: "cover"
                        }} width={"240px"} src={img} />
                        <div style={{
                            paddingLeft: "13px",
                            paddingTop: "3px",
                            paddingBottom: "3px"
                        }}>
                            <img width={30}
                                 style={{ display: "inline-block", marginRight: "4px", paddingBottom: "3px" }}
                                 src={icon} />
                            <span className={"text text-capitalize"}>
                                {/*<i style={{ paddingRight: "3px" }} className={"fa fa-map-marker-alt"} /> */}
                                {name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </A1>
    );
};

type CarouselProps = {
    urls: {
        url: string
        name: string
        link: string
        icon: string
    }[]
}

export function CarouselMulti(props: CarouselProps) {
    const [isMobileWidth] = commonState.useGlobalState("isMobileWidth");
    const [isMobile] = commonState.useGlobalState("isMobile");
    const settings: Settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        arrows: true,
        initialSlide: 0,
        swipeToSlide: true,
        variableWidth: true,
        edgeFriction: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    // slidesToShow: 3,
                    // slidesToScroll: 3,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    // slidesToShow: 2,
                    // slidesToScroll: 2,
                    // initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    // slidesToShow: 1,
                    // slidesToScroll: 1
                }
            }
        ]
    };

    if (typeof window === "undefined" || isMobileWidth === undefined || isMobile === undefined) return null;

    if (isMobileWidth && isMobile) {
        return (
            <div style={{
                overflowX: "scroll",
                maxWidth: "1000%"
            }}>
                <div style={{
                    display: "inline-flex"
                }}>
                    {
                        props.urls.map((value, index) => <Item key={index} icon={value.icon} link={value.link}
                                                               img={value.url}
                                                               name={value.name} />)
                    }
                </div>
            </div>
        );
    }

    return (
        <div style={{
            width: "100%"
        }}>
            <Slider {...settings}>
                {
                    props.urls.map((value, index) => <Item key={index} icon={value.icon} link={value.link}
                                                           img={value.url}
                                                           name={value.name} />)
                }
            </Slider>
        </div>
    );
}


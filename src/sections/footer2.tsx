import { getCategoryUrl } from "../utils/other";
import { VendorType } from "../http/generated";
import { businessName } from "../shared";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FootTexts } from "./foot-texts";


function Detail() {
    const Container = styled.div`
      box-sizing: border-box;
      //float: left;
      //width: 42%;
      padding: 0 15px;
      color: #505050;

      .logo {
        background-image: url("/images/logo-large2.png");
        height: 29px;
        width: auto;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: left;
      }

      .tagline {
        padding-bottom: 15px;
        padding-top: 8px;
      }

      .copyright {
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 5px;
      }

      .social-icons {
        margin-bottom: 15px;
        padding-right: 0px;

        li {
          display: inline-block;
        }

        a {
          font-weight: 400;
        }

        i {
          color: #505050;
          font-size: 21px;
          padding-right: 10px;
          :first-child {
            margin-left: -5px;
          }
        }
      }

      .terms-links {
        li {
          display: inline-block;
          font-size: 14px;
          line-height: 22px;
        }

        > li + li:before {
          content: "/";
          padding: 0 3px;
        }
      }
    `;

    return (
        <Container className={"fitem col-12 col-md-6 col-lg-5 pr-lg-5"}>
            <div className="logo" />
            <div className="tagline">We’ll help you find vendors for your location, style, and more.</div>
            <ul className="social-icons">
                <li>
                    <a aria-label="Facebook" href="https://www.facebook.com/moments108" target="_blank">
                        <i className="moments-icon-facebook" />
                    </a>
                </li>
                <li>
                    <a aria-label="Pinterest" href="https://pinterest.com/moments.lk" target="_blank">
                        <i className="moments-icon-pinterest-circled" />
                    </a>
                </li>
                <li>
                    <a aria-label="Instagram" href="https://www.instagram.com/moments_lk_" target="_blank">
                        <i className="moments-icon-instagram" />
                    </a>
                </li>
            </ul>
            <div className="copyright">© <span className="date">2021</span> A & C Consultants Lanka Pvt Ltd. All rights reserved.</div>
            <div>Website Design & Development by <a href="https://www.anclanka.lk/">Anclanka.lk</a></div>
            <ul className="terms-links">
                <li><a href="/privacy" target="_blank">Privacy Policy</a></li>
                <li><a href="/terms" target="_blank">Terms of Use</a></li>
                <li><a href="/site-map" target="_self">Site Map</a></li>
            </ul>
        </Container>
    );
}

function Links() {

    const Container = styled.div`
      box-sizing: border-box;
      //float: left;
      //width: 33%;

      .group {
        float: left;
        box-sizing: border-box;
        width: 50%;
        padding: 0 15px;
        @media (max-width: 767px) {
          padding: 0 0;
        }
      }

      h3 {
        margin: 20px 0;
        font-family: proxima-nova, Helvetica, Arial, sans-serif;
        font-size: 18px;
        font-weight: 400;
        color: #21201f;
      }

      li {
        padding-bottom: 5px;
        font-size: 14px;
        color: #505050;
      }

    `;

    return (
        <Container className={"fitem col-12 col-md-6 col-lg-4"}>
            <div className={"group"}><h3>Quick Links</h3>
                <ul>
                    <li><Link to={getCategoryUrl(VendorType.Venue)}>Venues</Link></li>
                    <li><Link to={getCategoryUrl(VendorType.Caterer)}>Caterers</Link></li>
                    <li><Link to={getCategoryUrl(VendorType.Photographer)}>Photographers</Link>
                    </li>
                    <li><Link to={getCategoryUrl(VendorType.Florist)}>Florists</Link></li>
                    <li><Link
                        to={getCategoryUrl(VendorType.BeautyProfessional)}>Beauticians</Link>
                    </li>
                </ul>
            </div>
            <div className={"group"}><h3>Help</h3>
                <ul>
                    <li><a href={"/dash"} target={"_blank"}>Vendor Login</a></li>
                    <li><Link to={"/become-a-vendor"}>Become a Vendor</Link></li>
                    <li><Link to={"/terms"}>Terms of Use</Link></li>
                    <li><Link to={"/contact-us"}>Contact Us</Link></li>
                </ul>

            </div>
        </Container>
    );
}

function Address() {
    const Container = styled.div`
      h3 {
        margin: 20px 0;
        font-family: proxima-nova, Helvetica, Arial, sans-serif;
        font-size: 18px;
        font-weight: 400;
        color: #21201f;
      }

      p {
        padding-bottom: 12px;
        font-size: 14px;
        color: #505050;
      }
    `;

    return (
        <Container className={"fitem col-12 col-md-6 col-lg-3"}>
            <h3>Registered Office Address</h3>
            {/*<h3>A & C Consultants Lanka Pvt Ltd</h3>*/}

            <div>
                <p>
                    <span>A & C Consultants Lanka Pvt Ltd</span><br />
                    33/A/6, Mahabuthgamuwa,<br/> Kotikawatha, Colombo.
                    <br/>
                    <div className={'mb-2'}/>
                    <a href="tel://+94112417213">011 2417213</a> /
                    <a href="tel://+94759894127"> 075 9894127</a><br />
                    <a href="mailto:support@moments.lk">support@moments.lk</a>
                </p>
            </div>
        </Container>
    );
}

export function Footer() {
    const Container = styled.footer`
      padding-top: 30px;
      padding-bottom: 30px;
      border-top: 1px solid #d9d9d9;
      @media (max-width: 767px) {
        background-color: rgb(246 248 250 / 65%);
        
      }

      .fitem {
        float: left;
      }
    `;
    return (
        <Container className={'footer'}>
            <div className={"container"}>
                {/*<div className={'row'}>*/}
                {/*    <FootTexts/>*/}
                {/*</div>*/}
                <div className={"row"}>
                    <Detail />
                    <Links />
                    <Address />
                </div>
            </div>
        </Container>
    );
}

import { Link } from "react-router-dom";
import { localVendorTypes } from "../utils/other";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";



export function Header() {

    const inputEl = useRef(null);
    const [thing, setThing] = useState(undefined);
    const Header = styled.div`
      position: absolute;
      width: 100%;
      z-index: 76;
      top: 0;
      left: 0;
      & > .container {
        @media(max-width: 767px) {
            padding-top: 0;
        }
      }
    `;

    useEffect(() => {
        setTimeout(() => {
            if (!thing && inputEl?.current?.offsetHeight) {
                setThing(inputEl.current.offsetHeight);
            }
        }, 100);
    }, []);

    return (
        <div>
            <div style={{ height: thing || "90px" }}></div>
            <Header className="header">
                <div ref={inputEl} className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <nav className="navbar navbar-expand-lg navbar-classic">
                                <Link to="/">
                                    <a className="navbar-brand p-0"> <img height="35px" src="/images/logo-large2.png" alt="" /></a>
                                </Link>
                                <button className={"navbar-toggler collapsed"} data-toggle="collapse"
                                    data-target="#navbar-classic" aria-controls="navbar-classic"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation">
                                    <span className="icon-bar top-bar mt-0" />
                                    <span className="icon-bar middle-bar" />
                                    <span className="icon-bar bottom-bar" />
                                </button>
                                <div className="collapse navbar-collapse" id="navbar-classic">
                                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0 mr-3">
                                        <li className="nav-item">
                                            <Link to={"/"} className="nav-link" id={"menu-1"}>
                                                Home
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/search/"} className="nav-link" id="menu-2">
                                                Find
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" id="menu-3"
                                                data-toggle="dropdown"
                                                aria-haspopup="true" aria-expanded="false">
                                                Suppliers
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="menu-3">
                                                {
                                                    localVendorTypes.map(i => (
                                                        <li key={i.key}>
                                                            <Link to={`/search/${i.slug}`} className="dropdown-item">
                                                                {i.displayName}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </li>
                                    </ul>
                                    <a href="/become-a-vendor" target="_blank"
                                        className="btn btn-default btn-sm mt-3 mt-lg-0">Become a Vendor</a>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </Header>
        </div>
    );
}

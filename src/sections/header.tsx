import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { localVendorTypes } from "../utils/other";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { isDev } from "../utils/pageUtils";


function NavThing({ history }: RouteComponentProps) {
    const navButton = useRef(null);
    const navbar = useRef(null);
    useEffect(() => {
        const un = history.listen(() => {
            navButton?.current?.classList?.add("collapsed");
            navbar?.current?.classList?.remove("show");
        });


        return () => un();
    }, []);

    return (
        <>
            <button ref={navButton} className={"navbar-toggler collapsed"} data-toggle="collapse"
                    data-target="#navbar-classic" aria-controls="navbar-classic"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="icon-bar top-bar mt-0" />
                <span className="icon-bar middle-bar" />
                <span className="icon-bar bottom-bar" />
            </button>
            <div ref={navbar} className="collapse navbar-collapse" id="navbar-classic">
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
                {/*<a href="/become-a-vendor" target={isDev ? undefined : "_blank" }*/}
                {/*   className="btn btn-default btn-sm mt-3 mt-lg-0">Become a Vendor</a>*/}
            </div>
        </>
    );
}

const WithNav = withRouter(NavThing);

export default function Header() {

    const headerContainerEl = useRef(null);
    const [height, setHeight] = useState(undefined);

    const Header = styled.div`
      position: absolute;
      width: 100%;
      z-index: 76;
      top: 0;
      left: 0;

      & > .container {
        @media (max-width: 767px) {
          padding-top: 0;
        }
      }
      .logo {
        height: 35px;
        @media (max-width: 767px) {
          height: 30px;
        }
      }
    `;

    useEffect(() => {
        setTimeout(() => {
            if (!height && headerContainerEl?.current?.offsetHeight) {
                setHeight(headerContainerEl.current.offsetHeight);
            }
        }, 100);

    }, []);

    return (
        <div>
            <div style={{ height: height || "90px" }}/>
            <Header className="header">
                <div ref={headerContainerEl} className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <nav className="navbar navbar-expand-lg navbar-classic">
                                <Link className={'navbar-brand p-0'} to="/">
                                     <img className={'logo'} src="/images/logo-large2.png" alt="" />
                                </Link>
                                <WithNav />
                            </nav>
                        </div>
                    </div>
                </div>
            </Header>
        </div>
    );
}



import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "normalize.css";
import "./styles/globals.scss";
import "./styles/override.scss";
import { Footer } from "./sections/footer";
import { Header } from "./sections/header";
import { Home } from "./home";
import ContactUs from "./sections/contact-us";
import Dev from "./sections/dev";
import TermsOfUse from "./sections/terms";
import Search from "./search";
import StoreFront from "./store-front";
import ScrollToTop from './utils/scroll-top';
import styled from "styled-components";
import {Link} from 'react-router-dom'


function Routes() {
    return (
        <Switch>
            <Route exact path="/" children={<Home />} />
            <Route exact path="/search/:id" children={<Search />} />
            <Route exact path="/search/" children={<Search />} />
            <Route exact path="/wedding-vendors/:cat/:id/" children={<StoreFront />} />

            <Route exact path="/contact-us/" children={<ContactUs />} />
            <Route exact path="/become-a-vendor/" children={<ContactUs />} />
            <Route exact path="/dev" children={<Dev />} />
            <Route exact path="/terms-of-use/" children={<TermsOfUse />} />
            <Route exact path="/:id/" children={<StoreFront />} />

            <Route path="/" children={<NotFound />} />
        </Switch>
    );
}

export default function App() {
    return (
        <Router>
            <Header />
            <ScrollToTop />
            <Routes />
            <Footer />
        </Router>
    );
}

export function NotFound() {
    const Container = styled.div`
      h1 {
        font-size: 80px;
        font-weight: 800;
        text-align: center;
      }

      a {
        color: #35b2ee;
        font-weight: bold;

        &:hover {
          color: #73cde7
        }
      }

      h2 {
        font-size: 25px;
        text-align: center;
        margin-top: -10px;
      }

      p {
        text-align: center;
      }

      .container {
        max-width: 360px;
        margin: 15% auto;
      }
    `
    return (
        <Container>
            <div className="container">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The Page you are looking for doesn't exist or an other error occured. Go to <Link to="/">Home Page.</Link>
                </p>
            </div>
        </Container>
    );
}

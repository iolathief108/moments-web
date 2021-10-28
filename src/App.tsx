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


function Routes() {
    return (
        <Switch>
            <Route exact path="/" children={<Home />} />
            <Route exact path="/search/:id" children={<Search />} />
            <Route exact path="/search/" children={<Search />} />
            <Route exact path="/wedding-vendors/:cat/:id/" children={<StoreFront />} />

            <Route exact path="/contact-us/" children={<ContactUs />} />
            <Route exact path="/dev" children={<Dev />} />
            <Route exact path="/terms-of-use/" children={<TermsOfUse />} />

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

function NotFound() {
    return (
        <div>
            <h2>hey you are entered on 404 page fuck you</h2>
        </div>
    );
}

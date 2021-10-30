import {Carousel} from '../common/carousel';
import {commonState} from '../../state';
import {Link} from 'react-router-dom';

const SideText = () => {
    const [isMobile] = commonState.useGlobalState('isMobile');

    if (isMobile) {
        return (
            <div className={isMobile ? 'text-center text-md-left pr-xl-2' : ''}
                 style={{maxWidth: '480px', margin: 'auto'}}>
                <h3 className={'serif h-75 mb-3'} style={{
                    fontSize: '32px',
                    fontWeight: 200,
                    marginBottom: '25px',
                }}>Your Stress-Free Wedding Vendor Search</h3>
                <p style={{
                    fontSize: '20px',
                    marginBottom: '24px',
                    color: '#21201f',
                    fontFamily: 'proxima-nova,Helvetica,Arial,sans-serif',
                }}>We’ll help you find vendors for your wedding location, style, and more — all pre-screened to save you
                    time.</p>
                <Link to="/search">
                    <a className="ctaButton__LPaQx primary-button v2-button" >Find Vendors in
                        Your
                        Area</a>
                </Link>
            </div>
        );
    }

    return (
        <div className={isMobile ? 'text-center' : 'pl-xl-5'}>
            <h3 className={'serif h-75 mb-3'} style={{
                fontSize: '32px',
                fontWeight: 200,
                marginBottom: '25px',
            }}>Your Stress-Free Wedding Vendor Search</h3>
            <p style={{
                fontSize: '20px',
                marginBottom: '24px',
                color: '#21201f',
                fontFamily: 'proxima-nova,Helvetica,Arial,sans-serif',
            }}>We’ll help you find vendors for your wedding location, style, and more — all pre-screened to save you
                time.</p>
            <a className="ctaButton__LPaQx primary-button v2-button" href="/search" target={'_blank'}>Find Vendors in Your
                Area</a>
        </div>
    );
};

const CarWrap = () => {

    const [isMobile] = commonState.useGlobalState('isMobile');

    const heroImageUrls = [
        '/images/hero/hero (1).jpg',
        '/images/hero/hero (2).jpg',
        '/images/hero/hero (3).jpg',
        '/images/hero/hero (4).jpg',
        '/images/hero/hero (5).jpg',
        '/images/hero/hero (6).jpg',
    ];

    const mobileThing = [
        '/images/hero/hero (1).jpg',
        '/images/hero/hero (2).jpg',
        '/images/hero/hero (3).jpg',
        '/images/hero/hero (4).jpg',
    ];

    if (isMobile === undefined) return null;

    return (
        <Carousel urls={isMobile ? mobileThing : heroImageUrls}/>
    );
};

const HeroMobile = () => {
    return (
        <div className={'mb-5 mb-md-0'}>
            <div className={'row'}>
                <div className={'col-12 col-md-6 col-lg-8'}>
                    <CarWrap/>
                </div>
                <div className={'mt-4 col-12 col-md-6 col-lg-4'}>
                    <SideText/>
                </div>
            </div>
        </div>
    );
};

export function Hero() {

    const [isMobile] = commonState.useGlobalState('isMobile');


    if (isMobile === undefined)
        return null;

    if (!isMobile)
        return (
            <span>
                <div className={'row'}>
                    <div className={'col-12 col-md-6 col-lg-5 col-xl-4 p-4 px-sm-5 px-xl-2 pt-xl-5 pr-md-2'}>
                        <SideText/>
                    </div>
                    <div className={'col-12 col-md-6 col-lg-7 col-xl-8'}>
                        <CarWrap/>
                    </div>
                </div>
            </span>
        );

    return (
        <HeroMobile/>
    );
    return null;
}

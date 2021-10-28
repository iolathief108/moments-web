import {VendorDetailsBQuery} from '../../http/generated';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import {getVendorTypeInfo} from '../../utils/other';
import {isMobile} from 'react-device-detect';
import {contactPopupState} from '../../state';
import styled from "styled-components";

const Inquiry = styled.div`
  max-width: 350px;
  margin-top: -20px;
  margin-left: auto;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
  text-align: center;
  padding: 20px;
`
const OverviewButton = styled.button`
  height: 44px;
  border: 1px solid transparent;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  font-family: proxima-nova,Helvetica,Arial,sans-serif;
  padding-left: 16px;
  padding-right: 16px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  box-shadow: 0 0 8px 0 rgb(0 59 88 / 10%);
  width: 100%;
  background-color: #003b58;
  color: #fff;
`

export function OverviewSection({data}: {data: VendorDetailsBQuery}) {
    return (
        <div>
            <div className={'container'}>
                <div className="row" style={{marginBottom: isMobile? '20px':'70px'}}>
                    <div className="col-md-8 col-sm-12">
                        <h6 style={{
                            marginBottom: 0,
                            fontWeight: 'lighter',
                            color: 'rgb(162 162 162)'
                        }}>{getVendorTypeInfo(data.vendorDetailsB?.vendor_type).displayName}</h6>
                        <h1 className="h1"
                            style={{
                                marginBottom: 0,
                                marginTop: 0,
                                fontFamily: 'serif'
                            }}
                        >{data.vendorDetailsB?.business_name}</h1>
                        <h6 className="location" style={{fontWeight: 'normal', marginTop: '7px', color: 'rgb(112 112 112)'}}>
                            {getVendorTypeInfo(data.vendorDetailsB?.vendor_type)?.displayName.replaceAll('Wedding', '')}
                            {' '}Based in {data.vendorDetailsB?.searchLocations[0].name}
                            {
                                (data.vendorDetailsB?.searchLocations.length || 0) > 1 ?
                                    <Tooltip
                                        placement="top"
                                        trigger={['click', 'hover']}
                                        overlay={
                                            <span>
                                                {
                                                    (data.vendorDetailsB?.searchLocations.slice(1) ?? []).map(item => (
                                                        <span key={item.name}>
                                                            <span>{item.name}</span><br/>
                                                        </span>),
                                                    )
                                                }
                                            </span>
                                        }
                                        arrowContent={<div className="rc-tooltip-arrow-inner"/>}
                                    >
                                        <a style={{
                                            color: '#0075ae',
                                            fontWeight: 'bold'
                                        }}> +{(data.vendorDetailsB?.searchLocations.length || 0) - 1} locations</a>
                                    </Tooltip> : null
                            }
                        </h6>
                        {/*<div>Pricing starts at $150 per person</div>*/}
                    </div>
                    <div className="col-md-4 mt-3 hidden-sm hidden-xs">
                        <Inquiry>
                            <div style={{
                                textAlign: 'left',
                            }}>
                                {/*<h5>Contact Us</h5>*/}
                                {/*<div><span*/}
                                {/*    style={{fontWeight: 'bold'}}>Phone:</span> {data.vendorDetailsB?.phone.replace('+94', '0')}*/}
                                {/*</div>*/}
                                {/*<div><span style={{fontWeight: 'bold'}}>Address:</span> {data.vendorDetailsB?.address}*/}
                                {/*</div>*/}
                            </div>
                                <div style={{marginBottom: '12px'}}>Want this vendor to be part of your wedding?</div>
                                <OverviewButton type="button" role="button"
                                        style={{visibility: 'visible'}}
                                        onClick={() => contactPopupState.setGlobalState('contactPopupActive', true)}
                                >Learn More & Inquire
                                </OverviewButton>
                        </Inquiry>
                    </div>
                </div>
            </div>
        </div>
    );
}

import {createGlobalState} from 'react-hooks-global-state';
import {VendorType} from '../http/generated';
import {isMobile} from 'react-device-detect';


type wow = {
    districtKey: string | null
    vendorType: VendorType | null
    districtId: string | null
    disKeySec: string | null
    vTypeSec: VendorType | null
}

export const searchState = createGlobalState<wow>({
    districtId: null,
    districtKey: null,
    vendorType: null,
    disKeySec: null,
    vTypeSec: null,
});

type pProp = {
    contactPopupActive: boolean
}
export const contactPopupState = createGlobalState<pProp>({
    contactPopupActive: false,
});


type gProp = {
    galleryPopupActive: boolean
    url: string
    title: string
}
export const galleryPreviewPopupState = createGlobalState<gProp>({
    galleryPopupActive: false,
    url: '',
    title:''
});




type Common = {
    isMobile: boolean
    isMobileWidth: boolean
}
export const commonState = createGlobalState<Common>({
    isMobile: undefined,
    isMobileWidth: undefined
});
if (typeof window !== 'undefined') {
    commonState.setGlobalState('isMobileWidth', window.screen.width < 576);
}
setTimeout(() => {
    commonState.setGlobalState('isMobile', isMobile);
}, 140);

// setTimeout(() => {
//     if (commonState.getGlobalState('isMobile') === isMobile) {
//         commonState.setGlobalState('isMobile', !isMobile);
//         setTimeout(() => commonState.setGlobalState('isMobile', isMobile), 200);
//     } else {
//         commonState.setGlobalState('isMobile', isMobile);
//     }
// }, 300);
//

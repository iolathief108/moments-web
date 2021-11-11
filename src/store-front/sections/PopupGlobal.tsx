import { ContactPopup } from "./contact-popup";
import { GalleryPreview } from "./gallery-preview";
import { contactPopupState, galleryPreviewPopupState } from "../../state";
import { VendorDetailsBQuery } from "../../http/generated";


export function PopupGlobal({ data }: { data: VendorDetailsBQuery }) {
    const [popupActive] = contactPopupState.useGlobalState("contactPopupActive");
    const [gPopupActive] = galleryPreviewPopupState.useGlobalState("galleryPopupActive");

    return (
        <div>
            {
                popupActive ? <ContactPopup data={data} /> :
                    gPopupActive ? <GalleryPreview data={data} /> : null
            }
        </div>

    );
}

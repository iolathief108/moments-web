import { VendorDetailsBQuery, VendorType, VideoUrl, VideoUrlInput } from "../../http/generated";
import { YoutubeEmbed } from "../comps/youtube";
import { VimeoEmbed } from "../comps/vimeo";


export function Highlight({ data }: { data: VendorDetailsBQuery }) {
    const getHigh = ():VideoUrl => {
        switch (data.vendorDetailsB.vendor_type) {
            case VendorType.Jewellery:
                return data.vendorDetailsB.vendorTypes?.band_djs_type?.hightlight
            case VendorType.Venue:
                return data.vendorDetailsB.vendorTypes?.venue_type?.hightlight
            case VendorType.Videographer:
                return data.vendorDetailsB.vendorTypes?.videographer_type?.hightlight
        }
        return undefined;
    }

    let youtubeUrl = () => getHigh()?.youtubeUrl;
    let vimeoUrl = () => !youtubeUrl() && getHigh()?.vimeoUrl;
    return (
        <div>
            {
                youtubeUrl() &&
                <YoutubeEmbed url={youtubeUrl()} />
            }
            {
                vimeoUrl() &&
                <VimeoEmbed url={vimeoUrl()} />
            }
        </div>
    );
}

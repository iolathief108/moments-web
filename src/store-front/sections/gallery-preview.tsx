import { VendorDetailsBQuery } from "../../http/generated";
import { isMobile } from "react-device-detect";
import { galleryPreviewPopupState } from "../../state";
import styled from "styled-components";
import { titleCase } from "../../utils/other";


const ContainerX = styled.div`
  position: relative;
  display: block;
  height: 0;
  padding: 0 0 56.25%;
  overflow: hidden;


  //position: relative;
  //height: 575px;
  //background-color: #21201f;
  //max-width: 1160px;
  @media (max-width: 1199px) {
    margin-bottom: 0;
  }
  @media (max-width: 991px) {
    height: 56.25vw;
    background-color: #fff;
  }

  & > iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;
export const YoutubeEmbed = ({ url }: { url: string }) => {
    let re = /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
    const getId = (url: string) => {
        return url.match(re)[7];
    };

    return (
        <ContainerX className="video-responsive">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getId(url)}?enablejsapi=1&autoplay=0&rel=0&html5=1&showinfo=0&controls=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </ContainerX>
    );
};


export const VimeoEmbed = ({ url }: { url: string }) => {
    const getId = (url: string) => {
        let regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
        let parseUrl = regExp.exec(url);
        return parseUrl[5];
    };


    return (
        <ContainerX className="video-responsive">
            <iframe
                width="100%"
                height="100%"
                src={`https://player.vimeo.com/video/${getId(url)}?autoplay=0&controls=1&title=0&byline=0&portrait=0&showinfo=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded vimeo"
            />
        </ContainerX>
    );
};

function vimeoVid(url) {
    let d = /^(http:\/\/|https:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)(\/?)$/;
    return !!(url?.match(d));
}

const CloseButton = () => {
    const Button = styled.button`
      padding: 0;
      cursor: pointer;
      background: transparent;
      border: 0;
      position: absolute;
      z-index: 1;
      top: 5px;
      right: 5px;
      font-size: 36px;
      line-height: 1;
      height: 36px;
      width: 36px;
      font-weight: 300;
      color: #505050;
    `;
    return (
        <Button onClick={() => galleryPreviewPopupState.setGlobalState("galleryPopupActive", false)} type="button"
                className="modal-close">×</Button>
    );
};

const Content = ({}: { data: VendorDetailsBQuery }) => {
    const [url] = galleryPreviewPopupState.useGlobalState("url");
    return (
        <>
            {
                url && vimeoVid(url) &&
                <VimeoEmbed url={url} />
            }
            {
                url && !vimeoVid(url) &&
                <YoutubeEmbed url={url} />
            }
        </>
    );
};

const Container = styled.div`
  position: fixed;
  z-index: 90;
  top: 40px;
  left: 50%;
  right: auto;
  bottom: auto;
  border: none;
  background: #fff;
  overflow: auto;
  border-radius: 0;
  outline: none;
  transform: translateX(-50%);
  box-shadow: 0 5px 15px rgb(0 0 0 / 50%);
  max-height: 90vh;
  width: 900px;
  max-width: 100%;
  color: #21201f;

  @media (max-width: 767px) {
    top: 0;
    bottom: 0;
    width: 100%;
    max-height: 99vh;
  }
  
`;

export function GalleryPreview({ data }: { data: VendorDetailsBQuery }) {
    const ModelBody = styled.div`
      text-align: center;
      padding: 10px;
      @media (min-width: 768px) {
        padding: 0 20px 20px;
      }
      @media (min-width: 992px) {
        padding: 10px 40px 40px;
      }
    `;

    const TitleContainer = styled.div`
      padding: 20px 20px 0;
      text-align: center;
      
      span {
        font-size: 1.4rem;
        font-weight: 500;
        letter-spacing: 0;
        line-height: 36px;
        
        :first-letter {
          text-transform: uppercase;
        }
      }
    `;

    const [title] = galleryPreviewPopupState.useGlobalState("title");
    return (
        <>
            <Container>
                <CloseButton />
                {
                    title &&
                    <TitleContainer><span>{titleCase(title)}</span></TitleContainer>
                }
                <ModelBody>
                    <Content data={data} />
                </ModelBody>
            </Container>


            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                zIndex: 89,
                backgroundColor: "#0004"
            }} onClick={() => galleryPreviewPopupState.setGlobalState("galleryPopupActive", false)} />
        </>
    );
}

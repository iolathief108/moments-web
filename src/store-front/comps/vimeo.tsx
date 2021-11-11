import styled from "styled-components";




export const VimeoEmbed = ({ url }: { url: string }) => {
    const getId = (url: string) => {
        let regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
        let parseUrl = regExp.exec(url);
        return parseUrl[5];
    };
    const Container = styled.div`
      position: relative;
      height: 575px;
      background-color: #21201f;
      max-width: 1160px;
      margin: 80px auto 70px;
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

    return (
        <Container className="video-responsive">
            <iframe
                width="100%"
                height="100%"
                src={`https://player.vimeo.com/video/${getId(url)}?autoplay=0&controls=1&title=0&byline=0&portrait=0&showinfo=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded vimeo"
            />
        </Container>
    );
};


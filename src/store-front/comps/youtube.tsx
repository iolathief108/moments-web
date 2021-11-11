import styled from "styled-components";


export const YoutubeEmbed = ({ url }: { url: string }) => {
    let re = /(https?:\/\/)?((www\.)?(youtube(-nocookie)?|youtube.googleapis)\.com.*(v\/|v=|vi=|vi\/|e\/|embed\/|user\/.*\/u\/\d+\/)|youtu\.be\/)([_0-9a-z-]+)/i;
    const getId = (url: string) => {
        return url.match(re)[7];
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
                src={`https://www.youtube.com/embed/${getId(url)}?enablejsapi=1&autoplay=0&rel=0&html5=1&showinfo=0&controls=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </Container>
    );
};

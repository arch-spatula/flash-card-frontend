import styled from '@emotion/styled';

export const PictureContainer = styled.picture`
  source,
  img {
    width: 100%;
    border-radius: 1rem;
    filter: brightness(75%);
  }
  position: absolute;
`;

export const LandingPageContainer = styled.div`
  padding: 3.5rem 0 6rem;
`;

export const ImageWrapper = styled.div`
  width: inherit;
  height: 55rem;
  position: relative;
`;

export const CopyWrapper = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${(props) => props.theme.colors.white};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

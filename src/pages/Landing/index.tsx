import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks';
import { ROUTE_PATHS } from '../../constant/config';
import { useEffect } from 'react';
import {
  ImageWrapper,
  LandingPageContainer,
  PictureContainer,
  CopyWrapper,
  ButtonWrapper,
} from './Landing.style';
import flashCardJPG from '/pexels-pixabay-268351_1280.jpg';
import flashCardWEBP from '/pexels-pixabay-268351_1280.webp';
import { Button, PageHeading } from '../../Components';

function Landing() {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate(ROUTE_PATHS.CARDS);
  }, [isLoggedIn, navigate]);

  return (
    <LandingPageContainer>
      <ImageWrapper>
        <CopyWrapper>
          <PageHeading>단단한 기억을 만드는 비밀, 플래시카드!</PageHeading>
          <ButtonWrapper>
            <Button type="button" href={ROUTE_PATHS.SIGN_IN} width={160}>
              로그인
            </Button>
            <Button href={ROUTE_PATHS.SIGN_UP} width={160}>
              회원가입
            </Button>
          </ButtonWrapper>
        </CopyWrapper>
        <PictureContainer>
          <source
            type="image/webp"
            media="all and (min-width: 1320px)"
            src={flashCardWEBP}
            srcSet={flashCardWEBP}
          />
          <source
            type="image/jpeg"
            media="all and (min-width: 1320px)"
            src={flashCardJPG}
            srcSet={flashCardJPG}
          />
          <img srcSet={flashCardJPG} alt="flash card picture" loading="lazy" />
        </PictureContainer>
      </ImageWrapper>
    </LandingPageContainer>
  );
}

export default Landing;

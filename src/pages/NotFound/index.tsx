import { Button, PageHeading } from '@/Components';
import { ROUTE_PATHS } from '@/constant/config';
import { useLogin } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { ButtonWrapper, NotFoundContainer } from './NotFound.style';

function NotFound() {
  const { isLoggedIn } = useLogin();

  const navigate = useNavigate();

  const handle = () => {
    navigate(-1);
  };

  return (
    <NotFoundContainer>
      <PageHeading>Not Found 404</PageHeading>
      <ButtonWrapper>
        <Button
          href={isLoggedIn ? ROUTE_PATHS.CARDS : ROUTE_PATHS.SIGN_IN}
          width={160}
          hierarchy="primary"
        >
          홈으로 이동
        </Button>
        <Button onClick={handle} width={160} hierarchy="secondary">
          뒤로가기 이동
        </Button>
      </ButtonWrapper>
    </NotFoundContainer>
  );
}

export default NotFound;

import { Button, PageHeading } from '../../Components';
import { useLogin } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constant/config';
import { SettingContainer, SettingWrapper } from './Setting.style';

function Setting() {
  const { emptyTokens } = useLogin();
  const navigate = useNavigate();

  const handelSignOut = () => {
    emptyTokens();
    navigate(ROUTE_PATHS.SIGN_IN);
  };

  return (
    <SettingContainer>
      <SettingWrapper>
        <PageHeading>Setting</PageHeading>
        <Button onClick={handelSignOut}>Sign out</Button>
      </SettingWrapper>
    </SettingContainer>
  );
}

export default Setting;

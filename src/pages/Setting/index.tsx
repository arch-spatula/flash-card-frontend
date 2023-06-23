import { Button, PageHeading } from '../../Components';
import { useLogin } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constant/config';
import { SettingContainer, SettingWrapper } from './Setting.style';
import { useEffect, useState } from 'react';

function Setting() {
  const { emptyTokens } = useLogin();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  let timer: NodeJS.Timeout | null = null;

  const handelSignOut = () => {
    setIsLoading(true);
    const randomDelay = Math.floor(Math.random() * 2 + 1) * 1000;

    timer = setTimeout(() => {
      setIsLoading(false);
      emptyTokens();
      navigate(ROUTE_PATHS.SIGN_IN);
    }, randomDelay);
  };

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <SettingContainer>
      <SettingWrapper>
        <PageHeading>Setting</PageHeading>
        <Button onClick={handelSignOut} isLoading={isLoading}>
          Sign out
        </Button>
      </SettingWrapper>
    </SettingContainer>
  );
}

export default Setting;

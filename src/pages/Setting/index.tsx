import { Button, PageHeading } from '../../Components';
import { useFakeSignOut } from '../../hooks';
import { SettingContainer, SettingWrapper } from './Setting.style';

function Setting() {
  const { isLoading, handelSignOut } = useFakeSignOut();
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

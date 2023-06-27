import { PageHeading } from '@/Components';
import { ServerErrorContainer } from './ServerError.style';

function ServerError() {
  return (
    <ServerErrorContainer>
      <PageHeading>죄송합니다. 잠시 후 다시 시도해주세요</PageHeading>
    </ServerErrorContainer>
  );
}

export default ServerError;

import { css } from '@emotion/react';
import styled from '@emotion/styled';

const foo = styled.div`
  color: ${(props) => props.theme.color.red};
`;

import styled from '@emotion/styled';
import { CardContainer, rotate, rotateInverse } from '../../Card.style';

export const CardEditContainer = styled(CardContainer)`
  animation-name: ${(props) => {
    return props.active ? rotateInverse : rotate;
  }};
`;

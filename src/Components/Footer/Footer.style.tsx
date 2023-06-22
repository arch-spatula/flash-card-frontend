import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  height: 15rem;
  background-color: ${(props) => props.theme.colors.gray800};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkContainer = styled(Link)`
  all: unset;
  text-decoration: none;
  ${(props) => props.theme.fonts.body16Regular}
  cursor: pointer;
  color: ${(props) => props.theme.colors.gray200};
  :hover {
    color: ${(props) => props.theme.colors.gray100};
  }
  :active {
    color: ${(props) => props.theme.colors.white};
  }
`;

import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

type NavLinkFontWeightProps = {
  current: 'bold' | 'regular';
};

export const NavLinkFontWeight = styled(Link)<NavLinkFontWeightProps>`
  ${(props) => {
    const fontWeightMap = {
      bold: props.theme.fonts.body16Bold,
      regular: props.theme.fonts.body16Regular,
    };
    return fontWeightMap[props.current];
  }}
`;

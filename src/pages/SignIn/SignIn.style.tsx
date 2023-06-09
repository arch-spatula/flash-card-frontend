import styled from '@emotion/styled';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: inherit;
  width: inherit;
`;

export const MainWrapper = styled.div`
  width: 22.5rem;
  padding: 0 2rem;
`;

export const Title = styled.h1`
  ${(props) => props.theme.fonts.heading24Bold}
  margin: 0 0 1.5rem;
`;

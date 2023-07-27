import styled from '@emotion/styled';

export const DeckListContainer = styled.ul`
  min-height: 345rem;
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const NoCardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.gray050};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 19rem;
  border-radius: 1rem;
  flex-grow: 1;
`;

import styled from '@emotion/styled';

export const NoCardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.gray050};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 19rem;
  border-radius: 1rem;
  flex-grow: 1;
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  flex-grow: 1;
`;

import styled from '@emotion/styled';

export const CardContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  flex-grow: 1;
`;

export const DeckItemContainer = styled.li`
  min-height: 23.25rem;
`;

export const SectionTitle = styled.h2`
  ${(props) => props.theme.fonts.heading20Bold}
  margin: 1.5rem 0;
`;

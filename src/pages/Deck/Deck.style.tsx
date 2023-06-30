import styled from '@emotion/styled';

export const AddCardButton = styled.button``;

export const AddCardContainer = styled.form`
  width: 19.5rem;
  height: 19.5rem;
  padding: 1.25rem;
  background-color: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.shadow.boxShadow}
  border-radius: 1rem;
`;

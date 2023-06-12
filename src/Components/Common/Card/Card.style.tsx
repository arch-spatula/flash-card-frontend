import styled from '@emotion/styled';

export const Question = styled.h3`
  ${(props) => props.theme.fonts.heading20Bold}
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  text-align: center;
  word-break: keep-all;
  word-wrap: break-word;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 19.5rem;
  width: 19.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  padding: 1.25rem;
`;

export const SubmitForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
  height: 2.75rem;
`;

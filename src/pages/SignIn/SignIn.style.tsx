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

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const EmailCheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem;
`;

export const CheckBoxCaption = styled.p`
  ${(props) => props.theme.fonts.body14Regular}
  color: ${(props) => props.theme.colors.gray600};
`;

import styled from 'styled-components';

export const Section = styled.div`
  background-color: white;
  padding: 20px 20px 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px #88888887;
  margin: 20px 0;

  &:hover {
    background-color: #d3d3d35e;
    cursor: pointer;
  }

  @media(max-width: 768px) {
  }
`;

export const Title = styled.h2`
  color: hsl(196,69%,45%);
  font-size: 28px;
  font-weight: 300;
  margin: 0px 0 20px;
  text-align: center;
`;

export const ControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
  top: 66px;
  right: 26px;

  @media (max-width: 768px) {
    position: relative;
    top: unset;
    right: unset;
    width: 100%;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Btn = styled.button<{ variant: string }>`
  box-shadow: 2px 3px 8px 0 hsla(0, 0%, 0%, 0.4);
  ${
    (p) => {
      if (p.variant === 'primary') {
        return `background-image: linear-gradient(120deg,rgb(122 43 214),rgb(153 36 213));`;
      }
    }
  }
  ${
    (p) => {
      if (p.variant === 'secondary') {
        return 'background-color: gray;';
      }
      if (p.variant === 'tertiary') {
        return 'background-color: red;';
      }
    }
  }
  font-size: 16px;
	font-weight: bold;
	text-align: center;
	color: hsl(0, 0%, 100%);
  padding: 12px;
  width: 130px;
  height: 40px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:disabled {
    opacity: 0.75;
    box-shadow: none;
    cursor: not-allowed;
  }
  margin: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 10px 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
`;

export const FormFields = styled.div`
  margin: 0px 40px;
  & label {
    color: hsla(0, 0%, 0%, .84);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

export const NameAndDateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NameWrapper = styled.div`
  width: 50%;
  margin: 25 25 0 0;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

export const DateWrapper = styled.div`
  width: 50%;
  margin: 30 0 0 25;

  @media (max-width: 768px) {
    width: 100%;
    margin: 25 0 0;
  }
`;

export const TextInputWrapper = styled.div`
  position: relative;
  margin: 25 0 0;
`;

export const InputLabel = styled.label`
  color: hsl(0, 0%, 45%);
  font-family: Roboto;
  font-weight: 700;
`;

export const TextInput = styled.input`
  border-radius: 5px;
  border: 1px solid hsla(0,0%,65%);
  width: 100%;
  padding: 14px 13px;
  font-size: 14px;
  outline: none;
  min-width: 0;
  color: hsl(0, 0%, 45%);
  font-family: Roboto;
  font-weight: 400;

  &:placeholder {
    color: hsl(0, 0%, 85%);
  }

  &:focus {
    border-color: hsl(196, 69%, 45%);
  }
`;

export const TextArea = styled.textarea`
  border-radius: 5px;
  border: 1px solid hsla(0,0%,65%);
  width: 100%;
  padding: 14px 13px;
  font-size: 14px;
  outline: none;
  min-width: 0;
  color: hsl(0, 0%, 45%);
  font-family: Roboto;
  font-weight: 400;
  resize: vertical;
  min-height: 200px;
  max-height: 400px;

  &:placeholder {
    color: hsl(0, 0%, 85%);
  }

  &:focus {
    border-color: hsl(196, 69%, 45%);
  }
`;

export const BtnWrapper = styled.div`
  margin: 20px;
  text-align: right;

  @media (max-width: 768px) {
    text-align: center;
    margin: 40px 0 20px -12px;
  }
`;

export const ItemTitle = styled.h1`
`;

export const ItemDescription = styled.p``;

export const ItemDueDate = styled.h2``;

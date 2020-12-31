import styled, { keyframes } from 'styled-components';
import MUIArrowDown from '@material-ui/icons/ArrowDownward';
import MUIChevronLeft from '@material-ui/icons/ChevronLeft';
import MUIChevronRight from '@material-ui/icons/ChevronRight';
import MUIVisibilityOff from '@material-ui/icons/VisibilityOff';
import MUIVisibility from '@material-ui/icons/Visibility';
import { BeatLoader } from 'react-spinners';

// const highlightblue = '#2135c4';
const highlightblue = 'rgb(75, 148, 226)';
// const highlightblue = 'hsl(203, 100%, 58%)';
export const grayColor = 'rgb(74, 74, 74)';

const ThemeLight = 'rgb(36, 96, 213)';
const ThemeDark = 'rgb(10, 87, 143)';
const TextDark = '#152e5e';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-60px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
`;

export const AuthWrapper = styled.div<{
  modal?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  flex-grow: 2;
  padding: 40px;
  height: 80vh;

  @media(max-width: 768px) {
    padding: 10px;
    justify-content: flex-start;
    padding-top: 60px;
  }
`;

export const CloseButton = styled.a`
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #9b9b9b;
  width: 16px;
  height: 16px;
  font-size: 22px;
  font-weight: 500;
  z-index: 1;
  background: transparent;
  &:hover {
    cursor: pointer;
  }
`;

export const Body = styled.div<{ isEnterPassword?: boolean; }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 400px;
  background: hsla(0, 0%, 98%, 1);
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 0 7px 0 hsla(0, 0%, 0%, 0.18);
  position: relative;
  overflow: auto;
  border-radius: 3px;
  opacity: 1;
  animation-duration: 0.3s;
  animation-name: ${fadeIn};

  @media(max-width: 768px) {
    box-shadow: none;
    width: 100%;
  }
`;

export const MastHead = styled.div<{ modal?: boolean }>`
  ${p => p.modal ?
    `background-image: linear-gradient(120deg, ${ThemeDark}, ${ThemeLight});` :
    'background-color: hsl(223, 53%, 23%);'
  };
  background-color: ${p => p.modal ? 'hsl(223, 70%, 42%)' : 'hsl(0, 0%, 95%)'};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
`;

export const Footer = styled.div`
  background-color: hsl(0, 0%, 95%);
  padding: 10;
  width: 100%;
  height: 38px;
`;

export const FooterTxt = styled.div<{ modal?: boolean; hasBackButton?: boolean; }>`
  // text-align: center;
  // padding: 0px 0 15px;
  margin: 1 0 0;
  margin-left: ${p => p.hasBackButton ? '-12px' : '0'};
  text-align: left;
  font-size: 14px;
  color: ${p => p.modal ? ThemeLight : highlightblue};
  // color: rgb(75,148,226);
  font-family: Roboto;
  font-weight: 700;
  cursor: pointer;
`;

export const BounceWrapper = styled.div`
  position: relative;
  margin: auto;
  animation: ${bounce} 2s infinite;
`;

export const Arrow = styled(MUIArrowDown as any) `
  color: hsl(196, 77%, 46%);
  width: 50px !important;
  height: 50px !important;
`;

export const ArrowBack = styled(MUIChevronLeft as any) `
  font-size: 30 !important;
  float: left;
  transform: translate(5px, -7px);
`;

export const ArrowFwd = styled(MUIChevronRight as any) `
  font-size: 30 !important;
  float: right;
  transform: translate(5px, -7px);
`;

export const Title = styled.h2<{ modal?: boolean; }>`
  color: ${p => p.modal ? ThemeLight : highlightblue};
  padding: 0 40px;
  font-size: 30px;
  font-weight: 300;
  // margin: 30px 0 10px;
  margin: 20 0 0;
  text-align: center;
  font-family: Roboto;
`;

export const Subtitle = styled.div`
  text-align: center;
  font-weight: 300;
  color: hsl(0,0%, 30%);
  font-size: 14px;
`;

export const Message = styled.div`
  text-align: center;
  font-weight: 400;
  color: hsl(0,0%,40%);
  font-size: 14px;
  margin: 10px 36px 20px;
  line-height: 26px;
  font-family: Roboto;
`;

export const Text = styled.div`
  padding: 10px 40px;
  font-size: 14px;
  line-height: 1.64rem;
  // color: white;
`;

export const InputGroup = styled.div`
  display: flex;
  margin: 15px 0;
  align-items: baseline;
  @media(max-width: 768px) {
    flex-direction: column;
    flex: 0 0 auto;
  }
`;

export const InputLabel = styled.label`
  color: hsla(0,0%,0%,.84) !important;
  font-size: 12px;
  margin-top: 6px;
  display: block;
  padding-bottom: 5px;
`;
export const TextInputWrapper = styled.div`
  position: relative;
  margin: 25 0 0;
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
export const TextInputErrpr = styled.span`
  color: hsl(26, 100%, 50%);
  bottom: -15px;
  left: 12px;
  position: absolute;
  font-size: 10px;
`;

export const Logo = styled.img`
  max-width: 145px;
  width: 145px;
  margin: 25 0;
`;

export const Tabs = styled.div`
  display: flex;
  flex: 0 0 54px;
  align-items: stretch;
  // margin: 10 0 0;
  // margin: 10 40 0;
`;

export const Tab = styled.div<{ active: boolean; }>`
  cursor: pointer;
  flex: 0 0 50%;
  border-bottom: ${p => p.active ? `1px solid ${highlightblue}` : `1px solid hsl(0, 0%, 87%)`};
  // border-bottom: ${p => p.active ? '2px solid hsl(0, 0%, 100%)' : '2px solid hsl(211, 85%, 45%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
	font-weight: 500;
	color: ${p => p.active ? 'rgb(74, 74, 74)' : 'rgb(150, 150, 150)'};
	// color: ${p => p.active ? 'hsl(0, 0%, 100%)' : 'hsl(211, 85%, 45%)'};
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // margin-bottom: 0;
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
`;

export const BtnWrapper = styled.div`
  margin: 10 38 25; // same l&r as FormFields -2 px to make it perceptually the same width
  text-align: center;
`;

export const SubmitButton = styled.button<{ modal?: boolean; }>`
  // background-color: #1C2E5B;
  box-shadow: 2px 3px 8px 0 hsla(0, 0%, 0%, 0.4);
  background-image: linear-gradient(120deg, ${ThemeDark}, ${ThemeLight});
  font-size: ${p => p.modal ? `20px` : `20px`};
	font-weight: bold;
	text-align: center;
	color: hsl(0, 0%, 100%);
  padding: 15px;
  width: 100%;
  height: 55px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  &:disabled {
    opacity: 0.75;
    // box-shadow: none;
    cursor: not-allowed;
  }
`;

export const Error = styled.div`
  color: hsl(22,97%,50%);
  font-size: 14px;
  padding: 10px 15 10px;
  text-align: center;
`;

export const InlineError = styled.div`
  color: hsl(22, 97%, 50%);
  font-size: 11px;
  padding-top: 0;
  position: absolute;
  bottom: -19px;
  right: 0;
  text-align: center;
`;

export const Success = styled.div`
  color: #2db25c;
  padding: 15px;
  font-size: 18px;
  font-weight: 500;
  text-align: justify;
  line-height: 1.64rem;
  margin: 0 20 20;
`;

export const SuccessText = styled.div`
  color: rgb(75, 148, 226);
  padding: 15px;
  font-size: 18px;
  font-weight: 500;
  text-align: justify;
  line-height: 1.64rem;
  margin: 0 20 20;
`;

export const Loader = styled(BeatLoader).attrs({
  color: highlightblue,
  size: 20,
  margin: '2px'
})`
  margin: auto;
`;

export const LoaderWrapper = styled.div`
  margin: auto;
  min-height: 210px;
  padding: 140 0;
`;

export const VisibilityOff = styled(MUIVisibilityOff as any) `
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 17px;
    color: rgba(36, 96, 213, 0.74);
    cursor: pointer;
`;
export const VisibilityOn = styled(MUIVisibility as any) `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 17px;
  color: rgba(36, 96, 213, 0.74);
  cursor: pointer;
`;

export const DidYouMeanTo = styled.span`
  width: 100%;
  cursor: pointer;
  color: ${highlightblue};
`;

export const formStyles = {
  labelCSS: {
    '&$focused': {
      color: `${highlightblue} !important`
    },
    color: `${grayColor} !important`,
  },
  focused: {},
  underline: {
    '&:before': {
      backgroundColor: grayColor
    },
    '&:after': {
      backgroundColor: `${highlightblue} !important`
    },
    '&:hover:not(disabled):before': {
      backgroundColor: `${highlightblue} !important`
    }
  },
  input: {
    color: `black !important`,
    fontSize: '14px'
  },
  formControlRoot: {
    margin: '0'
  }
};

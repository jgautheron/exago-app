import {
  pinkA200, grey100, grey300, grey500,
  lightBlack, white, cyan500
} from 'material-ui/styles/colors';
// import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#375EAB',
    primary2Color: '#E0EBF5',
    primary3Color: lightBlack,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: '#424540',
    alternateTextColor: '#E0EBF5',
    canvasColor: white,
    borderColor: grey300,
    // disabledColor: 'ColorManipulator.fade(Colors.darkBlack, 0.3)',
    disabledColor: '#CACACA',
    pickerHeaderColor: cyan500,
  }
};

import Colors from 'material-ui/lib/styles/colors';
// import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#375EAB',
    primary2Color: '#E0EBF5',
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: '#424540',
    alternateTextColor: '#E0EBF5',
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    // disabledColor: 'ColorManipulator.fade(Colors.darkBlack, 0.3)',
    disabledColor: '#CACACA',
    pickerHeaderColor: Colors.cyan500,
  }
};

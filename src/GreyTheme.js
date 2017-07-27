import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

const getTheme = () => {
  let overwrites = {
    fontFamily: 'Open Sans Condensed, sans-serif',
    "palette": {
        "primary1Color": fade(Colors.black, 0.49),
        "accent1Color": fade(Colors.darkBlack, 0.87)
    },
    "tabs": {
        "backgroundColor": Colors.white,
        "textColor": fade(Colors.lightBlack, 0.54),
        "selectedTextColor": Colors.grey800
    }
    };
  return getMuiTheme(baseTheme, overwrites);
}

export default getTheme()
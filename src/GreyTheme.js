import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
//using https://cimdalli.github.io/mui-theme-generator/

const getTheme = () => {
  let overwrites = {
    "fontFamily": "Open Sans Condensed, sans-serif",
    "palette": {
        "primary1Color": "rgba(0, 0, 0, 0.49)",
        "accent1Color": "rgba(0, 0, 0, 0.87)",
        "canvasColor": "#F8F7F5"
    },
    "tabs": {
        "backgroundColor": "#F8F7F5",
        "textColor": "rgba(0, 0, 0, 0.54)",
        "selectedTextColor": "#424242"
    }
}
    //console.log(JSON.stringify(overwrites))

  return getMuiTheme(baseTheme, overwrites);
}

export default getTheme()
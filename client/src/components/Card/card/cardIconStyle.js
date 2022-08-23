import {
    dangerCardHeader,
    grayColor,
    infoCardHeader,
    primaryCardHeader,
    roseCardHeader,
    successCardHeader,
    warningCardHeader,
} from "assets/styles/academic-dashboard";

const cardIconStyle = {
    cardIcon: {
        "&$warningCardHeader,&$successCardHeader,&$dangerCardHeader,&$infoCardHeader,&$primaryCardHeader,&$roseCardHeader": {
            backgroundColor: grayColor[0],
            padding: "0px",
            marginTop: "-40px",
            marginLeft: 10,
            float: "left",
            borderRadius: "50%",
        },
    },
    warningCardHeader,
    successCardHeader,
    dangerCardHeader,
    infoCardHeader,
    primaryCardHeader,
    roseCardHeader,
};

export default cardIconStyle;

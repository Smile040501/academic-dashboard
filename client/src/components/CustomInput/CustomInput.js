import { FormHelperText } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Check from "@material-ui/icons/Check";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import classNames from "classnames";
// core components
import styles from "components/CustomInput/customInputStyle.js";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
    const classes = useStyles();
    const {
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        success,
        onChange,
        value,
        helperText,
    } = props;

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error,
    });
    const underlineClasses = classNames({
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
        [classes.underline]: true,
    });
    const marginTop = classNames({
        [classes.marginTop]: labelText === undefined,
    });
    return (
        <FormControl
            {...formControlProps}
            className={formControlProps.className + " " + classes.formControl}
        >
            {labelText !== undefined ? (
                <InputLabel
                    className={classes.labelRoot + labelClasses}
                    htmlFor={id}
                    {...labelProps}
                >
                    {labelText}
                </InputLabel>
            ) : null}
            <Input
                classes={{
                    root: marginTop,
                    disabled: classes.disabled,
                    underline: underlineClasses,
                }}
                onChange={onChange}
                id={id}
                value={value}
                {...inputProps}
            />
            {error ? (
                <Clear className={classes.feedback + " " + classes.labelRootError} />
            ) : success ? (
                <Check className={classes.feedback + " " + classes.labelRootSuccess} />
            ) : null}
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
        </FormControl>
    );
}

CustomInput.propTypes = {
    labelText: PropTypes.node,
    labelProps: PropTypes.object,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    formControlProps: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    helperText: PropTypes.string,
};

import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
    center,
    defaultFont,
    grayColor,
    primaryColor,
} from "assets/styles/academic-dashboard";

import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Pagination from "@material-ui/lab/Pagination";
import Person from "views/People/Person";
import { Search } from "@material-ui/icons";
import VerticalSpacing from "components/Spacing/VerticalSpacing";
import classNames from "classnames";
import { getAllProfiles } from "services/profile";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    search: {
        maxWidth: 400,
        [theme.breakpoints.down("xs")]: {
            maxWidth: 800,
        },
    },
    searchButton: {
        [theme.breakpoints.down("sm")]: {
            top: "-50px !important",
            marginRight: "22px",
            float: "right",
        },
    },
    searchWrapper: {
        ...center,
        [theme.breakpoints.down("sm")]: {
            marginTop: 50,
        },
    },
    searchIcon: {
        width: "17px",
        zIndex: "4",
    },
    margin: {
        zIndex: "4",
        margin: "0",
    },
    primaryColor: {
        "&:hover:not($disabled):before,&:before": {
            borderColor: grayColor[4] + " !important",
            borderWidth: "1px !important",
        },
        "&:after": {
            borderColor: primaryColor[0],
        },
    },
    labelText: {
        ...defaultFont,
        color: grayColor[3] + " !important",
    },
    pagination: {
        backgroundColor: "transparent",
        color: "#19D5C6",
    },
    root: {
        "& .Mui-selected": {
            backgroundColor: primaryColor[0],
            "&:hover": {
                backgroundColor: primaryColor[0],
            },
        },
    },
}));

export default function People(props) {
    const USERS_PER_PAGE = 15;
    const classes = useStyles();
    const [program, setProgram] = useState("");
    const [batch, setBatch] = useState("");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [people, setPeople] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [pageNum, setPageNum] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            if (pageNum !== 1) setPageNum(1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        async function getPeople() {
            let data = await getAllProfiles(
                pageNum,
                USERS_PER_PAGE,
                debouncedSearch,
                program,
                batch
            );
            setTotalResults(data.count);
            setPeople(data.results);
        }

        getPeople();
    }, [pageNum, debouncedSearch, program, batch]);

    const programChangeHandler = (e) => {
        setProgram(e.target.value);
        if (pageNum !== 1) setPageNum(1);
    };

    const batchChangeHandler = (e) => {
        setBatch(e.target.value);
        if (pageNum !== 1) setPageNum(1);
    };

    const searchChangeHandler = (event) => {
        setSearch(event.target.value);
    };

    function startSearch() {
        setSearch(search);
    }

    function handlePagination(event, page) {
        setPageNum(page);
    }

    return (
        <GridContainer>
            <GridItem xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                    <InputLabel
                        className={classes.labelText}
                        shrink
                        id="program-placeholder"
                    >
                        Program
                    </InputLabel>
                    <Select
                        labelId="program-select"
                        id="program"
                        value={program}
                        onChange={programChangeHandler}
                        displayEmpty
                        className={classes.primaryColor}
                        MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                            },
                            getContentAnchorEl: null,
                        }}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                    <InputLabel
                        className={classes.labelText}
                        shrink
                        id="batch-placeholder"
                    >
                        Batch
                    </InputLabel>
                    <Select
                        labelId="batch-select"
                        id="batch"
                        value={batch}
                        onChange={batchChangeHandler}
                        displayEmpty
                        className={classes.primaryColor}
                        MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                            },
                            getContentAnchorEl: null,
                        }}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem className={classes.searchWrapper} xs={12} sm={12} md={4}>
                <CustomInput
                    formControlProps={{
                        className: classNames(classes.margin, classes.search),
                        fullWidth: true,
                    }}
                    inputProps={{
                        placeholder: "Search",
                        inputProps: {
                            "aria-label": "Search",
                        },
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    disableRipple
                                    style={{ backgroundColor: "transparent" }}
                                    aria-label="toggle password visibility"
                                    onClick={startSearch}
                                >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    value={search}
                    onChange={searchChangeHandler}
                    helperText={`${totalResults} results found...`}
                />
            </GridItem>
            <VerticalSpacing spacing={50} />
            {people.map((value, index) => (
                <GridItem key={index} xs={12} sm={6} md={6} lg={4}>
                    <Person person={value} />
                </GridItem>
            ))}
            <GridItem
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                xs={12}
            >
                <VerticalSpacing spacing={50} />
            </GridItem>
            <GridItem
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                xs={12}
            >
                <Pagination
                    count={Math.ceil(totalResults / USERS_PER_PAGE)}
                    defaultPage={1}
                    page={pageNum}
                    onChange={handlePagination}
                    className={classes.root}
                />
            </GridItem>
            <GridItem
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                xs={12}
            >
                <VerticalSpacing spacing={50} />
            </GridItem>
        </GridContainer>
    );
}

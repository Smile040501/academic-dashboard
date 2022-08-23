import {
    Avatar,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { PhotoCamera } from "@material-ui/icons";
import {
    center,
    defaultFont,
    grayColor,
    primaryColor,
} from "assets/styles/academic-dashboard";
import Card from "components/Card/Card";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody";
import RegularButton from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomTabs from "components/CustomTabs/CustomTabs";
import GridContainer from "components/Grid/GridContainer.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser } from "redux/actions/auth";
import { userSelector } from "redux/selector";
import { baseDomainURL } from "services/config";
import { getBase64 } from "services/file";
import {
    discardProfile,
    getLoggedInUser,
    updateProfile,
} from "services/profile";
import EditImage from "views/UserProfile/EditImage";

const API = {
    updateProfile,
    getLoggedInUser,
    discardProfile,
};

const useStyles = makeStyles((theme) => ({
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
    },
    discardButton: {
        backgroundColor: "red",
        "&:hover": {
            backgroundColor: "red",
        },
    },
    imageContainer: {
        position: "relative",
        textAlign: "center",
        color: "white",
        cursor: "pointer",
    },
    iconBottom: {
        position: "absolute",
        left: "50%",
        top: "92%",
        paddingBottom: 1,
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
}));

function UserProfile(props) {
    const classes = useStyles();
    const [user, setUser] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [image, setImage] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const loggedInUser = useSelector(userSelector);
    let imageRef = React.useRef();

    const onImageUpload = (imageList) => {
        setImage(imageList[0]["data_url"]);
        setDialogOpen(true);
    };

    React.useEffect(() => {
        async function initUser() {
            if (loggedInUser) {
                setProfilePic(await getBase64(loggedInUser.user.profile_pic));
                setUser(loggedInUser);
            }
        }

        initUser();
    }, [loggedInUser]);

    const onImageEdit = async (image) => {
        if (image) {
            setProfilePic(image);
        }
        setDialogOpen(false);
    };

    const onDiscard = () => {
        setDialogOpen(false);
    };

    const onDialogClose = () => {
        setImage(null);
    };

    function updateProfile(event, field, innerField) {
        if (!event.target.id) {
            event.target.id = innerField;
        }
        user[field] = { ...user[field], [event.target.id]: event.target.value };
        setUser(JSON.parse(JSON.stringify(user)));
    }

    async function saveProfile() {
        await API.updateProfile(user);
    }

    async function saveProfilePic() {
        user.user.profile_pic = profilePic;
        let data = await API.updateProfile(user);
        setUser(JSON.parse(JSON.stringify(data)));
    }

    async function discardProfile(field) {
        let data = await API.discardProfile(user, field);
        data.user.profile_pic = await getBase64(
            `${baseDomainURL}${data.user.profile_pic}`
        );
        dispatch(setLoggedInUser(data));
        setUser(data);
    }

    let generalProfile = (
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Name"
                    id="name"
                    formControlProps={{
                        fullWidth: true,
                    }}
                    onChange={(e) => updateProfile(e, "user")}
                    value={user?.user.name || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Email"
                    id="email"
                    formControlProps={{
                        fullWidth: true,
                        disabled: true,
                    }}
                    onChange={(e) => updateProfile(e, "user")}
                    value={user?.user.email || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Program at IIT Palakkad"
                    id="program_iit"
                    formControlProps={{
                        fullWidth: true,
                    }}
                    onChange={(e) => updateProfile(e, "user")}
                    value={user?.user.program_iit || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <FormControl
                    style={{
                        paddingBottom: "10px",
                        margin: "27px 0 0 0",
                    }}
                    fullWidth
                >
                    <InputLabel className={classes.labelText}>
                        Current Position
                    </InputLabel>
                    <Select
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
                        className={classes.primaryColor}
                        labelId="role"
                        value={user?.user.role || ""}
                        onChange={(e) => updateProfile(e, "user", "role")}
                    >
                        <MenuItem value={"Alumni"}>Alumni</MenuItem>
                        <MenuItem value={"Faculty"}>Faculty</MenuItem>
                        <MenuItem value={"Student"}>Student</MenuItem>
                    </Select>
                </FormControl>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Current Institution/ Workplace"
                    formControlProps={{
                        fullWidth: true,
                    }}
                    id="current_organisation"
                    onChange={(e) => updateProfile(e, "user")}
                    value={user?.user.current_organisation || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Phone"
                    formControlProps={{
                        fullWidth: true,
                    }}
                    id="phone"
                    onChange={(e) => updateProfile(e, "user")}
                    value={user?.user.phone || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Current stay"
                    id="current_address"
                    onChange={(e) => updateProfile(e, "user")}
                    inputProps={{
                        multiline: true,
                    }}
                    formControlProps={{
                        fullWidth: true,
                    }}
                    value={user?.user.current_address || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <RegularButton
                    color="primary"
                    onClick={() => saveProfile("user")}
                >
                    Save
                </RegularButton>
                <RegularButton
                    color="danger"
                    onClick={() => discardProfile("user")}
                >
                    Discard
                </RegularButton>
            </GridItem>
            <GridItem xs={12} sm={12} md={9}></GridItem>
        </GridContainer>
    );

    let aboutMe = (
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Interests in curricular activities"
                    id="curricular_interests"
                    inputProps={{
                        multiline: true,
                    }}
                    formControlProps={{
                        fullWidth: true,
                    }}
                    onChange={(e) => updateProfile(e, "about")}
                    value={user?.about.curricular_interests || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Interests in co-curricular activities"
                    id="co_curricular_interests"
                    inputProps={{
                        multiline: true,
                    }}
                    formControlProps={{
                        fullWidth: true,
                    }}
                    onChange={(e) => updateProfile(e, "about")}
                    value={user?.about.co_curricular_interests || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Clubs you've worked on"
                    id="clubs"
                    inputProps={{
                        multiline: true,
                    }}
                    formControlProps={{
                        fullWidth: true,
                    }}
                    onChange={(e) => updateProfile(e, "about")}
                    value={user?.about.clubs || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Responsibilities"
                    id="responsibilities"
                    inputProps={{
                        multiline: true,
                    }}
                    formControlProps={{
                        fullWidth: true,
                    }}
                    onChange={(e) => updateProfile(e, "about")}
                    value={user?.about.responsibilities || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Future Plan"
                    id="future_plan"
                    inputProps={{
                        multiline: true,
                    }}
                    formControlProps={{
                        fullWidth: true,
                    }}
                    onChange={(e) => updateProfile(e, "about")}
                    value={user?.about.future_plan || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <RegularButton
                    color="primary"
                    onClick={() => saveProfile("about")}
                >
                    Save
                </RegularButton>
                <RegularButton
                    color="danger"
                    onClick={() => discardProfile("about")}
                >
                    Discard
                </RegularButton>
            </GridItem>
        </GridContainer>
    );

    let myViews = (
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Facilities you liked the most here"
                    id="facilities_liked"
                    inputProps={{
                        multiline: true,
                    }}
                    formControlProps={{
                        fullWidth: true,
                    }}
                    onChange={(e) => updateProfile(e, "views")}
                    value={user?.views.facilities_liked || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                    labelText="Any suggested improvements ?"
                    id="improvements"
                    inputProps={{
                        multiline: true,
                    }}
                    formControlProps={{
                        fullWidth: true,
                    }}
                    onChange={(e) => updateProfile(e, "views")}
                    value={user?.views.improvements || ""}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <RegularButton
                    color="primary"
                    onClick={() => saveProfile("views")}
                >
                    Save
                </RegularButton>
                <RegularButton
                    color="danger"
                    onClick={() => discardProfile("views")}
                >
                    Discard
                </RegularButton>
            </GridItem>
        </GridContainer>
    );

    return (
        <div>
            <GridContainer style={center}>
                <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <ImageUploading
                            value={user?.user.profile_pic}
                            id={"profile_pic"}
                            onChange={onImageUpload}
                            dataURLKey="data_url"
                        >
                            {({ onImageUpload, dragProps }) => (
                                <div>
                                    <CardAvatar profile onClick={onImageUpload}>
                                        <div className={classes.imageContainer}>
                                            <Avatar
                                                {...dragProps}
                                                imgProps={{
                                                    ref: imageRef,
                                                }}
                                                alt={user?.user.name || "Me"}
                                                src={profilePic}
                                                style={{
                                                    width: "130px",
                                                    height: "130px",
                                                }}
                                            />
                                            <div className={classes.iconBottom}>
                                                <PhotoCamera
                                                    fontSize={"small"}
                                                />
                                            </div>
                                        </div>
                                    </CardAvatar>
                                </div>
                            )}
                        </ImageUploading>
                        <CardBody profile>
                            <EditImage
                                onDialogClose={onDialogClose}
                                onDiscard={onDiscard}
                                onSubmit={onImageEdit}
                                image={image}
                                open={dialogOpen}
                            />
                            <h4 className={classes.cardTitle}>
                                {user?.user.name || ""}
                            </h4>
                            <RegularButton
                                round
                                color={"primary"}
                                onClick={saveProfilePic}
                            >
                                Save
                            </RegularButton>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomTabs
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "General Profile",
                                tabContent: generalProfile,
                            },
                            {
                                tabName: "About Me",
                                tabContent: aboutMe,
                            },
                            {
                                tabName: "My Views",
                                tabContent: myViews,
                            },
                        ]}
                    />
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default UserProfile;

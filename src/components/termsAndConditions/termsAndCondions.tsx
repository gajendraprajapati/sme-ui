import React from "react";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from "@material-ui/icons/Done";
import { ListItemButton } from "@mui/material";


export function getConditions() {
    return {
        one: "By ticking, you are confirming that you have understood and are agreeing to the details mentioned:",
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControlLabel-root': {
            marginBottom: theme.spacing(1)
        },
    },
}));

export function TermsAndConditions(props: { setTermsAndConditions: Function }) {
    const conditions = getConditions();

    const [termsAccepted, setTermsAcceptance] = React.useState({
        one: false,
        two: false,
        three: false,
    });

    const handleChange = (event: any) => {
        console.log(event)
        const updatedTermsAcceptance = {
            ...termsAccepted, [event.target.name]: event.target.checked
        }
        setTermsAcceptance(updatedTermsAcceptance);
        props.setTermsAndConditions(conditions, updatedTermsAcceptance);
    };

    const classes = useStyles();

    return (
        <div >
            <div style={{ display: 'flex' }} className={classes.root}>
                <FormControl component="fieldset">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={termsAccepted.one} onChange={(e) => handleChange(e)} name="one" />}
                            label={conditions['one']}
                        />
                    </FormGroup>
                    <TableCell style={{ borderBottom: 'none', padding: '0px 0px 5px 5px' }}>
                        <List>
                            <ListItem >
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <ListItemText className={classes.root} secondary="I confirm that I am the authorized person to upload bank statements on behalf of my company"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <ListItemText secondary="I assure you that uploaded bank statements and provided company information match and are of the same company, if there is a mismatch then my report will not be generated"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <ListItemText secondary="I understand that this is a general report based on the bank statements and Credilinq is not providing a solution or guiding me for my business growth"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <ListItemText secondary="I have read and understand the " ></ListItemText>
                                <ListItem component="a" href="https://smehealthcheck.credilinq.ai/terms-and-conditions" target="_blank">
                                    <ListItemText primary="Terms & Conditions" />
                                </ListItem>
                            </ListItem>
                        </List>
                    </TableCell>
                </FormControl>

            </div>
        </div>
    )
}
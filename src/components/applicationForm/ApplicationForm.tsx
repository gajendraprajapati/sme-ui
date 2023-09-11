import React, { useState } from 'react';
import {
    makeStyles,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    StepButton,
} from '@material-ui/core';
import { Form } from 'reactstrap';
import { Section } from '../common/section';
import { BusinessInformation } from '../businessInformation/businessInformation';
import { ApplicantInformation } from '../ApplicantInformation/applicantInformation';
import { UploadDocument } from '../uploadDocument/uploadDocuments';
import { TermsAndConditions } from '../termsAndConditions/termsAndCondions';
import * as api from "../../services/api.request";
import { StepIcon } from '../stepper/stepIcon';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { applicationPath } from '../../routes/routePath';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(1),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    stepper: {
        "& .MuiStepIcon-active": { color: "red" },
        "& .MuiStepIcon-completed": { color: "green" },
        "& .Mui-disabled .MuiStepIcon-root": { color: "cyan" }
    }
}));

function getSteps() {
    return ['Business Information', 'Applicant Information', 'Upload Documents', 'Terms & Conditions'];
}

export function ApplicationForm() {
    const [businessUEN, setBusinessUEN] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [fullname, setFullname] = useState('');
    const [position, setPosition] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmEmailMatch, setConfirmEmailMatch] = useState(true);
    const [filenames, setFilenames] = useState([] as string[]);
    const [termsAndConditions, setTermsAndConditions] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [success, setSuccess] = useState(false);
    const classes = useStyles();
    const steps = getSteps();

    const handleSteps = () => {
        if (businessUEN && businessName) {
            setActiveStep(1);
        } else {
            setActiveStep(0);
            return;
        }

        if (fullname && position && mobile && email && confirmEmail) {
            setActiveStep(2);
        } else {
            setActiveStep(1);
            return;
        }
    }

    const businessUENChange = (uen: string) => {
        setBusinessUEN(uen);
        handleSteps();
    }

    const businessNameChange = (name: string) => {
        setBusinessName(name);
        handleSteps();
    }

    const fullNameChange = (name: string) => {
        setFullname(name);
        handleSteps();
    }

    const positionChange = (position: string) => {
        setPosition(position);
        handleSteps();
    }

    const mobileChange = (mobile: string) => {
        setMobile(mobile);
        handleSteps();
    }

    const emailChange = (email: string) => {
        setEmail(email);
        handleSteps();
    }

    const confirmEmailChange = (confirmEmail: string) => {
        setConfirmEmail(confirmEmail);
        if (email) {
            if (email === confirmEmail) {
                setConfirmEmailMatch(true)
            } else {
                setConfirmEmailMatch(false)
            }
        }
        handleSteps();
    }

    const onUploadDocument = (files: File[]) => {
        const fileNames = files.map(file => file.name);
        setFilenames(fileNames);
        if (fileNames.length > 0) {
            setActiveStep(3)
        } else {
            setActiveStep(2);
        }
    }

    const onDeleteDocument = (file: File) => {
        const updatedFiles = filenames.filter(filename => filename !== file.name);
        setFilenames(updatedFiles);
        if (updatedFiles.length > 0) {
            setActiveStep(3)
        } else {
            setActiveStep(2);
        }
    }

    const setConditions = (conditions: any, active: any) => {
        setTermsAndConditions({ conditions, active })
        setActiveStep(4)
    }
    const navigate = useNavigate();

    const onSubmit = async (evt: any) => {
        evt.preventDefault();
        const data = { businessUEN, businessName, fullname, position, mobile, email, filenames, termsAndConditions };
        const url = api.getBaseApiUrl() + '/form/submit';
        const response = await api.callAPI(url, 'POST', data);
        if (response.data) {
            navigate(applicationPath.DETAILS)
        }
    }


    const switchComponents = (index: number) => {
        switch (index) {
            case 0:
                return (
                    <BusinessInformation
                        businessUENChange={businessUENChange}
                        businessNameChange={businessNameChange}
                    />
                )
            case 1:
                return (
                    <ApplicantInformation
                        fullnameChange={fullNameChange}
                        positionChange={positionChange}
                        mobileChange={mobileChange}
                        emailChange={emailChange}
                        confirmEmailChange={confirmEmailChange}
                        confirmEmailMatch={confirmEmailMatch}
                    />
                )
            case 2:
                return (
                    <UploadDocument
                        onUploadDocument={onUploadDocument}
                        onDeleteDocument={onDeleteDocument}
                    />
                )
            case 3:
                return (
                    <TermsAndConditions setTermsAndConditions={setConditions} />
                )
            default:
                return 'Unknown step';
        }
    }

    return (
        <div>
            {success && <Alert severity="success">Data saved successfully</Alert>}

            <Form>
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                        {steps.map((label, index) => (
                            <Step key={label} expanded={true} completed={activeStep > index ? true : false}  >
                                <StepLabel
                                    StepIconComponent={StepIcon}
                                    StepIconProps={{ icon: index + 1 }}
                                >
                                    <Section name={label}></Section>
                                </StepLabel>
                                <StepContent  >
                                    {switchComponents(index)}
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: '10px 0px 10px 87%' }}
                    onClick={(e) => onSubmit(e)}
                >
                    Submit
                </Button>
            </Form >
        </div >
    );
}

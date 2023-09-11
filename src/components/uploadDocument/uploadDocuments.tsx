import React from "react";
import {
    TableHead,
    TableRow,
    TableCell,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import { makeStyles, } from '@material-ui/core/styles';
import { DropzoneArea } from "material-ui-dropzone";
import DoneIcon from "@material-ui/icons/Done";
import * as api from "../../services/api.request";
import { Box } from "@mui/material";


const useStyles = makeStyles(theme => ({
    dropZone: {
        height: '10%',
        fullWidth: 'true',
        paddingTop: '50px',
    },
    dropZoneText: {
        fontSize: '15px !important',
    },
    root: {
        '& .ListItemText-root': {
            fontSize: '3px',
        },
    },


}));

export enum UploadStatus {
    'INPROGRESS' = 'inProgress',
    'SUCCESS' = 'success',
    'FAILED' = 'failed'
}

function getStatusColor(status: UploadStatus) {
    switch (status) {
        case UploadStatus.INPROGRESS:
            return 'default';
        case UploadStatus.SUCCESS:
            return 'primary';
        case UploadStatus.FAILED:
            return 'secondary'
    }
}

export function UploadDocument(props: { onUploadDocument: Function, onDeleteDocument: Function }) {
    const classes = useStyles();
    const [status, setStatus] = React.useState(UploadStatus.INPROGRESS);

    const onUploadDocument = async (files: File[]) => {
        if (!files.length) return;
        const uploadedFile = files[files.length - 1];

        let formData = new FormData();
        formData.append('file', uploadedFile);

        const url = api.getBaseApiUrl() + '/form/upload';
        try {
            const response = await api.callAPI(url, 'POST', formData, {
                'Content-Type': uploadedFile.type
            });
            setStatus(UploadStatus.SUCCESS);
        } catch (err) {
            setStatus(UploadStatus.FAILED);
        }

        props.onUploadDocument(files);
    }

    const onDeleteFile = (file: File) => {
        props.onDeleteDocument(file);

    }

    return (
        <div>
            <TableHead >
                <TableRow>
                    <TableCell style={{ borderBottom: 'none', padding: '0 5px 5px 0' }}>
                        <div style={{ width: '360px', float: 'left' }} >
                            <DropzoneArea
                                onChange={(e) => onUploadDocument(e)}
                                onDelete={(e) => onDeleteFile(e)}
                                showPreviews={true}
                                filesLimit={1}
                                showPreviewsInDropzone={false}
                                dropzoneText={`click to upload or drag and drop bank statements`}
                                dropzoneClass={classes.dropZone}
                                showAlerts={['error']}
                                acceptedFiles={['application/pdf']}
                                dropzoneProps={{}}
                                useChipsForPreview={true}
                                previewChipProps={{ color: getStatusColor(status) }}
                                dropzoneParagraphClass={classes.dropZoneText}
                            />
                        </div>
                    </TableCell>
                    <TableCell style={{ borderBottom: 'none', padding: '0px 0px 5px 5px' }}>
                        <List>
                            <ListItem >
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <ListItemText className={classes.root} secondary="PDFs (not scanned coppies) of company's active operating bank account(s) statements for the past 6 months"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    {/* <DoneIcon /> */}
                                </ListItemIcon>
                                <ListItemText secondary="Example: if today is 2 july 22, then please upload bank statement from Jan 22 to Jun 22(both months inclusive)"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <ListItemText secondary="If Your Company is multi-banked then please upload 6 months bank statements for each bank account"></ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <ListItemText secondary="If your file is password protected, we request you to remove the password and upload the file to avoid submission failure"></ListItemText>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <ListItemText secondary="In case if you are facing any issue while uploading bank statements, Please contact us on support@credilinq.ai"></ListItemText>
                            </ListItem>
                        </List>
                    </TableCell>
                </TableRow>
            </TableHead>
        </div >
    )
}
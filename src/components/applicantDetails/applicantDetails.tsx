import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridApi,
} from "@mui/x-data-grid";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Loader } from "../common/Loader";
import * as api from "../../services/api.request";

export interface ApplicantList {
  businessName: string;
  businessUEN: string
  email: string
  fullname: string
  id: number
  mobile: string
}

export interface ApplicantDetailsProps {
  openLoader: boolean;
  setOpenLoader: Function;
  setNotifier: Function;
}

export const ApplicantDetails = (props: ApplicantDetailsProps) => {
  const { openLoader, setOpenLoader, setNotifier } = props;
  const navigate = useNavigate();
  const [rows, setRows] = useState<ApplicantList[]>([]);
  console.log(rows, "rowe")
  useEffect(() => {
    const url = api.getBaseApiUrl() + '/form/applicant-list';
    const response = api.callAPI(url, 'GET').then((resp) => {
      setRows(resp.data)
    })
  }, []);


  const columns: GridColDef[] = [
    { field: "id", headerName: "Applicant Id", flex: 1, minWidth: 40 },
    { field: "businessName", headerName: "Business Name", flex: 1, minWidth: 40 },
    { field: "businessUEN", headerName: "Business UEN", flex: 1, minWidth: 40 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 40 },
    { field: "fullname", headerName: "Name", flex: 1, minWidth: 40 },
    { field: "mobile", headerName: "Mobile Number", flex: 1, minWidth: 40 },
    { field: "fileName", headerName: "File Name", flex: 1, minWidth: 40 },
    {
      field: "createdDate", headerName: "Created Date", flex: 1, minWidth: 40, sortingOrder: ["asc"], valueFormatter: params =>
        new Date(params?.value)
    }


  ];

  return (
    <>
      <div style={{ minHeight: "auto", width: "100%" }}>
        {
          openLoader ?
            <Loader /> :
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row: ApplicantList) => row.id}
              autoHeight={true}
            />
        }
      </div>
    </>
  );
};

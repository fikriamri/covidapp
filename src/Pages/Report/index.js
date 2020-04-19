import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from "../../Components/Snackbar";
import Menu from "../../Components/Menu";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const columns = [
  { id: 'waktuReport',
    label: 'Waktu Report',
    minWidth: 100,
    align: 'center',
  },
  { id: 'namaPasien',
    label: 'Nama Pasien',
    minWidth: 100,
    align: 'center',
  },
  // { id: 'noHp', label: 'Nomor Handphone', minWidth: 100 },
  {
    id: 'latitude',
    label: 'Latitude',
    minWidth: 100,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'longitude',
    label: 'Longitude',
    minWidth: 100,
    align: 'center',
    // format: (value) => value.toFixed(2),
  },
  {
    id: 'kondisi',
    label: 'Kondisi',
    minWidth: 100,
    align: 'center',
    // format: (value) => value.toLocaleString(),
  },
  {
    id: 'suhu',
    label: 'Suhu',
    minWidth: 100,
    align: 'center',
    // format: (value) => value.toLocaleString(),
  },
  {
    id: 'demam',
    label: 'Demam',
    minWidth: 100,
    align: 'center',
    // format: (value) => value.toLocaleString(),
  },
  {
    id: 'rumahSakit',
    label: 'Rumah Sakit',
    minWidth: 100,
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
];

function createData(waktuReport, namaPasien, latitude, longitude, kondisi, suhu, demam, rumahSakitId) {
  return { waktuReport, namaPasien, latitude, longitude, kondisi, suhu, demam, rumahSakitId };
}

const rows = [
  createData("2020-04-16T17:16:21.358666+07:00", "1111111111", "-7.9693016677787885", "112.6356524673932", "sehat", "36.5", "tidak", 1),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
});

export default function Report() {
  const { loginReducer } = useSelector(state => ({
    loginReducer: state.loginReducer,
  }));
  // console.log(loginReducer)
  const token = loginReducer.token;
  console.log(token)

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [reportData, setReportData] = React.useState([]);
  const [pasienData, setPasienData] = React.useState([]);
  const [rsData, setRsData] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    severity: "success",
    message: ""
  });

  console.log({
    reportData,
    pasienData, 
    rsData
  })

  useEffect( () => {
    // Get Data Report
    axios
    .get(`https://api.warung999.com/report/list`, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMSIsImlzX2FkbWluIjpmYWxzZSwiZXhwIjoxNTg3MjE0NTU5LCJqdGkiOiIxIn0.WHYG6F8CeCyjwDHpXYzRl4ld90V-YmMlnqp5ImO0D4gjsftIptyZUWH_UiZ94uDKxqvCP9pZ5znxKYZRJm5eEw`
        }
    })
    .then(res => {
      setReportData(res.data.data)
    })
    .catch(() => {
      setOpenSnackbar({...openSnackbar, open: true, severity: "error", message: "Terjadi Kesalahan"})
    })

    // Get Data Pasien
    https://api.warung999.com/pasien/list`, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMSIsImlzX2FkbWluIjpmYWxzZSwiZXhwIjoxNTg3MjE0NTU5LCJqdGkiOiIxIn0.WHYG6F8CeCyjwDHpXYzRl4ld90V-YmMlnqp5ImO0D4gjsftIptyZUWH_UiZ94uDKxqvCP9pZ5znxKYZRJm5eEw`
        }
    })
    .then(res => {
      setPasienData(res.data.data)
    })
    .catch(() => {
      setOpenSnackbar({...openSnackbar, open: true, severity: "error", message: "Terjadi Kesalahan"})
    })

  // Get Data Rumah Sakit
  https://api.warung999.com/rumahsakit/list`, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMSIsImlzX2FkbWluIjpmYWxzZSwiZXhwIjoxNTg3MjE0NTU5LCJqdGkiOiIxIn0.WHYG6F8CeCyjwDHpXYzRl4ld90V-YmMlnqp5ImO0D4gjsftIptyZUWH_UiZ94uDKxqvCP9pZ5znxKYZRJm5eEw`
        }
    })
    .then(res => {
      setRsData(res.data.data)
    })
    .catch(() => {
      setOpenSnackbar({...openSnackbar, open: true, severity: "error", message: "Terjadi Kesalahan"})
    })
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar({...openSnackbar, open: false, message: ""});
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <Menu />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.length > 0 ? reportData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    let value;
                    if (column.id === 'waktuReport') {
                      value = row['created_at'];
                    } else if (column.id === 'namaPasien') {
                      if (pasienData.length > 0) {
                        const pasien = pasienData.find(
                          data => data['kode'] === row['kode']
                        );
                        if (pasien) {
                          value = pasien.nama;
                        } else {
                          value = 'Tidak dapat mendapatkan data pasien'
                        }
                      } else {
                        value = 'Tidak dapat mendapatkan data pasien'
                      }
                    } else if (column.id === 'rumahSakit') {
                      if (rsData.length > 0) {
                        const rs = rsData.find(
                          data => data.id === row['rumah_sakit_id']
                        );
                        value = rs.nama;
                      } else {
                        value = 'Tidak dapat mendapatkan data rumah sakit'
                      }
                    } else {
                      value = row[column.id];
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            }) : <TableRow/>}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Snackbar open={openSnackbar.open} severity={openSnackbar.severity} message={openSnackbar.message} handleClose={handleClose}/>
    </Paper>
  );
}

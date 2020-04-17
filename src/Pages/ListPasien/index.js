import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Snackbar from "../../Components/Snackbar"
import { setListRs } from "../../Redux/actions/rs"

const columns = [
  { id: 'nama', label: 'Nama Pasien', minWidth: 170 },
  { id: 'no_hp', label: 'Nomor Handphone', minWidth: 100 },
  {
    id: 'ttl',
    label: 'Tempat Tanggal Lahir',
    minWidth: 170,
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'jk',
    label: 'Jenis Kelamin',
    minWidth: 170,
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'kode',
    label: 'Kode Pasien',
    minWidth: 170,
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'rumah_sakit_id',
    label: 'Rumah Sakit',
    minWidth: 170,
    format: (value) => value.toLocaleString(),
  },
  {
    id: 'admin_id',
    label: 'Admin',
    minWidth: 170,
    // align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(nama, no_hp, ttl, jk, kode, status, rumah_sakit_id, admin_id) {
  return { nama, no_hp, ttl, jk, kode, status, rumah_sakit_id, admin_id};
}

const rows = [
  createData('Dadang', '081xxxxxx', '02/03/1979', 'Laki-laki', '2222222222', "OTG", 1, 1)
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
});

export default function ListPasien() {
  const classes = useStyles();
  const Rslist = useSelector(state => state.rs.data);
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pasienData, setPasienData] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    severity: "success",
    message: ""
  });

  useEffect(() => {
    axios
      .get(`https://api.warung999.com/pasien/list`, {
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
    axios
      .get(`https://api.warung999.com/rumahsakit/list`, {
          headers: {
              Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMSIsImlzX2FkbWluIjpmYWxzZSwiZXhwIjoxNTg3MjE0NTU5LCJqdGkiOiIxIn0.WHYG6F8CeCyjwDHpXYzRl4ld90V-YmMlnqp5ImO0D4gjsftIptyZUWH_UiZ94uDKxqvCP9pZ5znxKYZRJm5eEw`
          }
      })
      .then(res => {
        dispatch(setListRs(res.data.data));
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
      <React.Fragment>
        <Paper className={classes.root}>
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
                {pasienData.length > 0 ? pasienData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {Object.keys(row)
                      .filter(key => key !== 'id')
                      .filter(key => key !== 'created_at')
                      .filter(key => key !== 'updated_at')
                      .filter(key => key !== 'deleted_at')
                      .map((column, index) => {
                        const value = row[column];
                        if (column === 'rumah_sakit_id') {
                            if (Rslist.length > 0) {
                                const rs = Rslist.find(
                                  data => data.id === row[column]
                                );
                                return (
                                  <TableCell key={index} align="left">
                                    {rs.nama}
                                  </TableCell>
                                );
                              } else {
                                return (
                                  <TableCell key={index} align="left">
                                    Tidak dapat mendapatkan data rumah sakit
                                  </TableCell>
                                );
                              }
                        }
                        return (
                        <TableCell key={index} align={column.align}>
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
        </Paper>
        <Snackbar open={openSnackbar.open} severity={openSnackbar.severity} message={openSnackbar.message} handleClose={handleClose}/>
    </React.Fragment>
  );
}

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_Cell, MRT_ColumnDef, MRT_Row, MRT_TableInstance } from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Payment } from '../../types';
import { PaymentsHooks } from './hooks';

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);


const PaymentsView = () => {

  const { data, loading: isLoading, fetchPayments, deletePayment, createPayment,updatePayment } = PaymentsHooks();

  const [tableData, setTableData] = useState<Payment[]>(data);

  useEffect(()=>{
    setTableData([...data])
  }, [data])

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: any }>({});


  const handleCreateNewRow = async (values: Payment) => {
    // tableData.push(values);
    await createPayment(values);
    fetchPayments();
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }: {
    exitEditingMode: () => void;
    row: MRT_Row<Payment>;
    table: MRT_TableInstance<Payment>;
    values: Record<LiteralUnion<string & keyof Payment>, any>;
  }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      console.log(values);

      setTableData([...tableData]);
      
      await updatePayment(values)
      fetchPayments()
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<Payment>) => {
      if (
        !window.confirm(`Are you sure you want to delete ${row.getValue('index')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      await deletePayment(row.getValue('id'));
      fetchPayments();
    },
    [deletePayment, fetchPayments],
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell: MRT_Cell<Payment>) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        // onBlur: (event: any) => {
        //   const isValid =
        //     cell.column.id === 'index'
        //     // validateEmail(event.target.value)
        //   if (!isValid) {
        //     //set validation error for cell if invalid
        //     setValidationErrors({
        //       ...validationErrors,
        //       [cell.id]: `${cell.column.columnDef.header} is required`,
        //     });
        //   } else {
        //     //remove validation error for cell if valid
        //     delete validationErrors[cell.id];
        //     setValidationErrors({
        //       ...validationErrors,
        //     });
        //   }
        // },
      };
    },
    [validationErrors],
  );

  const columns = useMemo<MRT_ColumnDef<Payment>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'index',
        header: 'Index',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'credit_id',
        header: 'Credit ID',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type:'number',
        }),
      },
      {
        accessorKey: 'paid_amount',
        header: 'Paid Amount',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
        {
          accessorKey: 'duedate',
          header: 'Date',
          size: 80,
          muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
            ...getCommonEditTextFieldProps(cell),
            type: 'Date',
          }),
        },
    ],
    [getCommonEditTextFieldProps],
  );

  return (
    <>
      <MaterialReactTable
        state={{ isLoading }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="secondary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Create New Payment
          </Button>
        )}

      />
      <CreateNewPaymentModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};


export interface CreateNewPaymentModalProps {
  open: boolean;
  columns: MRT_ColumnDef<Payment>[],
  onClose: () => void;
  onSubmit: (values: Payment) => void;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewPaymentModal = ({ open, columns, onClose, onSubmit }: CreateNewPaymentModalProps) => {
  const [values, setValues] = useState<Payment>(() =>
    columns.reduce((acc, column) => {
      //@ts-ignore
      acc[column.accessorKey ?? ""] = '';
      return acc;
    }, {} as Payment),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Payment</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                disabled={column.enableEditing === undefined ? false : true}
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Payment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// const validateRequired = (value: string) => !!value;
// const validateEmail = (email: string) =>
//   !!email &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );

export default PaymentsView;

function fetchPayments() {
  throw new Error('Function not implemented.');
}

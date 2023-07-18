import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_Cell, MRT_ColumnDef, MRT_Row, MRT_TableInstance, MaterialReactTableProps } from 'material-react-table';
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
import { Expense } from '../../types';
import { ExpensesHooks } from './hooks';

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);


const ExpensesView = () => {

  const { data, loading: isLoading,fetchExpenses,deleteExpense,createExpense,updateExpense} = ExpensesHooks();

  
  const [tableData, setTableData] = useState<Expense[]>(data);

useEffect(()=>{
  setTableData([...data])
}, [data])


  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: any }>({});

  const handleCreateNewRow = async (values: Expense) => {
    // tableData.push(values);
    await createExpense(values);
    fetchExpenses();
  };

  const handleSaveRowEdits = async ({
    exitEditingMode,
    row,
    values,
  }: {
    exitEditingMode: () => void;
    row: MRT_Row<Expense>;
    table: MRT_TableInstance<Expense>;
    values: Record<LiteralUnion<string & keyof Expense>, any>;
  }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      console.log({values});

      setTableData([...tableData]);
      await updateExpense(values)
      fetchExpenses()
      exitEditingMode(); //required to exit editing mode and close modal
    }
    };
  
  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<Expense>) => {
      if (
        !window.confirm(`Are you sure you want to delete ${row.getValue('id')}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      await deleteExpense(row.getValue('id'));
      fetchExpenses();
    },
    [deleteExpense, fetchExpenses],
  );

  
  const getCommonEditTextFieldProps = useCallback(
    (cell: MRT_Cell<Expense>) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
      };
    },
    [validationErrors],
  );

  const columns = useMemo<MRT_ColumnDef<Expense>[]>(
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
        accessorKey: 'amount',
        header: 'Amount',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'duedate',
        header: 'Date',
        size:100,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type:'Date',
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
            Create New Expense
          </Button>
        )}

      />
      <CreateNewExpenseModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};


export interface CreateNewExpenseModalProps {
  open: boolean;
  columns: MRT_ColumnDef<Expense>[],
  onClose: () => void;
  onSubmit: (values: Expense) => void;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewExpenseModal = ({ open, columns, onClose, onSubmit }: CreateNewExpenseModalProps) => {
  const [values, setValues] = useState<Expense>(() =>
    columns.reduce((acc, column) => {
      //@ts-ignore
      acc[column.accessorKey ?? ""] = '';
      return acc;
    }, {} as Expense),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Expense</DialogTitle>
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
          Create New Expense
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpensesView;
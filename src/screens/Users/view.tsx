import React, { useCallback, useMemo, useState } from 'react';
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
import { User } from '../../types';
import { UsersHooks } from './hooks';

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);


const UsersView = () => {

  const { data: tableData, loading: isLoading, fetchUsers} = UsersHooks();




  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: any }>({});

  // const handleCreateNewRow = async (values: User) => {
  //   // tableData.push(values);
  //   await createUser(values);
  //   fetchUsers();
  // };

  // const handleSaveRowEdits = async ({ exitEditingMode, row, values }: {
  //   exitEditingMode: () => void;
  //   row: MRT_Row<User>;
  //   table: MRT_TableInstance<User>;
  //   values: Record<LiteralUnion<string & keyof User>, any>;
  // }) => {
  //   if (!Object.keys(validationErrors)) {
  //     tableData[row.index] = values;
  //     //send/receive api updates here, then refetch or update local table data for re-render
  //     console.log(values);

  //     fetchUsers();
  //     exitEditingMode(); //required to exit editing mode and close modal
  //   }
  // };

  // const handleCancelRowEdits = () => {
  //   setValidationErrors({});
  // };
  
  const getCommonEditTextFieldProps = useCallback(
    (cell: MRT_Cell<User>) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event: any) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'firstName'
                 validateRequired(event.target.value)
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors],
  );

  const columns = useMemo<MRT_ColumnDef<User>[]>(
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
        accessorKey: 'email',
        header: 'Email',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'firstName',
        header: 'Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'lastName',
        header: 'Surname',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'password',
        header: 'Password',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'string',
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
        // enableEditing
        // onEditingRowSave={handleSaveRowEdits}
        // onEditingRowCancel={handleCancelRowEdits}
        // renderRowActions={({ row, table }) => (
        //   <Box sx={{ display: 'flex', gap: '1rem' }}>
        //     <Tooltip arrow placement="left" title="Edit">
        //       <IconButton onClick={() => table.setEditingRow(row)}>
        //         <Edit />
        //       </IconButton>
        //     </Tooltip>
        //   </Box>
        // )}
        // renderTopToolbarCustomActions={() => (
        //   <Button
        //     color="secondary"
        //     onClick={() => setCreateModalOpen(true)}
        //     variant="contained"
        //   >
        //     Create New Account
        //   </Button>
        // )}

      />
      {/* <CreateNewUserModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        // onSubmit={handleCreateNewRow}
      /> */}
    </>  
   ); 
};


// export interface CreateNewUserModalProps {
//   open: boolean;
//   columns: MRT_ColumnDef<User>[],
//   onClose: () => void;
//   onSubmit: (values: User) => void;
// }

// //example of creating a mui dialog modal for creating new rows
// export const CreateNewUserModal = ({ open, columns, onClose, onSubmit }: CreateNewUserModalProps) => {
//   const [values, setValues] = useState<User>(() =>
//     columns.reduce((acc, column) => {
//       //@ts-ignore
//       acc[column.accessorKey ?? ""] = '';
//       return acc;
//     }, {} as User),
//   );

  // const handleSubmit = () => {
  //   //put your validation logic here
  //   onSubmit(values);
  //   onClose();
  // };

  // return (
  //   <Dialog open={open}>
  //     <DialogTitle textAlign="center">Create New Account</DialogTitle>
  //     <DialogContent>
  //       <form onSubmit={(e) => e.preventDefault()}>
  //         <Stack
  //           sx={{
  //             width: '100%',
  //             minWidth: { xs: '300px', sm: '360px', md: '400px' },
  //             gap: '1.5rem',
  //           }}
  //         >
  //           {columns.map((column) => (
  //             <TextField
  //               key={column.accessorKey}
  //               label={column.header}
  //               name={column.accessorKey}
  //               onChange={(e) =>
  //                 setValues({ ...values, [e.target.name]: e.target.value })
  //               }
  //               disabled={column.enableEditing === undefined ? false : true}
  //             />
  //           ))}
  //         </Stack>
  //       </form>
  //     </DialogContent>
  //     <DialogActions sx={{ p: '1.25rem' }}>
  //       <Button onClick={onClose}>Cancel</Button>
  //       <Button color="secondary" onClick={handleSubmit} variant="contained">
  //         Create New Account
  //       </Button>
  //     </DialogActions>
  //   </Dialog>
  // );
// };

const validateRequired = (value: string) => !!value;
const validateEmail = (email: string) =>
  !!email &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

export default UsersView;
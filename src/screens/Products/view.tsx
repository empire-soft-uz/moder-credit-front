import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable, {
  MRT_Cell,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  MaterialReactTableProps,
} from "material-react-table";
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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Product } from "../../types";
import { ProductsHooks } from "./hooks";

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

const ProductsView = () => {
  const {
    data,
    loading: isLoading,
    fetchProducts,
    deleteProduct,
    createProduct,
    updateProduct
  } = ProductsHooks();

  const [tableData, setTableData] = useState<Product[]>(data);

  useEffect(() => {
    setTableData([...data]);
  }, [data]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: any;
  }>({});

  const handleCreateNewRow = async (values: Product) => {
    // tableData.push(values);
    await createProduct(values);
    fetchProducts();
  };


  const handleSaveRowEdits: MaterialReactTableProps<Product>["onEditingRowSave"] =
    async ({
      exitEditingMode,
      row,
      values,
    }: {
      exitEditingMode: () => void;
      row: MRT_Row<Product>;
      table: MRT_TableInstance<Product>;
      values: Record<LiteralUnion<string & keyof Product>, any >;
    }) => {
      if (!Object.keys(validationErrors).length) {
        tableData[row.index] = values;
        //send/receive api updates here, then refetch or update local table data for re-render

        console.log(values);

        setTableData([...tableData]);
        await updateProduct(values)
        fetchProducts()

        exitEditingMode(); //required to exit editing mode and close modal
      }
    };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row: MRT_Row<Product>) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("name")}`
        )
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      await deleteProduct(row.getValue("id"));
      fetchProducts();
    },
    [deleteProduct, fetchProducts]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell: MRT_Cell<Product>) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event: any) => {
          validateRequired(event.target.value);
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "string",
        }),
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "photoUrl",
        header: "Image",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "imei",
        header: "IMEI",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "string",
        }),
      },
      {
        accessorKey: "iCloudLogin",
        header: "iCloud",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "string",
        }),
      },
      {
        accessorKey: "iCloudPassword",
        header: "Password",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "string",
        }),
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 500,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "string",
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <>
      <MaterialReactTable
        state={{ isLoading }}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
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
          <Box sx={{ display: "flex", gap: "1rem" }}>
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
            Create New Product
          </Button>
        )}
      />
      <CreateNewProductModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

export interface CreateNewProductModalProps {
  open: boolean;
  columns: MRT_ColumnDef<Product>[];
  onClose: () => void;
  onSubmit: (values: Product) => void;
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewProductModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}: CreateNewProductModalProps) => {
  const [values, setValues] = useState<Product>(() =>
    columns.reduce((acc, column) => {
      //@ts-ignore
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {} as Product)
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Product</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
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
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value: string) => !!value;

export default ProductsView;
function fetchUsers() {
  throw new Error("Function not implemented.");
}


"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { deleteCookie } from "cookies-next";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import MuiTableCell from "@mui/material/TableCell";
import MuiTableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { IProduct } from "@/types";
import { RatingProgress } from "./rating-progress";
import ReviewsDialog from "./reviews-dialog";

interface ProductsTableProps {
  products: IProduct[] | undefined;
}

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider} !important`,
}));

const TableRow = styled(MuiTableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function ProductTable({ products }: ProductsTableProps) {
  const rotues = useRouter();
  // State for the clicked product id
  const [clickedProduct, setClickedProduct] = useState<IProduct["id"] | null>(
    null
  );
  // State for clicked product's fetched data
  const [singleProduct, setSingleProduct] = useState<
    IProduct | "loading" | null
  >(null);

  // Column definitions for tanstack/react-table
  const columns: ColumnDef<IProduct>[] = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "title", header: "Title" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "discountPercentage", header: "Discount" },
      {
        accessorKey: "rating",
        header: "Rating",
        // Showing custom rating as a circular progress bar
        cell: ({ row }) => <RatingProgress value={row.getValue("rating")} />,
      },
      { accessorKey: "stock", header: "Stock" },
      {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
          return (
            <Stack spacing={1}>
              {(row.getValue("tags") as string[]).map((tag) => (
                <Chip
                  key={tag}
                  color="primary"
                  label={tag}
                  size="small"
                  sx={{ width: "fit-content" }}
                />
              ))}
            </Stack>
          );
        },
      },
      { accessorKey: "brand", header: "Brand" },
      {
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => (
          <Button
            variant="contained"
            sx={{ whiteSpace: "nowrap" }}
            size="small"
            role="button"
            onClick={() => setClickedProduct(row.getValue("id"))}
          >
            View Reviews
          </Button>
        ),
      },
    ],
    []
  );

  // Create a table instance
  const table = useReactTable({
    columns,
    data: products ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    // Self calling function to get the product details and set it to the state, handling loading, error
    (async () => {
      if (clickedProduct) {
        setSingleProduct("loading");
        const res = await fetch(
          `https://dummyjson.com/products/${clickedProduct}`
        );

        if (!res.ok) {
          // Setting the product to null so it doesn't stay loading
          setSingleProduct(null);
          throw new Error("Failed to fetch product details");
        }

        const data = await res.json();

        setSingleProduct(data);
      }
    })();
  }, [clickedProduct]);

  function handleSignout() {
    deleteCookie("access-token");
    rotues.push("/signin");
  }

  return (
    <>
      <Button variant="outlined" sx={{ mb: 4 }} onClick={handleSignout}>
        Logout
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label="Products table">
          <TableHead role="rowheader">
            {/* Render the table headers. For each header group, render a row with each header */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {/* 
            Render the table body. For each row, render a row with each cell.
            For each cell, render the cell component with the cell's context.
            */}
            {/* If there is not data, show 'no results' */}
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.original.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Reviews Dialog */}
      <ReviewsDialog
        product={singleProduct}
        onClose={() => {
          setSingleProduct(null);
          setClickedProduct(null);
        }}
      />
    </>
  );
}

export default ProductTable;

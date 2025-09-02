import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Box
} from "@mui/material";

interface Column {
  key: string; 
  label: string; 
}

export interface TableRowData {
  id: string | number;
  [key: string]: any; 
}

interface ReusableTableProps {
  columns: Column[];
  data: TableRowData[];
  onDelete?: (id: string | number) => void;
}

export const ReusableTable: React.FC<ReusableTableProps> = ({ columns, data, onDelete }) => {
  const [search, setSearch] = useState("");


  const filteredData = data.filter((row) =>
    columns.some((col) =>
      String(row[col.key]).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <Box>
    
      <Box display="flex" justifyContent="flex-end" p={2}>
        <TextField
          size="small"
          variant="standard"
          placeholder="Search..."
          value={search}
          sx={{backgroundColor: 'white'}}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}>{col.label}</TableCell>
              ))}
              {onDelete && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.key}>{row[col.key]}</TableCell>
                ))}
                {onDelete && (
                  <TableCell>
                    <Button
                      color="error"
                      variant="contained"
                      onClick={() => onDelete(row.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}

            {/* If no results */}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + (onDelete ? 1 : 0)} align="center">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

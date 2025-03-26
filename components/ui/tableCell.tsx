import React, { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = "" }) => (
  <table className={`w-full border-collapse ${className}`}>{children}</table>
);

export const TableHeader: React.FC<TableProps> = ({
  children,
  className = "",
}) => <thead className={`bg-gray-100 ${className}`}>{children}</thead>;

export const TableRow: React.FC<TableProps> = ({
  children,
  className = "",
}) => <tr className={`border-b bg-white ${className}`}>{children}</tr>;

export const TableHead: React.FC<TableProps> = ({
  children,
  className = "",
}) => (
  <th className={`px-4 py-2 text-left font-medium text-gray-700 ${className}`}>
    {children}
  </th>
);

export const TableBody: React.FC<TableProps> = ({
  children,
  className = "",
}) => <tbody className={className}>{children}</tbody>;

export const TableCell: React.FC<TableProps> = ({
  children,
  className = "",
}) => (
  <td
    className={`px-6 py-2 text-gray-900 lg:max-w-64 max-w-96 ${className}`}
    style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
  >
    {children}
  </td>
);

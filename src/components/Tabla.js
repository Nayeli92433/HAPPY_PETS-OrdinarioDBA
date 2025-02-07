import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

export function CustomTable({ data, columns, onEdit, onDelete, searchPlaceholder = 'Buscar...', onRowClick, showActions = true }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const filteredData = data?.filter(item =>
        columns.some(column =>
            item[column.accessor]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container p-3">
            <div className="d-flex justify-content-center mb-3">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={e => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>
            <div className="table-responsive mx-auto">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index}>{column.header}</th>
                            ))}
                            {showActions && <th>Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((item, index) => (
                                <tr key={index} onClick={() => onRowClick && onRowClick(item)}>
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex}>{item[column.accessor]}</td>
                                    ))}
                                    {showActions && (
                                        <td>
                                            {onEdit && (
                                                <button className="btn btn-warning me-2" onClick={() => onEdit(item)}>
                                                    ✏️
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button className="btn btn-danger" onClick={() => onDelete(item.id)}>
                                                    🗑️
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (showActions ? 1 : 0)} className="text-center text-muted">
                                    No hay datos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <Pagination>
                    {[...Array(totalPages).keys()].map(page => (
                        <Pagination.Item
                            key={page + 1}
                            active={page + 1 === currentPage}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </div>
    );
}

import { useState } from "react";

const Pagination = () => {

    const state = {
        page: 1,
        pageSize: 5,
        search: "",
        stateFilter: "",
        sortBy: "id",
        order: 'ASC',
        totalPages: 1,
        total: 0
    };

    return (<>
        <h2>Users</h2>
        <div className="toolbar">
            <input type="text" id="search" placeholder="Search name, email, city..." />
            <select name="stateFilter" id="stateFilter">
                <option value="">All States</option>
            </select>
            <span class='badge'></span>
        </div>
        <div className="card">
            <table id="users-table">
                <thead>
                    <tr>
                    <th data-col="id">ID <span class="arrow">↑</span></th>
                    <th data-col="first_name">First <span class="arrow"></span></th>
                    <th data-col="last_name">Last <span class="arrow"></span></th>
                    <th data-col="email">Email <span class="arrow"></span></th>
                    <th data-col="city">City <span class="arrow"></span></th>
                    <th data-col="state">State <span class="arrow"></span></th>
                    <th>Zip</th>
                    <th>Role</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    <tr><td colspan="8" class="loading">Loading…</td></tr>
                </tbody>
            </table>
        </div>
        {/* Pagination */}
        <div className="pagination">
            <div className="row-select">
                Rows per page:
                <select name="page-size" id="page-size">
                    <option value="5" selected>5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>
            <span className="page-info" id="page-info"></span>
            <span className="page-btns" id="page-btns"></span>
        </div>
    </>)
}
export default Pagination;
import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';

const Cart = () => {
    useEffect(() => {
        $('#myTable').DataTable();
    }, []);

    return (
        <section className="all">
            <section className="table-heading">
                <h1>Reservations</h1>
            </section>
            <section className="table-events">
                <table id="myTable" className="display">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Expires at</th>
                            <th>Verification Code</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td>john.doe@example.com</td>
                            <td>01 Jan 2023</td>
                            <td>31 Dec 2023</td>
                            <td>ABC123</td>
                            <td>100 $</td>
                            <td>2</td>
                            <td>
                                <div className="status-active" style={{ width: '90px' }}>
                                    <span style={{ color: '#2ecc71' }}>Valid<i className="bi bi-clock"></i></span>
                                </div>
                            </td>
                            <td>
                                <a onClick={() => alert('Redeem action')} className="action-btn">Redeem<i className="bi bi-file-earmark-check"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td>Jane Smith</td>
                            <td>jane.smith@example.com</td>
                            <td>15 Feb 2023</td>
                            <td>15 Aug 2023</td>
                            <td>XYZ789</td>
                            <td>50 $</td>
                            <td>1</td>
                            <td>
                                <div className="status-not-active" style={{ width: '90px' }}>
                                    <span style={{ color: '#f10f0f' }}>Redeemed<i className="bi bi-clock"></i></span>
                                </div>
                            </td>
                            <td>
                                <p style={{ textAlign: 'center' }}>Redeemed<i className="bi bi-check"></i></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>
    );
};

export default Cart;
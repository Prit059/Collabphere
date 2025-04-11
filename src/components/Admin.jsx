import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "./Admin.css";

const Admin = () => {
    const [students, setStudents] = useState([]);
    const [pendingCount, setPendingCount] = useState(0);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [totalStudents, setTotalStudents] = useState(0); // Default value

    // Fetch students & counts when component loads
    useEffect(() => {
        fetchStudents();
        fetchCounts();
    }, []);

    // Fetch students list
    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5000/students");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // Fetch counts for pending & accepted students
    const fetchCounts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/student-counts");
            setPendingCount(response.data.pending_students);
            setAcceptedCount(response.data.accepted_students);
            setTotalStudents(response.data.total_students);
        } catch (error) {
            console.error("Error fetching counts:", error);
        }
    };

    // Function to update student status
    const updateStatus = async (id, status) => {
        try {
            const response = await axios.put("http://localhost:5000/update-status", {
                id, status
            });

            if (response.status === 200) {
                alert(`Status updated to: ${status}`);
                fetchStudents(); // Refresh student list
                fetchCounts();   // Refresh counts
            } else {
                alert("Failed to update status.");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status.");
        }
    };

    // Chart Data
    const chartData = [
        { name: "Pending", count: pendingCount },
        { name: "Accepted", count: acceptedCount },
        { name: "Total", count: totalStudents }
    ];

    return (
        <div className="container-fluid">
            <div className="container d-flex">
                <div className="col-lg-9">
                    <h2>Admin Dashboard</h2>

                    {/* Display Counts */}
                    <div className="dashboard">
                        <div className="box">
                            <h3>Pending Students</h3>
                            <p>{pendingCount}</p>
                        </div>
                        <div className="box">
                            <h3>Accepted Students</h3>
                            <p>{acceptedCount}</p>
                        </div>
                        <div className="box">
                            <h3>Total Students</h3>
                            <p>{totalStudents}</p>
                        </div>
                    </div>

                    {/* Pending Requests Table */}
                    <h2>Pending Join Requests</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Student ID</th>
                                <th>Year</th>
                                <th>Semester</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.student_id}</td>
                                    <td>{student.year}</td>
                                    <td>{student.semester}</td>
                                    <td>{student.email}</td>
                                    <td>{student.status}</td>
                                    <td className="acre">
                                        <button className="btn accept" onClick={() => updateStatus(student.id, "accepted")}>
                                            Accept
                                        </button>
                                        <button className="btn reject" onClick={() => updateStatus(student.id, "rejected")}>
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Chart Visualization */}
                    <h2>Student Status Overview</h2>
                    <BarChart width={400} height={300} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#000" />
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default Admin;

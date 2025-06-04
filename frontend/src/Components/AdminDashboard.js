import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    className={`p-6 rounded-2xl shadow-xl text-white ${color} flex items-center gap-6`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-5xl">{icon}</div>
    <div>
      <h3 className="text-sm opacity-90">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    bookCount: 0,
    totalCartQuantity: 0
  });

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const counts = await axios.get('http://localhost:8080/api/dashboard/counts');
        const contactRes = await axios.get('http://localhost:8080/api/contact/all');
        setStats(counts.data);
        setContacts(contactRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="p-10 text-xl text-center">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6 sm:p-10">
       <div className="flex gap-4">
        </div>
      <div className="absolute top-0 right-0 m-10 flex gap-4">
      
            <span className="flex items-center gap-1 " >Welcome, Admin</span>
              <span className="flex items-center gap-3 cursor-pointer hover:text-blue-600" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </span>
              
              </div>
              <br></br>
               <br></br>
                <br></br>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard title="Registered Users" value={stats.userCount} icon="👥" color="bg-blue-500" />
        <StatCard title="Books in Store" value={stats.bookCount} icon="📚" color="bg-green-500" />
        <StatCard title="Books in Carts" value={stats.totalCartQuantity} icon="🛒" color="bg-orange-500" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">📬 Contact Messages</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Subject</th>
                <th className="p-3 border">Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-500">No messages available</td>
                </tr>
              ) : (
                contacts.map((contact, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    <td className="p-3 border">{contact.name}</td>
                    <td className="p-3 border">{contact.email}</td>
                    <td className="p-3 border">{contact.subject}</td>
                    <td className="p-3 border whitespace-pre-line">{contact.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

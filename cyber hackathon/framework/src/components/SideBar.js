import { Link } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaDatabase, FaChartBar, FaNetworkWired, FaFileAlt, FaInfoCircle, FaUsersCog, FaCheckCircle } from "react-icons/fa";
import "./css/SideBar.css";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <nav className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
      <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FaBars />
      </div>
      <ul className="menu-list">
        <li><Link to="/"><FaTachometerAlt /><span className="menu-text"> Dashboard</span></Link></li>
        <li><Link to="/crime-records"><FaDatabase /><span className="menu-text"> Crime Records</span></Link></li>
        <li><Link to="/crime-trends"><FaChartBar /><span className="menu-text"> Crime Trends</span></Link></li>
        <li><Link to="/criminal-network"><FaNetworkWired /><span className="menu-text"> Criminal Network</span></Link></li>
        <li><Link to="/case-reports"><FaFileAlt /><span className="menu-text"> Case Reports</span></Link></li>
        <li><Link to="/user-management"><FaUsersCog /><span className="menu-text"> User Management</span></Link></li>
        <li><Link to="/approval"><FaCheckCircle /><span className="menu-text"> Approval</span></Link></li>
        <li><Link to="/settings"><FaInfoCircle /><span className="menu-text"> AboutUs</span></Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;

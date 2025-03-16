
const Navigation=()=>{
return(
    <nav className="container">
        <div className="logo">
<img className="logo" src="/images/Namma_logo.png" alt="logo"  />
        </div>
        <ul>
      
          <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
     
        <li className="nav-item">
          <a className="nav-link" href="/Graph">Graph</a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/ScheduleRide">ScheduleRide</a>
        </li>
    
        <li className="nav-item">
          <a className="nav-link" href="/DriverPage">ForDrivers</a>
        </li>
 

      
        </ul>
        <button>Login</button>
      </nav>
)
}
export default Navigation;
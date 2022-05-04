import React from "react";
import axios from "axios";
import Sidebar from "react-sidebar";
import "../css/sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class ClassPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: false,
          assignments: []
        };
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      }
    
      onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
      }

      componentDidMount(){
        this.getUsersData()
    } 
    

    getUsersData() {
        axios
            .get("http://localhost:3000/usersassignments/1", { withCredentials: true })
            .then(res => {
                const data = res.data
                console.log(res.data)
                const assignments = data.map(u =>
                  <div class="assignments">
                  <p>{u.id}</p>
                  <p>{u.name}</p>
                  <p>{u.details}</p>
                  </div>
                  )
                    this.setState({
                        assignments
                    })
            })
            .catch((error) => {
              console.log(error)
        })
    }    

  handleLogoutClick(){
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then(response => {
        // this.props.handleLogout();
        this.props.history.push("/");
        window.location.reload(true);
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render(){
    return(
        <div>
         
       <Sidebar
        sidebar={ <ul> <li>Larisa</li> <li>Dani</li> <li>Alin</li> </ul>   }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "white", width: "200px" } }}>  

        <nav class="navbar navbar-expand-lg navbar-light bg-white">
          
          {/* <a  class="navbar-brand" onClick={() => this.onSetSidebarOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </a>  */}
              {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup"> */}
                <div class="navbar-nav test">
                  <div class="test2">
                <a  class="nav-item nav-link round" onClick={() => this.onSetSidebarOpen(true)}>
                  <FontAwesomeIcon icon={faBars} />
                </a> 
                  <a class="nav-item nav-link active" href="#">Classroom<span class="sr-only">(current)</span></a>
                  </div>
                  <div>
                  <a class="nav-item nav-link" href="#">Features</a>
                  </div>
                  <div class="test2">
                  <a class="nav-item nav-link round" href="#"><FontAwesomeIcon icon={faPlus} /></a>
                  <a class="nav-item nav-link" href="#">{this.props.user.name}`s Profile</a>
                  <a class="nav-item nav-link" onClick={() => this.handleLogoutClick()}>Logout</a>
                  </div>
                </div>
              {/* </div> */}
           </nav>
        <div>
            {this.state.assignments}
        </div>
        </Sidebar>    
    </div>
    );
    }
}
export default ClassPage;

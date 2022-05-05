import React, { Component } from "react";
import axios from "axios";
import "../css/sidebarclass.css"
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouseChimney, faUser} from '@fortawesome/free-solid-svg-icons'
function withParams(Component) {return props => <Component{...props} params={useParams()}/>}



export default class ClassSidebar extends Component {
    
    constructor(props){
        super(props)
        this.state = {
          classrooms: []
         
        }
       
    }
    
    componentDidMount(){
        this.getUserClassData()
    } 
    getUserClassData() {
        axios
            .get("http://localhost:3000/usersclassrooms", { withCredentials: true })
            .then(res => {
                const data = res.data
                console.log(data)
                const classrooms = data.map(u => 
                      <div class="card cardmini hov" id="card">
                        <Link  to={`/classpage/${u.id}`}>
                            <div class="card-body">
                                <div class="title"> 
                                    <Link to={`/classpage/${u.id}`}>
                                        <h5 class="card-title"> {u.name}</h5>
                                        <p class="card-text"> {u.details}</p>
                                    </Link>
                              </div>
                                <h6 class="card-subtitle text-muted">{u.name}</h6>
                            </div>
                            </Link>
                      </div>
                    
                  )
                    this.setState({
                      classrooms
                      
                    })
            })
            .catch((error) => {
              console.log(error)
        })
    }    

    render(){
        return(
            <div> 
                <div class="card cardmini pt-4 pb-4 hov">
                        <Link  to={`/dashboard`}>
                            <div class="bod pp"> <FontAwesomeIcon icon={faHouseChimney} /> <p>Classroom</p> </div>
                        </Link>
                </div>
                <div class="underline">
                    <div class="card cardmini pt-4 pb-4 hov">
                        <Link  to={`/profile`}>
                            <div class="bod pp"><FontAwesomeIcon icon={faUser} /><p id="pro">Profile</p> </div> 
                        </Link>
                    </div>
                </div>
                      {/* <hr></hr> */}
                      <h4 id="class"> Classes</h4> 
                {this.state.classrooms.length === 0 && <div class="noclass"> No class could be found... try to create one <button>Create class</button> </div>}
                {this.state.classrooms}
            </div>
        )
    }
}

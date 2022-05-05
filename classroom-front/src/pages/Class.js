import React, { Component } from "react";
import axios from "axios";
import "../css/classes.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersBetweenLines } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from "react-router-dom";
function withParams(Component) {return props => <Component{...props} params={useParams()}/>}


export default class Class extends Component {


    constructor(props){
        super(props)
        this.state = {
          classrooms: []
         
        }
       
    }
    
      componentDidMount(){
        this.getUsersData()
    } 
    

    getUsersData() {
        axios
            .get("http://localhost:3000/usersclassrooms", { withCredentials: true })
            .then(res => {
                const data = res.data
                console.log(data)
                const classrooms = data.map(u => 
                  
                      <div class="card">
                        <Link id="cardhov" to={`/classpage/${u.id}`}>
                            <div class="card-body cbody">
                            <Link class="cardtitledesc" to={`/classpage/${u.id}`}>
                                <h5 class="card-title"> {u.name}</h5>
                                <p class="card-text"> {u.details}</p>
                              </Link>
                                <h6 class="card-subtitle text-muted">{u.name}</h6>
                            </div>
                            <div id="card2">
                                <div class="assigclass"> <a class="iconuser"><FontAwesomeIcon  icon={faUsersBetweenLines} /></a> </div>
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
                {this.state.classrooms.length === 0 && <div class="noclass"> <img src={require('./noclasses.png')}></img> No class could be found... try to create one <button>Create class</button> </div>}
                <div class= "classes">
                    {this.state.classrooms}
                </div>
            </div>
        )
    }
}
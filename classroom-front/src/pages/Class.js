import React, { Component } from "react";
import axios from "axios";
import "../css/classes.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersBetweenLines } from '@fortawesome/free-solid-svg-icons'

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
                  // <div class="classrooms">
                  // <p>{u.id}</p>
                  // <p>{u.name}</p>
                  // <p>{u.details}</p>
                  // </div>
                  
                      <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">{u.name}</h5>
                                <p class="card-text">{u.details}</p>
                                <h6 class="card-subtitle mb-2 text-muted">{u.name}</h6>
                            </div>
                            <div id="card2">
                                <div class="assigclass"> <a><FontAwesomeIcon icon={faUsersBetweenLines} /></a> </div>
                            </div>
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
        <div class= "classes">
            {this.state.classrooms.length === 0 && <div class="noclass"> <img src={require('./noclasses.png')}></img> No class could be found... try to create one <button>Create class</button> </div>}
            {this.state.classrooms}
        </div>
        )
    }
}
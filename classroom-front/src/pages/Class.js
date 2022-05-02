import React, { Component } from "react";
import axios from "axios";

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
                  <div class="classrooms">
                  <p>{u.id}</p>
                  <p>{u.name}</p>
                  <p>{u.details}</p>
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
            {this.state.classrooms}
        </div>
        )
    }
}
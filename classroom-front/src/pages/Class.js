import React, { Component } from "react";
import axios from "axios";
import "../css/classes.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsersBetweenLines, faEdit, faX } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

function withParams(Component) {return props => <Component{...props} params={useParams()}/>}


export default class Class extends Component {


    constructor(props){
        super(props)
        this.state = {
          classrooms: [],
          show : false,
          activeModal: "",
          modalData: "",
          name: "",
          details: ""
        }
       this.handleOpenModal= this.handleOpenModal.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    }
    
      componentDidMount(){
        this.getClassData()
    } 
    
    handleOpenModal(val) {
        this.setState({activeModal: val})
        this.setState({ show: !this.state.show });
      }
      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
      handleSubmit(){
        axios
        .post("http://localhost:3000/createclass",
        {
          classrooms: {
              name: this.state.class_name,
              details: this.state.class_details
          }
        },
        { withCredentials: true })
        .then(response=> {
          this.handleOpenModal()
          window.location.reload(true)
        })
        .catch(error => {
          console.log("Couldn`t create class")
        })
      }
      onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
      }
    editClass(id){
      axios
        .patch(`http://localhost:3000/updateclassroom/${id}`,
        {
          name: this.state.name,
          details: this.state.details
        },
        { withCredentials: true })
          .then(res =>  {
              this.handleOpenModal();
              this.getClassData();
          })
        .catch((error) => {
          console.log(error)
        })
    }
    deleteClass(id){
      axios
      .delete(`http://localhost:3000/delete/${id}`, { withCredentials: true })
      .then(res=>{
          this.getClassData();
      })
      .catch((error) => {
        console.log(error)
      })
    }
    getClassData() {
        axios
            .get("http://localhost:3000/usersclassrooms", { withCredentials: true })
            .then(res => {
                const data = res.data
                console.log(data)
                const classrooms = data.map(u => 
                      <div class="card" id="cardhov">
                        {this.props.user.user_type === "Teacher" && <a class="deletecl" onClick={()=> this.deleteClass(u.id)}><FontAwesomeIcon icon={faX}/></a>} 
                        <Link  to={`/classpage/${u.id}`}>
                            <div class="card-body cbody">
                            <Link class="cardtitledesc" to={`/classpage/${u.id}`}>
                                <h5 class="card-title"> {u.name}</h5>
                                <p class="card-text"> {u.details}</p>
                              </Link>
                                <h6 class="card-subtitle text-muted">{u.name}</h6>
                            </div>
                            <div id="card2"></div>
                            </Link>
                               
                            <div class="assigclass"> <a class="iconuser"><FontAwesomeIcon  icon={faUsersBetweenLines} /></a>
                            {this.props.user.user_type === "Teacher" && <a class="iconuser" onClick={()=> {this.handleOpenModal("edit"); 
                                                              this.setState({modalData: u, name: u.name, details: u.details});}}>
                               <FontAwesomeIcon  icon={faEdit} /> </a>}
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
            <div> 
                {this.state.classrooms.length === 0 && this.props.user.user_type === "Student" && <div class="noclass"> <img src={require('./noclasses.png')}></img> No class could be found... </div>}
                {this.state.classrooms.length === 0 && this.props.user.user_type === "Teacher" && <div class="noclass"> <img src={require('./noclasses.png')}></img> No class could be found... try to create one <button onClick={() =>this.handleOpenModal()}>Create class</button> 
                <Modal size="md" centered show={this.state.show} onHide={() =>this.handleOpenModal()}>
                        <Modal.Header closeButton><Modal.Title>Create a class</Modal.Title></Modal.Header>
                          <Modal.Body>
                            <form onSubmit={this.handleSubmit}>
                              <label>Class name:</label><br></br>
                                <input type="text" onChange={e => this.setState({class_name: e.target.value})} value={this.state.class_name}/><br></br>
                                <label>Class details/description:</label><br></br>
                                <input type="text" onChange={e => this.setState({class_details: e.target.value})} value={this.state.class_details}/>
                             </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <a class="af" onClick={() =>this.handleOpenModal()}>
                              Close
                            </a>
                            <a class="af" onClick={() =>this.handleSubmit()} >
                              Save Changes
                            </a>
                          </Modal.Footer>
                          
                       </Modal></div>}
                <div class= "classes">
                    {this.state.classrooms}
                    <div> 
                    <Modal size="md" centered show={this.state.show && this.state.activeModal === "edit"}  onHide={() =>this.handleOpenModal()}>
                      <Modal.Header closeButton><Modal.Title>Edit a class</Modal.Title></Modal.Header>
                          <Modal.Body>
                            <form onSubmit={this.handleSubmit}>
                                <label>Edit class name:</label><br></br>
                                <input type="text" onChange={e => this.setState({name: e.target.value})} value={this.state.name}/><br></br>
                                <label>Edit class details/description:</label><br></br>
                                <input type="text" onChange={e => this.setState({details: e.target.value})} value={this.state.details}/>
                          </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <a class="af" onClick={() =>this.editClass(this.state.modalData.id)} >
                              Save Changes
                            </a>
                          </Modal.Footer>
                       </Modal>
                     </div>
                </div>
            </div>
        )
    }
}
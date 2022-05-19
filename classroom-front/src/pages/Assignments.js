import React from "react";
import axios from "axios";
import "../css/assignments.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { faClipboardUser } from '@fortawesome/free-solid-svg-icons'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import { withRouter } from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <FontAwesomeIcon class="icon2" icon={faEllipsisVertical} />
      {children}
    </a>
  ));

class Assignments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          assignments: [],
          show: false,
          ModalData: "",
          name: "",
          details:""
        };
      }

      componentDidMount(){
        this.getAssignmentData()
    } 
    
    handleOpenModal() {
        this.setState({ show: !this.state.show });
      }

    handleEdit(id)
    {
        axios
        .patch(`http://localhost:3000/editassignment/${id}`,
        {
            name:this.state.name,
            details:this.state.details
        }, { withCredentials: true })
        .then(res=>{
            this.handleOpenModal();
            this.getAssignmentData();
        })
        .catch((error) => {
            console.log(error)
        })
    }

    deleteAssignment(id)
    {
        axios
        .delete(`http://localhost:3000/deleteassignment/${id}`,{ withCredentials: true })
        .then(res=>{
            this.getAssignmentData();
        })
        .catch((error) => {
            console.log(error)
      })
    }

    getAssignmentData() {
        axios
            .get(`http://localhost:3000/usersassignments/${this.props.match.params.id}`, { withCredentials: true })
            .then(res => {
                const data = res.data
                console.log(res.data)
                const assignments = data.map(u =>                  
                <div class="container">
                    <div class="card3">
                        <div class="card-body row">
                            <div class="col-1 "> 
                                <FontAwesomeIcon class="icon" icon={faClipboardUser} /> 
                            </div>
                            <Link class="col-xl-10 col-lg-10 col-md-10">
                                    <h5>The teacher posted a new assignment: {u.name}</h5>
                                    {/* <h5>TIME</h5> */}
                            </Link>
                            <div class="col-1">
                                <Dropdown drop="end">
                                    <Dropdown.Toggle as={CustomToggle}> </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={()=>{this.handleOpenModal();
                                                                    this.setState({ModalData:u, name:u.name, details:u.details})}} this>Edit assignment</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={()=>this.deleteAssignment(u.id)}>Delete assignment</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div> 
                </div>
                ).reverse();
                    this.setState({
                        assignments
                    })
            })
            .catch((error) => {
              console.log(error)
        })
    }   

    render() {
        return(
            <div> 
                {this.state.assignments.length === 0 && <div class="noclass"> <img src={require('./noassignments.png')}></img><h6> No assignments could be found. </h6></div>}
                <div>
                    {this.state.assignments}
                </div>
                <div> 
                    <Modal size="md" centered show={this.state.show }  onHide={() =>this.handleOpenModal()}>
                      <Modal.Header closeButton><Modal.Title>Edit a class</Modal.Title></Modal.Header>
                          <Modal.Body>
                            <form onSubmit={this.handleSubmit}>
                              <label>Edit class name:</label><br></br>
                                <input type="text" class="modalInput" placeholder="Assignment name" value={this.state.name} onChange={e => this.setState({name: e.target.value})} /><br></br>
                                <label>Edit class details/description:</label><br></br>
                                <span class="textarea input" role="textbox" contenteditable="true" onInput={e => this.setState({details: e.currentTarget.innerText})} value={this.state.details} >{this.state.ModalData.details}</span>
                          </form>
                          </Modal.Body>
                          <Modal.Footer>
                            <a class="af" onClick={() =>this.handleOpenModal()}>
                              Close
                            </a>
                            <a class="af" onClick={() =>this.handleEdit(this.state.ModalData.id)} >
                              Save Changes
                            </a>
                          </Modal.Footer>
                       </Modal>
                    </div>
            </div>
        )
    }
}
export default withRouter(Assignments);
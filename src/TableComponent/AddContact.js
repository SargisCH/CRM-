import React, { Component } from 'react';
//import TableHeader from'./TableHeader.js';
//import TableRow from './TableRow.js';
import '../StyleSheet/Table.css';
class AddContact extends Component{
    constructor(props){
        super(props);
        this.state = {
            addContactBool: false, 
            addContacts:"",
            errorMessage: false,
			errorMessageRender: false,
            emptyField: false,
            emailType: false
        }
        this.changeAddContact = this.changeAddContact.bind(this);
        this.addNewContact = this.addNewContact.bind(this);
    }
    changeAddContact(){
        this.setState({addContactBool: !this.state.addContactBool, emptyField: false, emailType:false, errorMessage:false})
    }
    errorMessageclose(){
        if(this.state.errorMessage === false){
            this.setState({addContactBool: !this.state.addContactBool})
        }
    }
    addNewContact(){
        let emailTypeCheck = /\S+@\S+\.\S+/;
        let arrayCheckRefs = [];
        for(let i in this.refs){
            arrayCheckRefs.push(this.refs[i].value)
        }
        if(arrayCheckRefs.every(elem => elem !== "" && emailTypeCheck.test(this.refs.email.value) )){
            let contactsObj = {
                FullName: this.refs.first_name.value + " " +  this.refs.last_name.value,
                CompanyName: this.refs.company_name.value,
                Position: this.refs.position.value,
                Country: this.refs.country.value,
                Email: this.refs.email.value,
            };
            let newData = this.props.data;
		//call('api/contacts','POST', newContactobj).then(response=>{newData.push(response); console.log(response);this.setState({data:newData, successMessage:"New Contacts is added"})})
		fetch('http://crmbetc.azurewebsites.net/api/contacts',{
			method: "POST",
			headers: {'Accept': 'application/json','Content-Type': "application/json"},
    		body : JSON.stringify(contactsObj),
		}).then(res =>{
			if(res.ok){
				return res.json()
			}
			else{
				      return res.json()
        .then(function(res) {
          throw new Error( res.Message);
        });
			}
		}).then(response=>{
                newData.push(response);
			    this.props.getNewContacts(newData);
                //this.setState({errorMessage:false})
                //this.errorMessageclose();
                //this.changeAddContact();
                this.setState({addContactBool: !this.state.addContactBool})
            })
			.catch(error => {this.setState({errorMessage:error.message});this.errorMessageclose()});
            this.setState({emptyField: false, emailType:false})
        } else if(arrayCheckRefs.every(elem => elem !== "" ) && !emailTypeCheck.test(this.refs.email.value) ){
            this.setState({emptyField: ""})
            this.setState({emailType: "Please Enter Correct Email"}) 
        }else{
           this.setState({emptyField: "Empty Field"}) 
           this.setState({emailType: ""}) 
        }
    }
    render(){
        let addView;
        if(this.state.addContactBool === false){
            addView =
                <button className="btn_table" onClick="target" onClick={this.changeAddContact}>Add contact</button>
            } else {
                    addView = 
                    <div className="add_new_contact_form_container">
                        <div  className="add_new_contact_form" action="" >
                            <label htmlFor="first_name"><br/>        
                                <span>First name: </span> <input ref="first_name" id="first_name" type="text" required/>
                            </label>
                            <label htmlFor="last_name"><br/>             
                                <span>Last name:</span> <input ref="last_name" id="last_name" type="text" required/>
                            </label>
                            <label htmlFor="company_name"><br/>                
                                <span>Company name:</span> <input ref="company_name" id="company_name" type="text" required/>
                            </label>
                            <label htmlFor="position"><br/>                
                                <span>Position:</span> <input ref="position" id="position" type="text" required/>
                            </label>
                            <label htmlFor="country"><br/>     
                                <span>Country:</span> <input ref="country" id="country" type="text" required/>
                            </label>
                            <label htmlFor="email"><br/>
                                <span>Email:</span> <input ref="email" id="email" type="email" required/>
                            </label> <br/> 
                            <button   className='btn_table'  onClick={this.addNewContact} id="add_button"  defaultValue="Add">Add</button> 
                            <button onClick={this.changeAddContact}   className='btn_table' id="add_button"> Cancel </button>                          
                            {this.state.errorMessage && <p className="error"> {this.state.errorMessage}</p>}
                            {this.state.emptyField && <p className="error">{this.state.emptyField}</p>}
                            {this.state.emailType && <p className="error">{this.state.emailType}</p>}
                        </div>
                    </div>
            }
            return(
                <div className="add_contact_container">{addView}</div>
            )
    }
}
export default AddContact;
		     	
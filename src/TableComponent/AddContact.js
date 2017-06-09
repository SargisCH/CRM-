import React, { Component } from 'react';
import Loading from "../Loading.js"
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
            emailType: false,
            requestLoad: false
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
        this.setState({requestLoad: true})
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
                this.setState({addContactBool: !this.state.addContactBool, requestLoad:false})
            })
			.catch(error => {this.setState({
                    errorMessage:error.message, 
                    requestLoad:false
                });
                this.errorMessageclose()});
        } else if(arrayCheckRefs.every(elem => elem !== "" ) && !emailTypeCheck.test(this.refs.email.value) ){
            this.setState({
                emptyField: "",
                emailType: "Please Enter Correct Email",
                errorMessage:false, 
                requestLoad:false
            })
        }else{
           this.setState({
                emptyField: "Empty Field",
                emailType: "",
                errorMessage:false,
                requestLoad:false
            }) 
        }
    }
    render(){
        let addView;
        if(this.state.addContactBool === false){
            addView =
                <button className="btn_table"  onClick={this.changeAddContact}>Add New Contact</button>
            } else {
                    addView = 
                    <div className="add_new_contact_form_container block">
                        <div  className="add_new_contact_form" action="" >
                            <div className="add_contact_content">
                                <label htmlFor="first_name">        
                                    <span className="add_contact_value">First name: </span> <input className="add_input" ref="first_name" id="first_name" type="text" required/>
                                </label><br/>
                                <label htmlFor="last_name">             
                                    <span className="add_contact_value">Last name:</span> <input className="add_input" ref="last_name" id="last_name" type="text" required/>
                                </label><br/>
                                <label htmlFor="company_name">              
                                    <span className="add_contact_value">Company name:</span> <input className="add_input" ref="company_name" id="company_name" type="text" required/>
                                </label><br/>  
                                <label htmlFor="position">                
                                    <span className="add_contact_value">Position:</span> <input className="add_input" ref="position" id="position" type="text" required/>
                                </label><br/>
                                <label htmlFor="country">     
                                    <span className="add_contact_value">Country:</span> <input className="add_input" ref="country" id="country" type="text" required/>
                                </label><br/>
                                <label htmlFor="email">
                                    <span className="add_contact_value">Email:</span> <input className="add_input" ref="email" id="email" type="email" required/>
                                </label><br/>
                                <input   className='btn_table add_btn' onClick={this.addNewContact} id="add_submit" type="button" defaultValue="Add"/> 
                                <input type="button" className="add_btn" defaultValue="Cancel" onClick={this.changeAddContact} id="add_cancel"/> 
                            {this.state.errorMessage && <p className="error" id="12345"> {this.state.errorMessage}</p>}
                            {this.state.emptyField && <p className="error" id="1234">{this.state.emptyField}</p>}
                            {this.state.emailType && <p className="error " id="123">{this.state.emailType}</p>}      
                                                {this.state.requestLoad && <div id="loading">
                    console.log("dsadas")
							<Loading/>
                    </div>}            
                            </div>       
                        </div>
                    </div>
            }
            return(
                <div className="add_contact_container">{addView}

                </div>
            )
    }
}
export default AddContact;
		     	
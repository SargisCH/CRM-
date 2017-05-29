import React, { Component } from 'react';
//import TableHeader from'./TableHeader.js';
//import TableRow from './TableRow.js';
import '../StyleSheet/Table.css';
class AddContact extends Component{
    constructor(props){
        super(props);
        this.state = {addContactBool: false, addContacts:""}
        this.changeAddContact = this.changeAddContact.bind(this);
        this.addNewContact = this.addNewContact.bind(this);
    }
    changeAddContact(){
        this.setState({addContactBool: !this.state.addContactBool})
    }
    addNewContact(event){
        event.preventDefault;
        let arrayCheckRefs = [];
        for(let i in this.refs){
            arrayCheckRefs.push(this.refs[i].value)
        }
        if(arrayCheckRefs.every(elem => elem !== "" )){
            let contactsObj = {
                FullName: this.refs.first_name.value + " " +  this.refs.last_name.value,
                CompanyName: this.refs.company_name.value,
                Position: this.refs.position.value,
                Country: this.refs.country.value,
                Email: this.refs.email.value,
            };
            setTimeout(()=>this.setState({addContactBool: !this.state.addContactBool}),100)
            this.props.getNewContacts(contactsObj);    
        }
    }
    render(){
        let addView;
        if(this.state.addContactBool === false){
            addView =
                <button className="btn_table" onClick="target" onClick={this.changeAddContact}>Add contact</button>
            } else {
                addView = <form  className="add_new_contact_form" action="">
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
                        <span>Email:</span> <input ref="email" id="email" type="text" required/>
                    </label> <br/> 
                    <button onClick={this.addNewContact}  className='btn_table' id="add_button"> Add </button>
                    <button onClick={this.changeAddContact}   className='btn_table' id="add_button"> Cancel </button>                          
                </form>
            }
            return(
                <div className="add_contact_container">{addView}</div>
            )
    }
}
export default AddContact;
		     	
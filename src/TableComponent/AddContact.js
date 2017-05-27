import React, { Component } from 'react';
//import TableHeader from'./TableHeader.js';
//import TableRow from './TableRow.js';
import '../StyleSheet/Table.css';
import Ajax from '../Ajax.js';

class AddContact extends Component{
			constructor(props){
				super(props);
				this.state = {addContactBool: false, addContacts:""}
                this.changeAddContact = this.changeAddContact.bind(this);
                this.addNewContact = this.addNewContact.bind(this)
			}
            changeAddContact(){
                this.setState({addContactBool: !this.state.addContactBool})
            }
            addNewContact(event){
                //event.preventDefault;
                let contactsObj = {
                    FullName: this.refs.first_name.value + " " +  this.refs.last_name.value,
                    CompanyName: this.refs.company_name.value,
                    Position: this.refs.position.value,
                    country: this.refs.country.value,
                    email: this.refs.email.value,
                };
                Ajax.postData('http://crmbetc.azurewebsites.net/api/contacts', contactsObj);
                setTimeout(()=>this.setState({addContactBool: !this.state.addContactBool}),500)
            }
            			/*addData(){
				Ajax.postData('http://crmbetc.azurewebsites.net/api/contacts', {
				"FullName": "Zara Muradyan",
				"CompanyName": "Mic Armenia",
				"Position": "Developer",
				"Country": "Armenia",
				"Email": "zara.muradyann@gmail.com"
			} ).then(res => console.log(res))
			console.log(this.state.newContacts)
			}*/
            /*giveNewContacts(){
               
            }*/
			render(){
                let addView;
                if(this.state.addContactBool === false){
                    addView =
                        <button className="btn_table" onClick={this.changeAddContact}>Add contact</button>
			        
                } else {
                       addView = <form className="add_new_contact_form" action="">
                            <label htmlFor="first_name"><br/>        
                                <span>First name: </span> <input ref="first_name" id="first_name" type="text" />
                            </label>
                            <label htmlFor="last_name"><br/>             
                                <span>Last name:</span> <input ref="last_name" id="last_name" type="text" />
                            </label>
                            <label htmlFor="company_name"><br/>                
                                <span>Company name:</span> <input ref="company_name" id="company_name" type="text" />
                            </label>
                            <label htmlFor="position"><br/>                
                                <span>Position:</span> <input ref="position" id="position" type="text" />
                            </label>
                            <label htmlFor="country"><br/>     
                                <span>Country:</span> <input ref="country" id="country" type="text" />
                            </label>
                            <label htmlFor="email"><br/>
                                <span>Email:</span> <input ref="email" id="email" type="text" />
                            </label> <br/> 
                            <button onClick={this.addNewContact}   className='btn_table' id="add_button"> add </button>                          
                        </form>
                }
                return(
                    <div className="add_contact_container">{addView}</div>
                )
				
		}
}
    export default AddContact;
		     	
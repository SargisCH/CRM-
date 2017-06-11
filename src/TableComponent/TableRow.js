import React, { Component } from 'react';
import Loading from '../Loading.js'

class TableRow extends Component{
	constructor(props){
		super(props);
		this.state={
				savedData: {},
				savedId: "",
				editMode: false,
				editData:{},
				editRowIndex:"",
				sendArray : this.props.dataArray,
				id:[],
				checkBoxes:[],
				emptyField: false,
            	emailType: false,
				errorMessage: false,
                requestLoad: false
		}
		this.checkBoxChange = this.checkBoxChange.bind(this);
		this.changeEditMode =this.changeEditMode.bind(this);
		this.editOnClicks =this.editOnClicks.bind(this);
		this.save = this.save.bind(this);
}
												/*Combine GUID Array*/
		 checkBoxChange(event){ 
			let index = event.target.id;
			let sendArray = this.state.sendArray;
			this.state.checkBoxes.push(event.target);
			if(event.target.checked === true){
				sendArray.push(this.props.dataArray[index].GuID);
				this.setState({sendArray: sendArray})
			}else{
				for(let i in sendArray){
					if(this.props.dataArray[index].GuID === sendArray[i]){
						sendArray.splice(i, 1);
					}
				}
			}
			this.props.getSendData(sendArray);
			this.props.isDisable(sendArray);
			this.props.deleteCheckBoxes(this.state.checkBoxes)
		 }
         resetDelete(){
			 this.setState({sendArray: []})
		 }
		 											/*Edit Save*/
		 save(){
            this.setState({requestLoad: true})
			let data = this.props.dataArray;
			let emailTypeCheck = /\S+@\S+\.\S+/;
        	let arrayCheckRefs = [];
        	for(let i in this.refs){
            	arrayCheckRefs.push(this.refs[i].value)
        	}
			if(arrayCheckRefs.every(elem => elem !== "" && emailTypeCheck.test(this.refs.email_edit.value) )){
				let savedData= {
					FullName: this.refs.first_name_edit.value + " " + this.refs.last_name_edit.value,
					CompanyName: this.refs.company_name_edit.value,
					Position: this.refs.position_edit.value,
					Country: this.refs.country_edit.value,
					Email: this.refs.email_edit.value,
					GuID: this.state.savedGuId

				} ;
			fetch('http://crmbetc.azurewebsites.net/api/contacts',{
				method: "PUT",
				headers: {'Accept': 'application/json','Content-Type': "application/json"},
    			body : JSON.stringify(savedData),
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
				data[this.state.savedId]= response;
				this.props.savedData(data);
				this.setState({editMode: !this.state.editMode, errorMessage:false, requestLoad: false, emptyField: "",emailType: ""});
            })
			.catch(error => {this.setState({errorMessage:error.message, requestLoad: false, emptyField: "", emailType: ""})});
			}else if(arrayCheckRefs.every(elem => elem !== "" ) && !emailTypeCheck.test(this.refs.email_edit.value) ){
				this.setState({
					requestLoad: false,
					emptyField: "", 
					emailType: "Please Enter Correct Email",
					errorMessage:false
				})
        	}else{
				this.setState({requestLoad: false, 
					emptyField: "Empty Field",
					emailType: "",
					errorMessage:false
				}) 
        	}
		}
													/*Edit*/
		 changeEditMode(){
			 this.setState({editMode: !this.state.editMode, errorMessage:false, emailType: "", emptyField: ""});
		 }
		 editOnClicks(event){
			 this.changeEditMode();
			 this.editData(event)
		 }
		 editData(event){
			 let index = event.target.id
			let editableObject = this.props.dataArray[index];
			this.setState({editData: editableObject});
			this.setState({savedId: index })
			this.setState({savedGuId: this.props.dataArray[index].GuID})
		 }
		 editRender(id){
			 if(this.state.editMode){
				 let placeholders = this.state.editData; 
				 let firstName  = placeholders['Full Name'].slice(0, placeholders['Full Name'].indexOf(' '))
				 let lastName = placeholders['Full Name'].slice(placeholders['Full Name'].indexOf(' ')+1, placeholders['Full Name'].length);
				 return (
					 <div className="edit_block block">
						<div className="edit_form_block">
							<div  className="edit_form">
								<label htmlFor="first_name_edit"><br/>        
									<span className="edit_value">First name: </span> <input ref="first_name_edit" className="edit_input" defaultValue={firstName} id="first_name_edit" type="text" required/>
								</label>
								<label htmlFor="last_name_edit"><br/>             
									<span className="edit_value">Last name:</span> <input ref="last_name_edit" className="edit_input"  defaultValue={lastName} id="last_name_edit" type="text" required/>
								</label>
								<label htmlFor="company_name_edit"><br/>                
									<span className="edit_value">Company name:</span> <input ref="company_name_edit" className="edit_input" defaultValue={placeholders['Company Name']} id="company_name_edit" type="text" required/>
								</label>
								<label htmlFor="position_edit"><br/>                
									<span className="edit_value">Position:</span> <input ref="position_edit" className="edit_input" defaultValue={placeholders['Position']} id="position_edit" type="text" required/>
								</label>
								<label htmlFor="country_edit"><br/>     
									<span className="edit_value">Country:</span> <input ref="country_edit" className="edit_input" defaultValue={placeholders['Country']} id="country_edit" type="text" required/>
								</label>
								<label htmlFor="email_edit"><br/>
									<span className="edit_value">Email:</span> <input ref="email_edit" className="edit_input" defaultValue={placeholders['Email']} id="email_edit" type="email" required/>
								</label> <br/> 
								<input type="button"  onClick={this.save} defaultValue="Save" className="edit_save edit_btn"/>
								<button onClick={this.changeEditMode} className="edit_btn">Cancel</button>
								{this.state.errorMessage && <p className="error">{this.state.errorMessage}</p>}
								{this.state.emptyField && <p className="error">{this.state.emptyField}</p>}
                            	{this.state.emailType && <p className="error">{this.state.emailType}</p>}
							</div>
						</div>
                        {this.state.requestLoad && <div id="loading"><Loading/></div>}
					 </div>
				 )
			 }else{
				 return <i  id ={id} className="fa fa-edit" aria-hidden="true" onClick={this.editOnClicks}></i>
			 }
		 }
	     render(){
			 let row = false;
			 if(this.props.dataArray.length > 0){
			  const data=this.props.dataArray
		       row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
					 <td><input className="check"  onChange={this.checkBoxChange} type="checkbox"  id={index}/> </td>
			     	<td  key={`${data['Full Name']}Full Name`}>
				     	{data['Full Name']}
			     	</td>
			     	<td key={`${data['Company Name']}Company Name`}>
				     	{data["Company Name"]}
				     </td>
			     	<td key={`${data.Position}position`} >
			     	    {data.Position}
			     	</td>
			     	<td key={`${data.Country}country`}  id ="ids">
			     	    {data.Country}
			     	</td>
					 <td key={`${data.Email}email`} id ="ids">
					 
			     	    {data.Email}
			     	</td>
					<td key="edit" id="edit_td" >
						 {this.editRender(index)}
						   
			     	</td>
		     	</tr>
		     	);
			 }else {
				 row = <tr><td><h1 className="empty_contacts">There Is No Contacts</h1></td></tr>
			 }
		     	return(
					 	<tbody>
						 	{row}
						</tbody>
		     	);
	     }
	}
    export default TableRow;
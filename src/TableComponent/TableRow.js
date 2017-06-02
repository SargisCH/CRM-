import React, { Component } from 'react';

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
				checkBoxes:[]
		}
		this.checkBoxChange = this.checkBoxChange.bind(this)
		this.changeEditMode =this.changeEditMode.bind(this)
		this.editOnClicks =this.editOnClicks.bind(this)
		this.save = this.save.bind(this)
}
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
		 }
		 save(){
			let savedData= {
				FullName: this.refs.first_name_edit.value + " " + this.refs.last_name_edit.value,
				CompanyName: this.refs.company_name_edit.value,
				Position: this.refs.position_edit.value,
				Country: this.refs.country_edit.value,
				Email: this.refs.email_edit.value,
				GuID: this.state.savedGuId

			} ;
			this.props.savedData(savedData, this.state.savedId);
			this.setState({editMode: !this.state.editMode});
		}

		 changeEditMode(){
			 this.setState({editMode: !this.state.editMode});
			 
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
		 editRender(id, event){
			 if(this.state.editMode){
				 let placeholders = this.state.editData; 
				 let firstName  = placeholders['Full Name'].slice(0, placeholders['Full Name'].indexOf(' '))
				 let lastName = placeholders['Full Name'].slice(placeholders['Full Name'].indexOf(' '), placeholders['Full Name'].length);
				 return (
					 <div className="edit_block">
						<div className="edit_form_block">
							{/*<form  className="edit_form" action="">*/}
								<label htmlFor="first_name_edit"><br/>        
									<span>First name: </span> <input ref="first_name_edit" defaultValue={firstName} id="first_name_edit" type="text" required/>
								</label>
								<label htmlFor="last_name_edit"><br/>             
									<span>Last name:</span> <input ref="last_name_edit"  defaultValue={lastName} id="last_name_edit" type="text" required/>
								</label>
								<label htmlFor="company_name_edit"><br/>                
									<span>Company name:</span> <input ref="company_name_edit" defaultValue={placeholders['Company Name']} id="company_name_edit" type="text" required/>
								</label>
								<label htmlFor="position_edit"><br/>                
									<span>Position:</span> <input ref="position_edit" defaultValue={placeholders['Position']} id="position_edit" type="text" required/>
								</label>
								<label htmlFor="country_edit"><br/>     
									<span>Country:</span> <input ref="country_edit" defaultValue={placeholders['Country']} id="country_edit" type="text" required/>
								</label>
								<label htmlFor="email_edit"><br/>
									<span>Email:</span> <input ref="email_edit" defaultValue={placeholders['Email']} id="email_edit" type="text" required/>
								</label> <br/> 
								<button onClick={this.save}>Save</button>
								<button onClick={this.changeEditMode}>Cancel</button>
							{/*</form>*/}
						</div>
					 </div>
				 )
			 }else{
				 return <i  id ={id} className="fa fa-pencil edit" aria-hidden="true" onClick={this.editOnClicks}></i>
			 }
		 }
	     render(){
			  const data=this.props.dataArray
		      const row = data.map((data,index)=>
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
					<td key="edit" id ="ids">
						 {this.editRender(index)}
						   
			     	</td>
		     	</tr>
		     	);
		     	return(
					 	<tbody>
						 	{row}
						</tbody>
		     	);
	     }
	}
    export default TableRow;
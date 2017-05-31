import React, { Component } from 'react';
import EditRow from './EditRow.js';

class TableRow extends Component{
	constructor(props){
		super(props);
		this.state={
				//dataArray:this.props.dataArray,
				savedData: {},
				savedId: "",
				editMode: false,
				editData:{},
				editRowIndex:"",
				sendArray : this.props.dataArray,
				id:[],
		}
		this.checkBoxChange = this.checkBoxChange.bind(this)
		this.changeEditMode =this.changeEditMode.bind(this)
		this.editOnClicks =this.editOnClicks.bind(this)
		this.save = this.save.bind(this)

		//this.edit = this.edit.bind(this)
		//this.passDataPost = this.passDataPost.bind(this);
}
/*	     deleteRow(event){
		    array.splice(event.target.id,1);
		    this.props.update();
	     }
	     editRow(event){
		     this.setState({
		     	editingShow:true,
		     	editRowData:this.props.dataArray[event.target.id],
		     	editRowIndex:event.target.id 
			});

	     }
	     saveEditing(){
	      this.props.update();
	      this.setState({
		    editingShow:false 
		  });

	     }
	     cancel(){
	      this.props.update();
	      this.setState({
		     editingShow:false 
		   });
	     }
		 passDataPost(){
			 this.props.postData(this.props.sendArray);
		 }*/
		//  changeCheck(){
		// 	this.setState({checked:!this.state.checked})
		// }
		 checkBoxChange(event){
			let index = event.target.id;
			let sendArray = this.state.sendArray;
			//let id = this.state.id;
			if(event.target.checked === true){
				sendArray.push(this.props.dataArray[index].GuID);
				this.setState({sendArray: sendArray})
			}else{
				console.log("sada")
				//id.splice(index, 1)
				for(let i in sendArray){
					if(this.props.dataArray[index].GuID === sendArray[i]){
						sendArray.splice(i, 1);
						//this.setState({sendArray:sendArray})
					}
				}
			}
			this.props.getSendData(sendArray);
			this.props.isDisable(sendArray);
			console.log(sendArray)
		 }
		 save(){
			let savedData= {
				'Full Name': this.refs.first_name_edit.value + " " + this.refs.last_name_edit.value,
				'Company Name': this.refs.company_name_edit.value,
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
			 //this.state.arrayData = this.props.dataArray
/*		      if(this.state.editingShow){
		          const editingrow = data[this.state.editRowIndex];
		          const editrow=
		     	<tr  id ="editingrow">
			     	<td key={editingrow.Firstname}>
				     	<EditRow update={this.props.update} data={editingrow.Firstname} propName="Firstname" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     
			     	</td>
			     	<td key={editingrow.Lastname}>
				     	<EditRow update={this.props.update} data={editingrow.Lastname} propName="Lastname" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	
				     </td>
			     	<td key={editingrow.Mail}>
			     	    <EditRow update={this.props.update} data={editingrow.Mail} propName="Mail" editingData={this.state.editRowData} show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
			     	    
			     	</td>
			     	<td key={editingrow.Id} id ="ids">
			     	   {editingrow.Id}
			     	</td>
			     	<td colSpan="2"><button onClick={this.saveEditing} className="savebutton" >Save Change</button><button onClick={this.cancel}>Cancel</button></td>
		     	</tr>
		     	 const row = data.map((data,index)=>
		     	
		     	<tr key={index} ref={index}>
			     	<td key={data.Firstname}>
				     	{data.Firstname}
			     	</td>
			     	<td key={data.Lastname}>
				     	{data.Lastname}
				     </td>
			     	<td key={data.Mail}>
			     	    {data.Mail}
			     	</td>
			     	<td key={data.Id} id ="ids">
			     	    {data.Id}
			     	</td>
			     	<td colSpan="2"><button className ="deletebutton" onClick={this.deleteRow}  id={index}>Delete</button><button id ={index} onClick={this.editRow}>Edit</button></td>
		     	</tr>
		     	);

		     	
		     	return(
		     		<tbody>
					 
		     			{editrow}
		     			{row}
		     		</tbody>
		     	);
		      }*/
			  const data=this.props.dataArray
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
					 <td><input className="check" onClick={this.props.isDisable} onChange={this.checkBoxChange} type="checkbox"  id={index}/> </td>
			     	<td  key={data.fullName}>
				     	<EditRow update={this.props.update} data={data.Firstname} propName="Firstname" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	{data['Full Name']}
			     	</td>
			     	<td key={data.companyName}>
				     	<EditRow update={this.props.update} data={data.Lastname} propName="Lastname" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	{data["Company Name"]}
				     </td>
			     	<td key={data.Position}>
			     	    <EditRow update={this.props.update} data={data.Mail} propName="Mail" editingData={this.state.editRowData} show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
			     	    {data.Position}
			     	</td>
			     	<td key={data.Country} id ="ids">
			     	    {data.Country}
			     	</td>
					 <td key={data.Email} id ="ids">
			     	    {data.Email}
			     	</td>
			     	{/*<td colSpan="2"> <button id ={index} onClick={this.editRow} className="editbutton">Edit</button></td>*/}
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
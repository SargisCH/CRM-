import React, { Component } from 'react';
import EditRow from './EditRow.js';
import array from '../array.js';

class TableRow extends Component{
		     constructor(props){
			     super(props);
		     this.state={
		                editingShow:false,
		                editRowData:{},
		      			editRowIndex:""
		     			}
			     this.deleteRow=this.deleteRow.bind(this);
			     this.editRow=this.editRow.bind(this);
			     this.saveEditing=this.saveEditing.bind(this);
				 this.checkBoxChange = this.checkBoxChange.bind(this)
			     this.cancel=this.cancel.bind(this);
				 //this.passDataPost = this.passDataPost.bind(this);

		     }
	     deleteRow(event){
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
		 /*passDataPost(){
			 this.props.postData(this.props.sendArray);
		 }*/
		 checkBoxChange(event){
			let index = event.target.id;
			if(event.target.checked === true){
				this.props.sendArray.push(this.props.dataArray[index].GuID);
			}else{
				for(let i in this.props.sendArray){
					if(this.props.dataArray[index].GuID === this.props.sendArray[i]){
						this.props.sendArray.splice(i, 1);
					}
				}
			}
			this.props.getSendData(this.props.sendArray)
		 }
	     render(){
		     const data=this.props.dataArray
		      if(this.state.editingShow){
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

		      }
			  
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
					 <td><input className="check" onChange={this.checkBoxChange} type="checkbox"  id={index}/> </td>
			     	<td  key={data.FullName}>
				     	<EditRow update={this.props.update} data={data.Firstname} propName="Firstname" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	{data.FullName}
			     	</td>
			     	<td key={data.CompanyName}>
				     	<EditRow update={this.props.update} data={data.Lastname} propName="Lastname" editingData={this.state.editRowData} 
				     	show={this.state.editingShow} indexEdit={this.state.editRowIndex}/>
				     	{data.CompanyName}
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
					 
			     	{/*<td colSpan="2"> <button id ={index} onClick={this.editRow} className="editbutton">Edit</button><button className ="deletebutton" onClick={this.deleteRow}  id={index}>Delete</button></td>*/}
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
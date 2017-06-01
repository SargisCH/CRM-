import React, { Component } from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import AddContact from './AddContact.js';
import '../StyleSheet/Table.css';
//import Ajax from '../Ajax.js';
import call from '../helpers/call.js'
class Table extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: [],
			sendData: [],
			disabled: true,
			namingEmailList: false,
			checkBoxes:[],
			templateData:null,
			template: false,
			templateId:'',
			createMailListMessage:"",
			upload: false
			/*deleteData:""*/
		}
		this.postData = this.postData.bind(this);
		this.getSendData = this.getSendData.bind(this);
		this.deleteContacts = this.deleteContacts.bind(this);
		this.getNewContacts = this.getNewContacts.bind(this);
		this.createEmailList = this.createEmailList.bind(this)
		this.changeNamilngList =this.changeNamilngList.bind(this);
		this.savedData = this.savedData.bind(this);
		this.isDisable = this.isDisable.bind(this);
		this.createTemplates = this.createTemplates.bind(this);
		this.changeTemplateState = this.changeTemplateState.bind(this);
		this.radioChange = this.radioChange.bind(this);
		this.changeUpload =this.changeUpload.bind(this)
	}
	componentDidMount(){
		let self = this;
		call('api/contacts','GET').then(response => {  response.error ? alert(response.message) : self.setState({data: response})});
		call('api/templates','GET')
		.then(response => {  response.error ? alert(response.message) :this.setState({templateData: response})});
	}
	changeNamilngList(){
		this.setState({namingEmailList: !this.state.namingEmailList})
	}
	createEmailList(){
		this.setState({namingEmailList: !this.state.namingEmailList})
		let mailingLists = this.state.sendData;
		let mailingList ={
			EmailListName : this.refs.mailingListName.value,
			contacts: mailingLists
		} 
		call('api/emaillists','POST', mailingList).then(()=>this.setState({createMailListMessage: 'Your Mailing List has been added'}))

	}
	createEmailListRender(){
		if(this.state.namingEmailList){
			return (
				<div className="mailing_list_form">
					<input  ref="mailingListName" type="text"/>
					<button onClick={this.createEmailList}> Create </button>
					<button onClick={this.changeUpload} > Cancel </button>
				</div>

			)
		}else{
			return <button  className="btn_table create_email_list" onClick={this.changeNamilngList} disabled={this.state.disabled}> Create New Mailing List </button>
		}
	}
	changeUpload(){
		this.setState({upload: !this.state.upload})
	}
	uploadFile(url, data){
		
	}
	uploadRender(){
		if(this.state.upload){
			return (
				<div className="upload_form">
					<input  ref="upload_input" type="file"/>
					<button onClick={this.uploadFile}> Upload </button>
					<button onClick={this.changeUpload} > Cancel </button>
				</div>
			)
		}else{
			return <button  className="btn_table upload" onClick={this.changeUpload} > Upload File </button>
		}
	}
	getSendData(sendData, checkBoxes){
		this.setState({sendData :sendData});
		this.setState({checkBoxes: checkBoxes})
	}
	isDisable(sendData){
		if(sendData.length>0){
			this.setState({disabled:false})
		} else {
			this.setState({disabled:true})
		}
	}	
	deleteContacts(sendDeleteData){
		 sendDeleteData = this.state.sendData;
		 let deleteData = this.state.data;
		 for(let i in sendDeleteData){
			 for(let j in deleteData){
				 if(sendDeleteData[i] === deleteData[j].GuID){
					 deleteData.splice(j,1)
				 }
			 }
		 }
		 this.setState({data:deleteData})
		 call('api/contacts','DELETE', sendDeleteData);
		 		let checkBoxes = this.state.checkBoxes;
		for(let i in checkBoxes){
			checkBoxes[i].checked = false
		}
		this.setState({checkBoxes: checkBoxes});
		this.setState({disabled:true});
	}
	savedData(obj, id){
		let savedData = this.state.data;
		call('api/contacts','PUT', obj).then(response=>{savedData[id]=response;this.setState({data: savedData})});
		
	}
	postData(sendData){
		sendData = this.state.sendData;
		console.log(sendData)
		call('api/sendemails?template='+this.state.templateId,'POST', sendData);
		let checkBoxes = this.state.checkBoxes;
		for(let i in checkBoxes){
			checkBoxes[i].checked = false
		}
		this.setState({checkBoxes: checkBoxes})
		this.setState({disabled:true})
		this.changeTemplateState;
	}	
	getNewContacts(newContactobj){
		let self = this;
		let newData = this.state.data;
		call('api/contacts','POST', newContactobj).then(response=>{newData.push(response); this.setState({data:newData})})
	}
	changeTemplateState(){
		this.setState({template: !this.state.template})
	}
	createTemplates(){
		if(this.state.template){
			const templateArr = this.state.templateData;
			let templateNames = [];
			let templateIds = [];
			for(let i of templateArr){
				templateNames.push(i.TemplateName)
				templateIds.push(i.TemplateId)
			}
			for(let j = 0; j < templateNames.length; j++){
				templateNames[j] = templateNames[j].slice(0,-5);
				templateNames[j] = templateNames[j].split(/(?=[A-Z])/).join(" ");

			}
				// console.log(templateNames)
			let templateName = templateNames.map((templateNames,index)=>
				<label key={index}>
					<input type="radio" name="selection" onChange={this.radioChange} id={templateIds[index]} value={templateNames}/>
					{templateNames}<br/>
				</label>	
					)
				//console.log(this.state.templateId);
			return (
				<div className="templateBlock">
					<div className="template">
						<form type="radio" name="selection" className="templateForm">
							{templateName}
						</form>
						<button onClick={this.postData} onClick={this.changeTemplateState}> Send </button>
						<button onClick={this.changeTemplateState}> Cancel </button>
					</div>
				</div>
			)
		}
	}
	radioChange(event){
		const templateArr = this.state.templateData;
		if(event.target.checked === true){
			this.setState({templateId:event.target.id})
		}
		
		//console.log(event.target.checked);
	}
	render(){
		return (<div className="UserTable">
				<table className="table">
				<TableHeader headerdata={this.state.data[0]} className="tableheader"/>
				<TableRow  savedData={this.savedData} isDisable={this.isDisable} getSendData={this.getSendData} deleteData={this.deleteData} sendArray={[]} update={this.updateTable} dataArray={this.state.data}/>
				</table>
				<button  onClick={this.changeTemplateState} className="send_button btn_table"  disabled={this.state.disabled}>Choose template</button>
				{this.createTemplates()}
				<button  className="btn_table delete_button" onClick={this.deleteContacts} disabled={this.state.disabled}> Delete</button>
				{this.createEmailListRender()}
				{this.uploadRender()}
				<AddContact getNewContacts={this.getNewContacts}/>
			</div>
		)
	}
}
export default Table;	     	
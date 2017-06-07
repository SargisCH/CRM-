import React, { Component } from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import AddContact from './AddContact.js';
import Loading from '../Loading.js';
import Success from '../Success.js';
import '../StyleSheet/Table.css';
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
			templateId:"",
			successMessage: false,
			upload: false,
			mailingLists: [],
			mailingListShow: false,
			delete: false,
			mailingListDisabled: true,
			mailingListId:"",
			mailingListName:"",
			file: false,

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
		this.changeUpload =this.changeUpload.bind(this);
		this.changeMailingListShow = this.changeMailingListShow.bind(this);
		this.addToMailingList = this.addToMailingList.bind(this);
		this.deleteCheckBoxes = this.deleteCheckBoxes.bind(this);
		this.createDeletePopUp = this.createDeletePopUp.bind(this);
		this.changeDeleteState = this.changeDeleteState.bind(this);
		this.changeMailingListDisable = this.changeMailingListDisable.bind(this);
		this.changeSuccessMessage = this.changeSuccessMessage.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.addContactsFile = this.addContactsFile.bind(this)

	}
	componentDidMount(){
		let self = this;
		call('api/contacts','GET').then(response => {  response.error ? alert(response.message) : 
				self.setState({data: response})});

		call('api/templates','GET')
		.then(response => {  response.error ? alert(response.message) :this.setState({templateData: response})});
		call('api/emaillists','GET')
		.then(response => {  response.error ? alert(response.message) :this.setState({mailingLists: response})});
	}
	changeMailingListDisable(event){
		this.setState({
			mailingListDisabled:false,
			mailingListId:event.target.id,
			mailingListName: event.target.dataset.name
			
		});
		this.setState({});
	}
	changeNamilngList(){
		this.setState({namingEmailList: !this.state.namingEmailList})
	}
	createEmailList(){
		if(this.refs.mailingListName.value !== ""){
			this.setState({namingEmailList: !this.state.namingEmailList})
			let mailingLists = this.state.sendData;
			let mailingList ={
				EmailListName : this.refs.mailingListName.value,
				contacts: mailingLists
			}
			let mailinglist  =this.state.mailingLists
	
			call('api/emaillists','POST', mailingList).then(res=>{this.setState({successMessage: 'Your Mailing List is created '});
				mailinglist.push(res);
			})
		}	

	}
	createEmailListRender(){
		if(this.state.namingEmailList){
			return (
				<div className="mailing_list_form_container">
					<div className="mailing_list_form">
						<p>Name of mailing list <input  ref="mailingListName" type="text"/></p>
						<button className="btn_table" onClick={this.createEmailList}> Create </button>
						<button className="btn_table" onClick={this.changeNamilngList} > Cancel </button>
					</div>
				</div>

			)
		}else{
			return <button  className="btn_table create_email_list" onClick={this.changeNamilngList} disabled={this.state.disabled}> Create New Mailing List </button>
		}
	}
	changeUpload(){
		this.setState({upload: !this.state.upload})
	}
	addContactsFile(){
		call('api/contacts','GET')
			.then(response => {  response.error ? alert(response.message) : 
				this.setState({data: response})})
	}
	uploadFile(event){
		if(this.refs.upload_input.value !== ""){

		event.preventDefault();
		let data = new FormData();
    	let fileData = document.querySelector('input[type="file"]').files[0];
    	data.append("data", fileData);	
			fetch("http://crmbetc.azurewebsites.net/api/contacts/upload", {
				method: "POST",
				"Content-Type": "multipart/form-data",
				"Accept": "application/json",
				body: data
			}).then(function (res) {
				console.log(res)
				return res.json()
			}).then(res => {this.setState({successMessage: res})})
			this.changeUpload();
			this.setState({file:true})
/*		fetch('http://crmbetc.azurewebsites.net/api/contacts/upload', {
        	method:'POST',
        	body:data   
    	}).then(function(res) {
        	return res.json()
    	}).catch(function(e) {
        	console.log('Error',e);
    	}).then(res => console.log(res,this));*/
		}
}	
	uploadRender(){
		if(this.state.upload){
			return (
				<div className="upload_form_container">
					<div className="upload_form">
						<input  ref="upload_input" type="file"/>
						<button className="btn_table" onClick={this.uploadFile}> Upload </button>
						<button className="btn_table" onClick={this.changeUpload} > Cancel </button>
					</div>
				</div>
			)
		}else{
			return <button  className="btn_table upload" onClick={this.changeUpload} > Upload File </button>
		}
	}
	getSendData(sendData){
		this.setState({sendData :sendData});
	}
	isDisable(sendData){
		if(sendData.length>0){
			this.setState({disabled:false})
		} else {
			this.setState({disabled:true})
		}
	}
	
	deleteCheckBoxes(checkBoxes){
		this.setState({checkBoxes:checkBoxes})
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
		 call('api/contacts','DELETE', sendDeleteData).then(()=>{this.setState({successMessage: "Contacts is deleted"}); console.log("delete")});
		 		let checkBoxes = this.state.checkBoxes;
		for(let i in checkBoxes){
			checkBoxes[i].checked = false
		}
		this.setState({checkBoxes: checkBoxes});
		this.setState({disabled:true});
		this.changeDeleteState();
	}
	createDeletePopUp(){
		if(this.state.delete){
			return(
				<div className="delete_block">
					<div className="delete_popoUp">
						<p>Are you sure?</p>
						<button onClick={this.deleteContacts}>Delete</button>
						<button onClick={this.changeDeleteState}>Cancel</button>
					</div>
				</div>
			)
		}
	}
	changeDeleteState(){
		this.setState({delete:!this.state.delete});
	}
	savedData(obj){
		//let savedData = this.state.data;
		this.setState({data:obj, successMessage: "New Contatcts is saved"})
		//call('api/contacts','PUT', obj).then(response=>{savedData[id]=response;this.setState({data: savedData})});
	}
	postData(sendData){
		sendData = this.state.sendData;
		call('api/sendemails?template='+this.state.templateId,'POST', sendData).then(()=>this.setState({successMessage: "Your Email Sent"}));
		let checkBoxes = this.state.checkBoxes;
/*		for(let i in checkBoxes){
			checkBoxes[i].checked = false
		}*/
/*		this.setState({checkBoxes: checkBoxes})
		this.setState({disabled:true})*/
		this.changeTemplateState();
	}	
	getNewContacts(newContactobj){
/*		let newData = this.state.data;
		//call('api/contacts','POST', newContactobj).then(response=>{newData.push(response); console.log(response);this.setState({data:newData, successMessage:"New Contacts is added"})})
		fetch('http://crmbetc.azurewebsites.net/api/contacts',{
			method: "POST",
			headers: {'Accept': 'application/json','Content-Type': "application/json"},
    		body : JSON.stringify(newContactobj),
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
		}).then(response=>{newData.push(response);
			this.setState({data:newData, successMessage:"New Contacts is added"})})
			.catch(error => {this.setState({errorMessage:error.message, errorMessageRender: true})});*/
			this.setState({data:newContactobj, successMessage:"New Contacts is added"})
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
						<button onClick={this.postData} className="tempSendButton" > Send </button>
						<button onClick={this.changeTemplateState}> Cancel </button>
					</div>
				</div>
			)
		}
	}
	radioChange(event){
		if(event.target.checked === true){
			this.setState({templateId:event.target.id})
		}
		//console.log(event.target.checked);
	}
	changeMailingListShow(){
		this.setState({mailingListShow: !this.state.mailingListShow})
	}
	addToMailingList(){
		let id = this.state.mailingListId;
		call('api/emaillists/update?id=' + id + '&flag=true','PUT', this.state.sendData).then(this.setState({
			successMessage: "Folowing contacts is added to " + this.state.mailingListName}));	
		this.changeMailingListShow();
	}
	addToMailingListRender(){
		if(this.state.mailingListShow){
			if(this.state.mailingLists.length > 0){
				let mailingLists = this.state.mailingLists;
				let choose = mailingLists.map((item,index)=>{
					return <p onClick={this.changeMailingListDisable} data-name={item.EmailListName} key={index} id={item.EmailListID}>{item.EmailListName}</p>
				})
				return (
					<div className="subscribingContainer">
						<div className="subscribingMailigList">
							<div className="mailingLIsts">
								{choose}
							</div>
							<div className="clear"></div>
							<div className="mailingListButtons">
								<button onClick={this.addToMailingList} disabled={this.state.mailingListDisabled}> Add</button>
								<button onClick={this.changeMailingListShow} className="btn_table"> Cancel</button>
							</div>
						</div>
					</div>	
				)
			}else{
				return <p>wait</p>
			}
		}else{
			return <button disabled={this.state.disabled} onClick={this.changeMailingListShow} className="btn_table addToEmailList" >Add to email List</button>
		}
	}
	loading(){
		if(this.state.data.length < 1){
			return(  <div id="loading"> 
			<Loading/>
			</div>
			)
		}
	}
	changeSuccessMessage(message){
		this.setState({successMessage: message})
	}
	render(){
		return (
			
			<div className='TableContainer'>
					{this.loading()}
					<div className="UserTable">
						<table className="table" id="scroll">
						<TableHeader headerdata={this.state.data[0]} className="tableheader"/>
						<TableRow  savedData={this.savedData} isDisable={this.isDisable} getSendData={this.getSendData} 
						deleteCheckBoxes={this.deleteCheckBoxes} deleteData={this.deleteData} sendArray={[]} update={this.updateTable} dataArray={this.state.data}/>
						</table>
					</div> 
					<div className="buttons">
						<button  onClick={this.changeTemplateState} className="send_button btn_table"  
						disabled={this.state.disabled}>Send Email</button>
					</div>
						{this.createTemplates()}
					<div className="buttons">
						<button  id="delete_button" onClick={this.changeDeleteState} 
						disabled={this.state.disabled}> Delete</button>
						{this.createDeletePopUp()}
					</div>
					<div className="buttons">
						{this.createEmailListRender()}
					</div>
					<div className="buttons">
						{this.uploadRender()}
					</div>
					<div className="buttons">
						{this.addToMailingListRender()}
					</div>
					<div className="buttons">
						<AddContact data={this.state.data} getNewContacts={this.getNewContacts}/>
					</div>
					{this.state.successMessage && 
						<Success changeSuccessMessage={this.changeSuccessMessage} addContactsFile={this.addContactsFile} file={this.state.file} message={this.state.successMessage}/>
					}
			</div>	
		)
	}
}
export default Table;	     	
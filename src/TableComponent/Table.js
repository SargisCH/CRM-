import React, { Component } from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import AddContact from './AddContact.js';
import Loading from '../Loading.js'; 
import Success from '../Success.js';
import '../StyleSheet/Table.css';
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
			templateId:false,
			successMessage: false,
			upload: false,
			mailingLists: [],
			mailingListShow: false,
			delete: false,
			mailingListDisabled: true,
			mailingListId:"",
			mailingListName: false,
			templateDisabled:true,
			file: false,
			requestLoad: false,
			errorMessage: "Looks Like there is a problem"

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
		this.changeMailingListShow = this.changeMailingListShow.bind(this);
		this.addToMailingList = this.addToMailingList.bind(this);
		this.deleteCheckBoxes = this.deleteCheckBoxes.bind(this);
		this.createDeletePopUp = this.createDeletePopUp.bind(this);
		this.changeDeleteState = this.changeDeleteState.bind(this);
		this.changeMailingListDisable = this.changeMailingListDisable.bind(this);
		this.changeSuccessMessage = this.changeSuccessMessage.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.changeUpload =this.changeUpload.bind(this);
		this.addContactsFile = this.addContactsFile.bind(this)
	}
	componentDidMount(){
        this.setState({requestLoad:true})
				
			                         	/*Getting Contacts*/
		fetch('http://crmbetc.azurewebsites.net/api/contacts').then(response => {
			if (response.ok ) {
				return response.json();
			}
		}).then(response => {
			this.setState({
				data: response,
				requestLoad: false
			})
		}).catch(error => {
			alert(this.state.errorMessage);
			this.setState({requestLoad: false})
		})
									/*Getting Templates*/
		fetch('http://crmbetc.azurewebsites.net/api/templates').then(response => {
			if (response.ok ) {
				return response.json();
			}
		}).then(response => {
			this.setState({
				templateData: response
			})
		}).catch(error => {
			alert(this.state.errorMessage);
		})
							/*Getting EmailLists*/
		fetch('http://crmbetc.azurewebsites.net/api/emaillists').then(response => {
			if (response.ok ) {
				return response.json();
			}
		}).then(response => {
			this.setState({
				mailingLists: response
			})
		}).catch(error => {
			alert(this.state.errorMessage);
		   })
		}
		                         /*Create Email Lists*/
	changeNamilngList(){
		this.setState({namingEmailList: !this.state.namingEmailList})
	}
	createEmailList(){
		if(this.refs.mailingListName.value !== ""){
		this.setState({
			requestLoad:true,
			namingEmailList: !this.state.namingEmailList
		})
			let mailingLists = this.state.sendData;
			let mailingList ={
				EmailListName : this.refs.mailingListName.value,
				contacts: mailingLists
			}
			let mailinglist  = this.state.mailingLists
			fetch('http://crmbetc.azurewebsites.net/api/emaillists', {method: "POST",
    			headers: {'Accept': 'application/json','Content-Type': "application/json"},
    			body : JSON.stringify(mailingList),
    		}).then(response => {
				if (response.ok ) {
					return response.json();
				}
			}).then(response => {
				this.setState({
					successMessage: 'Mailing List has been created', 
					requestLoad:false
				})
				mailinglist.push(response);
			}).catch(error => {
				alert(this.state.errorMessage);
				this.setState({requestLoad:false})
			})
		}
	}
	createEmailListRender(){
		if(this.state.namingEmailList){
			return (
				<div className="mailing_list_form_container block">
					<div className="mailing_list_form">
						<div className="mailing_list_input">
							<p>Name of mailing list <input  ref="mailingListName" type="text"/></p>
							<div className="mail_list_buttons">
								<button id="btn_create" className="btn_table" onClick={this.createEmailList}> Create </button>
								<button id="mail_btn_cancel" className="btn_table" onClick={this.changeNamilngList} > Cancel </button>
							</div>
						</div>
					</div>
				</div>

			)
		}else{
			return <button  className="btn_table create_email_list" onClick={this.changeNamilngList} > Create Mailing List </button>
		}
	}
														/*Upload*/
	changeUpload(){
		this.setState({upload: !this.state.upload})
	}
	uploadRender(){
		if(this.state.upload){
			return (
				<div className="upload_form_container block">
					<div className="upload_form">
						<div className="upload_container">
							<input  ref="upload_input" type="file" className="upload_input"/>
							<div className="upload_buttons">
								<input type="button" defaultValue="Upload" className="upload_btn" onClick={this.uploadFile}/>  
								<input type="button" defaultValue="Cancel" className="upload_btn" onClick={this.changeUpload}/>
							</div>
						</div>
					</div>
				</div>
			)
		}else{
			return <button  className="btn_table upload" onClick={this.changeUpload} > Upload File </button>
		}
	}
	uploadFile(event){
		if(this.refs.upload_input.value !== "") {
		event.preventDefault();
		let data = new FormData();
    	let fileData = document.querySelector('input[type="file"]').files[0];
    	data.append("data", fileData);	
			this.setState({requestLoad:true})
			fetch("http://crmbetc.azurewebsites.net/api/contacts/upload", {
				method: "POST",
				"Content-Type": "multipart/form-data",
				"Accept": "application/json",
				body: data
			}).then(function (res) {
				if(res.ok){
					return res.json()
				}else{
					return res.json()
					.then(res=>{
						throw new Error(res.Message)
					})
				}
			}).then(res => {this.setState({successMessage: res})})
			.catch(error =>{
				this.setState({successMessage: error.message})
			})
			this.changeUpload();
			this.setState({file:true})
		}
		this.setState({requestLoad:false})
	}		
	addContactsFile(){
		this.setState({requestLoad:true})
		fetch('http://crmbetc.azurewebsites.net/api/contacts').then(response => {
			if (response.ok ) {
				return response.json();
			}
		}).then(response => {
			this.setState({
				data: response,
				requestLoad: false
			})
		}).catch(error => {
			alert(this.state.errorMessage);
			this.setState({requestLoad: false})
		})
	}
														/*Send Email*/
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
	postData(sendData){
		this.setState({requestLoad: true})
		sendData = this.state.sendData;
		this.changeTemplateState();
		 fetch('http://crmbetc.azurewebsites.net/api/sendemails?template='+this.state.templateId,{method: "POST",
    			headers: {'Accept': 'application/json','Content-Type': "application/json"},
    			body : JSON.stringify(sendData)
    	}).then(response => {
			if (response.ok ) {
				this.setState({
					successMessage: "Email has been sent successfully", 
					requestLoad:false
				})
			}
		}).catch(error => {
			alert(this.state.errorMessage);
			this.setState({requestLoad: false})
		})
	}	
													/*Send Email Templates*/
	changeTemplateState(){
		this.setState({template: !this.state.template})
		this.setState({templateDisabled: true});
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
			let templateName = templateNames.map((templateNames,index)=>
					<label key={index}>
						<input type="radio" name="selection" onChange={this.radioChange} id={templateIds[index]} value={templateNames}/>
						<span className="templateSpan">
						{templateNames}<br/>
						</span>
					</label>
					)
			return (
				<div className="templateBlock block">
					<div className="template">
						<p className="popup_p">Choose Template</p>
						<form type="radio" name="selection" className="templateForm">
							{templateName}
						</form>
						<button onClick={this.postData} className="tempSendButton" disabled={this.state.templateDisabled}> Send </button>
						<button onClick={this.changeTemplateState}> Cancel </button>
					</div>
				</div>
			)
		}
	}
	radioChange(event){
		if(event.target.checked === true){
			this.setState({templateId:event.target.id});
			this.setState({templateDisabled:false});
		}
	}
													/*Delete Contacts*/
	deleteCheckBoxes(checkBoxes){
		this.setState({checkBoxes:checkBoxes})
	}
	deleteContacts(sendDeleteData){
		this.setState({requestLoad: true})
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
		 fetch('http://crmbetc.azurewebsites.net/api/contacts', {method: "DELETE",
    			headers: {'Accept': 'application/json','Content-Type': "application/json"},
    			body : JSON.stringify(sendDeleteData),
    	}).then(response => {
			if (response.ok ) {
				return response.json();

			}
		}).then(response => {
			this.setState({
				successMessage: "Contacts is deleted", 
				requestLoad: false
			})
			this.refs.rows.resetDelete();
		}).catch(error => {
			alert(this.state.errorMessage);
			this.setState({requestLoad: false})
		})
		let checkBoxes = this.state.checkBoxes;
		for(let i in checkBoxes){
			checkBoxes[i].checked = false
		}
		this.setState({checkBoxes: checkBoxes });
		this.setState({disabled:true});
		this.changeDeleteState();
	}
	createDeletePopUp(){
		if(this.state.delete){
			return(
				<div className="delete_block block">
					<div className="delete_popoUp">
							<p>Are you want to delete?</p>
							<button onClick={this.deleteContacts} id="popup_delete">Yes</button>
							<button onClick={this.changeDeleteState}>No</button>
					</div>
				</div>
			)
		}
	}
	changeDeleteState(){
		this.setState({delete:!this.state.delete});
	}
												/*Save New Contacts*/
	savedData(obj){
		this.setState({data:obj, successMessage: "New Contatcts is saved"})
	}
	getNewContacts(newContactobj){
		this.setState({data:newContactobj, successMessage:"New Contacts is added"})
	}
													/*Add to mailing List*/
	changeMailingListShow(){
		this.setState({mailingListShow: !this.state.mailingListShow})
	}
	addToMailingList(){
		if(this.state.mailingListName){
			this.setState({requestLoad:true})
			let id = this.state.mailingListId;
			fetch('http://crmbetc.azurewebsites.net/api/emaillists/update?id=' + id + '&flag=true',{method: "PUT",
    			headers: {'Accept': 'application/json','Content-Type': "application/json"},
    			body : JSON.stringify( this.state.sendData),
    	}).then(response => {
			if (response.ok ) {
				return response.json();
			}
		}).then(response => {
			this.setState({
				successMessage: "Folowing contacts is added to " + this.state.mailingListName, 
				mailingListName: false, requestLoad:false
			})
		}).catch(error => {
			alert(this.state.errorMessage);
			this.setState({requestLoad: false})
		})
		this.changeMailingListShow()
		}
	}
	changeMailingListDisable(event){
		this.setState({
			mailingListDisabled:false, 
			mailingListId:event.target.id,
			mailingListName: event.target.dataset.name
			
		});
		this.setState({});
	}
	addToMailingListRender(){
		if(this.state.mailingListShow){
			if(this.state.mailingLists.length > 0){
				let mailingLists = this.state.mailingLists;
				let choose = mailingLists.map((item,index)=>{
				return(
					<label key={index}>
							<input type="radio" name="selection" data-name={item.EmailListName} onChange={this.changeMailingListDisable} id={item.EmailListID}/>
							<span className="templateSpan">
							{item.EmailListName}<br/>
							</span>
					</label>
				)
				
			})
				return (
					<div className="block">
						<div className="subscribingMailigList">
							<div className="existing_mailing_list">
								<div className="mailingLIsts">
									<p className="popup_p">Exicting Mailing Lists</p>
									{choose}
								</div>
								<div className="mailingListButtons">
									<input type="button" defaultValue="Add" onClick={this.addToMailingList} disabled={this.state.mailingListDisabled} className="ex_mailinglist_btn"/>
									<input type="button" defaultValue="Cancel" onClick={this.changeMailingListShow} className="ex_mailinglist_btn"/>
								</div>
							</div>
						</div>
					</div>	
				)
			}else{
				return <p>wait</p>
			}
		}else{
			return <button disabled={this.state.disabled} onClick={this.changeMailingListShow} className="btn_table addToEmailList" >Add to Existing List</button>
		}
	}
												/*Success Message*/
	changeSuccessMessage(message){
		this.setState({successMessage: message})
	}
	render(){
		return (
			<div className='TableContainer'>
					<div className="UserTable">
						<table className="table" id="scroll">
						<TableHeader headerdata={this.state.data[0]} className="tableheader"/>
						<TableRow  ref="rows" savedData={this.savedData} isDisable={this.isDisable} getSendData={this.getSendData} 
						deleteCheckBoxes={this.deleteCheckBoxes} deleteData={this.deleteData} sendArray={[]} update={this.updateTable} dataArray={this.state.data}/>
						</table>
					</div> 
					<div className="buttons">
						<button  onClick={this.changeTemplateState} className="send_button btn_table"  
						disabled={this.state.disabled}>Send Email</button>
					</div>
						{this.createTemplates()}
					<div className="buttons">
						{this.createEmailListRender()}
					</div>
					<div className="buttons">
						{this.addToMailingListRender()}
					</div>
					<div className="buttons">
						<AddContact data={this.state.data} getNewContacts={this.getNewContacts}/>
					</div>
					<div className="buttons">
						{this.uploadRender()}
					</div>
					<div className="buttons">
						<button  id="delete_button" onClick={this.changeDeleteState} 
						disabled={this.state.disabled}>Delete Contact</button>
						{this.createDeletePopUp()}
					</div>
					{this.state.successMessage && 
						<Success changeSuccessMessage={this.changeSuccessMessage} addContactsFile={this.addContactsFile} file={this.state.file} message={this.state.successMessage}/>

					}
					{this.state.requestLoad && <div id="loading">
							<Loading/>
                    </div>}
			</div>	
		)
	}
}
export default Table;	     	
					
					
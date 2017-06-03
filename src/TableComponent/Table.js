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
			upload: false,
			mailingLists: [],
			mailingListShow: false
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
		this.deleteCheckBoxes = this.deleteCheckBoxes.bind(this)

	}
	componentDidMount(){
		let self = this;
		call('api/contacts','GET').then(response => {  response.error ? alert(response.message) : self.setState({data: response})});
		call('api/templates','GET')
		.then(response => {  response.error ? alert(response.message) :this.setState({templateData: response})});
		call('api/emaillists','GET')
		.then(response => {  response.error ? alert(response.message) :this.setState({mailingLists: response}); console.log(response)});
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
	uploadFile(url, data){
		
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
/*		for(let i in checkBoxes){
			checkBoxes[i].checked = false
		}*/
/*		this.setState({checkBoxes: checkBoxes})
		this.setState({disabled:true})*/
		this.changeTemplateState();
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
						<button onClick={this.postData} > Send </button>
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
	changeMailingListShow(){
		this.setState({mailingListShow: !this.state.mailingListShow})
	}
	addToMailingList(event){
		let id = event.target.id;
		call('api/emaillists/update?id=' + id + '&flag=true','PUT', this.state.sendData).then(response=>console.log(response));	
		this.changeMailingListShow();
	}
	addToMailingListRender(){
		if(this.state.mailingListShow){
			if(this.state.mailingLists.length > 0){
				let mailingLists = this.state.mailingLists;
				console.log(mailingLists)
				let choose = mailingLists.map((item,index)=>{
					return <p  onClick={this.addToMailingList} key={index} id={item.EmailListID}>{item.EmailListName}</p>
				})
				return (
					<div className="subscribingContainer">
						<div className="subscribingMailigList">
							{choose}
							<div className="clear"></div>
							<div className="mailingListButtons">
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
	render(){
		return (
			<div className='TableContainer'>
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
						<button  className="btn_table delete_button" onClick={this.deleteContacts} 
						disabled={this.state.disabled}> Delete</button>
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
						<AddContact getNewContacts={this.getNewContacts}/>
					</div>
					<p className="message">{this.state.createMailListMessage}</p>
			</div>
		)
	}
}
export default Table;	     	
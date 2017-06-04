import React, { Component } from 'react';
import '../StyleSheet/MailingLists.css';
import MailingListHeader from './MailingListHeader.js';
//import { EditAddList } from './EditAddList';
import call from '../helpers/call.js';
import Contacts from './Contacts'
class MailingLists extends Component {
    constructor(props){
        super(props);
        this.state = {
            emailLists:[],
            emailListId:"",
            template: false,
            templateId:'',
            templateData:null,
            contacts: null,
            contactsView: false,
            delete: false,
            deleteId: ''
        }
        this.getMailingListId = this.getMailingListId.bind(this);
        this.createTemplates = this.createTemplates.bind(this);
		this.changeTemplateState = this.changeTemplateState.bind(this);
        this.getContacts = this.getContacts.bind(this);
        this.controlContactsView = this.controlContactsView.bind(this)
        this.radioChange = this.radioChange.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.deleteEmailList = this.deleteEmailList.bind(this);
        this.changeContactsState = this.changeContactsState.bind(this);
        this.createDeletePopUp = this.createDeletePopUp.bind(this);
		this.changeDeleteState = this.changeDeleteState.bind(this);
    }
    componentDidMount(){
        call('api/emaillists','GET')
        .then(response => {  response.error ? alert(response.message) : this.setState({emailLists: response})}); 
        call('api/templates','GET')
		.then(response => {  response.error ? alert(response.message) :this.setState({templateData: response})});  
         //call('api/emaillists?id=1','GET').then(response=> this.setState({tableContent: response}))
    }
    getMailingListId(event){
        this.setState({emailListId:event.target.id});
        this.changeTemplateState()
        //console.log("emailListId = "+event.target.id)
    }
    
    
    changeTemplateState(){
		this.setState({template: !this.state.template});
	}
    radioChange(event){
	//const templateArr = this.state.templateData;
	    if(event.target.checked === true){
		    this.setState({templateId:event.target.id})
	    }
        //console.log(this.state.templateId)
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
				//console.log(templateNames)
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
						<button onClick={this.sendEmail}>  Send </button>
                        
						<button onClick={this.changeTemplateState}> Cancel </button>
					</div>
				</div>
			)
		}
	} 
    sendEmail(){
        //console.log(this.state.templateId);
        // console.log(this.state.emailListId);
        call('api/sendemails?template='+ this.state.templateId+'&emaillistId='+this.state.emailListId,'POST');
        this.changeTemplateState();
    }
    deleteEmailList(event){
       let emailLists = this.state.emailLists;
       for(let i in emailLists){
           if(this.state.deleteId == emailLists[i].EmailListID){
                emailLists.splice(i,1);
           }
           this.setState({emailLists:emailLists});
       }
       call('api/emaillists?id='+ this.state.deleteId, 'DELETE');
       this.changeDeleteState(event);
    }
    getContacts(event){
        let index = event.target.id;
         call('api/emailLists?id='+ index ,'GET')
		.then(response => {  response.error ? alert(response.message) : this.setState({contacts: response.Contacts})}); 
        this.setState({contactsView: true}) 
        this.setState({emailListId:index});     
    }
    controlContactsView(contactsView){
        this.setState({contactsView: contactsView})
    }
    changeContactsState(contacts){
        this.setState({contacts:contacts})
        //console.log(this.state.contacts)
    }
    createDeletePopUp(){
		if(this.state.delete){
			return(
				<div className="delete_block">
					<div className="delete_popoUp">
						<p>Are you sure?</p>
						<button onClick={this.deleteEmailList}>Delete</button>
						<button onClick={this.changeDeleteState}>Cancel</button>
					</div>
				</div>
			)
		}
	}
	changeDeleteState(event){
		this.setState({delete:!this.state.delete});
        this.setState({deleteId:event.target.id})

	}
    render(){
        const data = this.state.emailLists;
        //console.log(data);
        const row = data.map((data,index)=>
            <tr key={index} ref={index}>
                <td className="mailingListName" onClick={this.getContacts} id={data["EmailListID"]} key={`${data['EmailListName']}EmailListName`}>
                    {data["EmailListName"]}
                </td>
                <td><button id={data["EmailListID"]}   onClick={this.getMailingListId}>Send Email</button></td>
               
               <td><button onClick={this.changeDeleteState} id={data["EmailListID"]}>Delete</button></td>
            </tr>
               
        );
        return(
            <div className="table_container">
                <table className="mailing_list_table">
                    <MailingListHeader  className="mailing_list_header"></MailingListHeader>
                    <tbody className="tableBody">
                        {row}
                    </tbody>
                </table>
                {this.createDeletePopUp()}
                {this.createTemplates()}
                    {this.state.contacts !== null &&  this.state.contactsView ?
                        <Contacts changeContactsState={this.changeContactsState} emailListId={this.state.emailListId} controlContactsView={this.controlContactsView} contacts={this.state.contacts}/>: ""
                    }
                </div>
        )
    }
}

/*import ChooseMailingList from './ChooseMailingList';
import MailingListTable from './MailingListTable'


class MailingLists extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailLists: [],
            tableContent:null,
            tableContentId:[],
            sendData:[],
            emailListId:''
         };
         this.getEmailListById = this.getEmailListById.bind(this);
         this.getSendData = this.getSendData.bind(this);
         this.deleteContacts = this.deleteContacts.bind(this);
         this.getEmailListId = this.getEmailListId.bind(this);
        // this.savedData = this.savedData.bind(this);
        //this.console = this.console.bind(this)
    }

    componentDidMount(){
        call('api/emaillists','GET').then(response => {  response.error ? alert(response.message) : this.setState({emailLists: response})});   
         call('api/emaillists?id=1','GET').then(response=> this.setState({tableContent: response}))
    }
    getEmailListById(id){
        call('api/emaillists?id=' + id,'GET').then(response=> this.setState({tableContent: response}))
    }
    getEmailListId(id){
        this.setState({emailListId: id})
        
       
    }
    getSendData(sendData){
		this.setState({sendData :sendData});
        console.log("sendData"+sendData);
         
	}
    
   deleteContacts(sendDeleteData){
		 sendDeleteData = this.state.sendData;
		 let deleteData = this.state.data;
         let id = this.state.emailListId;
		 for(let i in sendDeleteData){
			 for(let j in deleteData){
				 if(sendDeleteData[i] === deleteData[j].GuID){
					 deleteData.splice(j,1)
				 }
			 }
		 }
		 call('api/emaillists/update?id='+id+'&flag=false','PUT', sendDeleteData);
		
	}
    render() {
        return (
            <div className="mailing_list_container">
                {this.state.emailLists.length > 0 ? <ChooseMailingList getEmailListId={this.getEmailListId} getEmailListById={this.getEmailListById} emailLists={this.state.emailLists}/>: <p>wait</p> }
                {this.state.tableContent  !== null ? <MailingListTable getSendData={this.getSendData}  tableContent={this.state.tableContent.Contacts} emailLists={this.state.emailLists}/>: <p>waitttttt</p> }
                <button onClick={this.console} className="send_btn btn_mailingList">Send Email</button>
				<button onClick={this.deleteContacts} className="delete_btn btn_mailingList" >Delete</button>
            </div>
        )

        
    }
}
*/
export default MailingLists;

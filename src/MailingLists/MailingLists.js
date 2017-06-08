import React, { Component } from 'react';
import call from '../helpers/call.js';
import ChooseMailingList from './ChooseMailingList';
import MailingListTable from './MailingListTable';
import Loading from '../Loading.js';
import Success from '../Success.js'
class MailingLists extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailLists: [],
            tableContent:null,
            mailingListName: "",
            templateData:[],
            sendData:[],
            emailListId: 0,
            disabled:true,
            successMessage:false,
            checkBoxes: [],
            requestLoad: false
         };
         this.getDefaultEmailLists =this.getDefaultEmailLists.bind(this);
         this.getEmailListById = this.getEmailListById.bind(this);
         this.deleteEmailList = this.deleteEmailList.bind(this);
         this.send = this.send.bind(this);
         this.deleteContacts = this.deleteContacts.bind(this);
         this.getSendData = this.getSendData.bind(this);
         this.changeSuccessMessage = this.changeSuccessMessage.bind(this);
         this.deleteCheckBoxes = this.deleteCheckBoxes.bind(this)
    }

    componentDidMount(){
        call('api/emaillists','GET').then(response => {  response.error ? alert(response.message) :
        this.setState({emailLists: response})});   
        call('api/templates','GET')
		.then(response => {  response.error ? alert(response.message) :this.setState({templateData: response})}); 
    }
    changeSuccessMessage(message){
         this.setState({successMessage: message})
     }
    getDefaultEmailLists(tableContent, mailingListName, emailListId){
        this.setState({tableContent: tableContent, mailingListName:mailingListName,emailListId: emailListId})
    }
    getEmailListById(id){
        this.setState({emailListId: id})
        call('api/emaillists?id=' + id,'GET')
        .then(response=>this.setState({tableContent: response.Contacts, mailingListName: response.EmailListName}))
    }
    deleteEmailList(id,index){
        let updatedEmailLists = this.state.emailLists;
        this.setState({requestLoad:true})
       call('api/emaillists?id='+ id, 'DELETE').then(res=>{updatedEmailLists.splice(index,1); this.setState({
            emailLists: updatedEmailLists,successMessage: "Mailing List is deleted", requestLoad: false
        })})
    }
    deleteCheckBoxes(checkBoxes){
        this.setState({checkBoxes: checkBoxes})
    }
    send(templateId, emailListId){
        this.setState({requestLoad:true})
        call('api/sendemails?template='+ templateId+'&emaillistId='+emailListId,'POST').then(()=>this.setState({successMessage: "Email has been sent successfully", requestLoad:false}));  
    }
    SendEmail(sendData){
		this.setState({sendData :sendData});
	}
    getSendData(sendData){
        if(sendData.length > 0){
            this.setState({disabled: false})
        }else{
            this.setState({disabled: true})
        }
		this.setState({sendData :sendData});
	}
    
   deleteContacts(sendDeleteData){
		 sendDeleteData = this.state.sendData;
		 let deleteData = this.state.tableContent;
         let id = this.state.emailListId;
		 for(let i in sendDeleteData){
			 for(let j in deleteData){
				 if(sendDeleteData[i] === deleteData[j].GuID){
					 deleteData.splice(j,1)
				 }
			 }
		 }
        let checkBoxes = this.state.checkBoxes;
		for(let i in checkBoxes){
			checkBoxes[i].checked = false
		}
        this.setState({requestLoad: true})
		 call('api/emaillists/update?id='+id+'&flag=false','PUT', sendDeleteData).then(res=>{this.setState({
             tableContent: deleteData, successMessage: "Folowing Contacts is deleted", requestLoad:false});this.refs.resetGuids.resetDelete()}); 
             this.setState({disabled:true});
	}
    render() {
        return (
            <div className="mailing_list_container">
                {this.state.emailLists.length > 0 && <ChooseMailingList getDefaultEmailLists={this.getDefaultEmailLists}
                emailLists={this.state.emailLists}  deleteEmailList={this.deleteEmailList} 
                templateData={this.state.templateData} send={this.send} getEmailListById={this.getEmailListById}/> }
                <div className="mailingListTableContainer">
                    {this.state.tableContent  !== null ? <MailingListTable  deleteCheckBoxes={this.deleteCheckBoxes} ref="resetGuids"
                    tableContent={this.state.tableContent} getSendData={this.getSendData} mailingListName={this.state.mailingListName}/>: 
                    <div id="loading"><Loading/></div> }
                    <div className="deleteContactsBlock">
                        <button disabled={this.state.disabled} onClick={this.deleteContacts} className="btn_table"> Delete</button>
                    </div>
                </div>    
                  {this.state.successMessage && <Success changeSuccessMessage={this.changeSuccessMessage} message={this.state.successMessage}/>}
                  {this.state.requestLoad && <div id="loading"> <Loading/> </div>}
            </div>
        )

        
    }
}
export default MailingLists;




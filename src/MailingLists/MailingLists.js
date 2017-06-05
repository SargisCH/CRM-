import React, { Component } from 'react';
import call from '../helpers/call.js';
import ChooseMailingList from './ChooseMailingList';
import MailingListTable from './MailingListTable';
import Loading from '../Loading.js'

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
            disabled:true
         };
         this.getDefaultEmailLists =this.getDefaultEmailLists.bind(this);
         this.getEmailListById = this.getEmailListById.bind(this);
         this.deleteEmailList = this.deleteEmailList.bind(this);
         this.send = this.send.bind(this);
         this.deleteContacts = this.deleteContacts.bind(this);
         this.getSendData = this.getSendData.bind(this)
    }

    componentDidMount(){
        call('api/emaillists','GET').then(response => {  response.error ? alert(response.message) :
        this.setState({emailLists: response})});   
        call('api/templates','GET')
		.then(response => {  response.error ? alert(response.message) :this.setState({templateData: response})}); 
    }
    getDefaultEmailLists(tableContent, mailingListName){
        this.setState({tableContent: tableContent, mailingListName:mailingListName})
    }
    getEmailListById(id){
        this.setState({emailListId: id})
        call('api/emaillists?id=' + id,'GET')
        .then(response=>this.setState({tableContent: response.Contacts, mailingListName: response.EmailListName}))
    }
    deleteEmailList(id,index){
        let updatedEmailLists = this.state.emailLists;
        call('api/emaillists?id='+ id, 'DELETE').then(res=>{updatedEmailLists.splice(index,1); this.setState({
            emailLists: updatedEmailLists
        })})
    }
    send(templateId, emailListId){
        call('api/sendemails?template='+ templateId+'&emaillistId='+emailListId,'POST');
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
         
		 call('api/emaillists/update?id='+id+'&flag=false','PUT', sendDeleteData).then(res=>this.setState({tableContent: deleteData}));
		
	}
    render() {
        return (
            <div className="mailing_list_container">
                {this.state.emailLists.length > 0 && <ChooseMailingList getDefaultEmailLists={this.getDefaultEmailLists}
                emailLists={this.state.emailLists}  deleteEmailList={this.deleteEmailList} 
                templateData={this.state.templateData} send={this.send} getEmailListById={this.getEmailListById}/> }
                <div className="mailingListTableContainer">
                    {this.state.tableContent  !== null ? <MailingListTable  
                    tableContent={this.state.tableContent} getSendData={this.getSendData} mailingListName={this.state.mailingListName}/>: <p>waitttttt</p> }
                    <div className="deleteContactsBlock">
                        <button disabled={this.state.disabled} onClick={this.deleteContacts} className="btn_table"> Delete</button>
                    </div>
                </div>    
            </div>
        )

        
    }
}

export default MailingLists;

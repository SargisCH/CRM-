import React, { Component } from 'react';
/*import call from '../helpers/call.js';*/
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
            requestLoad: false,
            errorMessage: "Looks Like there is a problem"
         };
         this.getEmailListById = this.getEmailListById.bind(this);
         this.deleteEmailList = this.deleteEmailList.bind(this);
         this.send = this.send.bind(this);
         this.deleteContacts = this.deleteContacts.bind(this);
         this.getSendData = this.getSendData.bind(this);
         this.changeSuccessMessage = this.changeSuccessMessage.bind(this);
         this.deleteCheckBoxes = this.deleteCheckBoxes.bind(this)
    }
                                          /*Getting Data*/
    componentDidMount(){
        this.setState({requestLoad: true})
        fetch('http://crmbetc.azurewebsites.net/api/emaillists').then(response => {
			if (response.ok ) {
				return response.json();
			}
		}).then(response => {
			this.setState({
                emailLists: response, 
                requestLoad:false
			})
		}).catch(error => {
			alert(this.state.errorMessage);
			this.setState({requestLoad: false})
		})
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
			this.setState({requestLoad: false})
		})
    }
    changeSuccessMessage(message){
         this.setState({successMessage: message})
     }
                                    /*Get Email List*/
    getEmailListById(id){
        this.setState({emailListId: id})
        fetch('http://crmbetc.azurewebsites.net/api/emaillists?id=' + id).then(response => {
			if (response.ok ) {
				return response.json();
			}
		}).then(response => {
			this.setState({
                tableContent: response.Contacts, 
                mailingListName: response.EmailListName
			})
		}).catch(error => {
			alert(this.state.errorMessage);
			this.setState({requestLoad: false})
		})
    }                               /*Delete Email List*/
    deleteEmailList(id,index){
        let updatedEmailLists = this.state.emailLists;
        this.setState({requestLoad:true})
        fetch('http://crmbetc.azurewebsites.net/api/emaillists?id='+ id, {method: "DELETE",
    			headers: {'Accept': 'application/json','Content-Type': "application/json"},
    	}).then(response => {
			if (response.ok ) {
				updatedEmailLists.splice(index,1); 
                this.setState({
                    emailLists: updatedEmailLists,
                    successMessage: "Mailing List is deleted", 
                    requestLoad: false, 
                    tableContent: null
                })
			}
		}).catch(error => {
			alert(this.state.errorMessage);
			this.setState({requestLoad: false})
		})
    }
    deleteCheckBoxes(checkBoxes){
        this.setState({checkBoxes: checkBoxes})
    }
                                    /*Send Email List mail*/
    send(templateId, emailListId){
        this.setState({requestLoad:true})
        fetch('http://crmbetc.azurewebsites.net/api/sendemails?template='+ templateId+'&emaillistId='+emailListId, {method: "POST",
    			headers: {'Accept': 'application/json','Content-Type': "application/json"}
    		}).then(response => {
				if (response.ok ) {
					this.setState({
                        successMessage: "Email has been sent successfully", 
                        requestLoad:false
				    })
				}
			}).catch(error => {
				alert(this.state.errorMessage);
				this.setState({requestLoad:false})
			})
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
                            /*Delete Contacts*/
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
        fetch('http://crmbetc.azurewebsites.net/api/emaillists/update?id='+id+'&flag=false',{method: "PUT",
    			headers: {'Accept': 'application/json','Content-Type': "application/json"},
    			body : JSON.stringify( sendDeleteData),
    	}).then(response => {
			if (response.ok ) {
				return response.json();
			}
		}).then(response => {
			this.setState({
				tableContent: deleteData, 
                successMessage: "Folowing Contacts is deleted", 
                requestLoad:false,  
                disabled:true  
            })
            this.refs.resetGuids.resetDelete()
		}).catch(error => {
			alert(this.state.errorMessage);
			this.setState({requestLoad: false})
		})
	}
    render() {
        return (
            <div className="mailing_list_container">
                {this.state.emailLists.length > 0 ? <ChooseMailingList 
                emailLists={this.state.emailLists}  deleteEmailList={this.deleteEmailList} 
                templateData={this.state.templateData} send={this.send} getEmailListById={this.getEmailListById}/>: 
                <h1 className="emptyEmailLists">There Is No Email List</h1> }
                <div className="mailingListTableContainer">
                     <MailingListTable  deleteCheckBoxes={this.deleteCheckBoxes} ref="resetGuids"
                    tableContent={this.state.tableContent} getSendData={this.getSendData}
                     mailingListName={this.state.mailingListName}/>
                    {this.state.tableContent !== null &&  <div className="deleteContactsBlock">
                        <button disabled={this.state.disabled} onClick={this.deleteContacts} className="btn_table"> Delete</button>
                    </div>}
                </div>    
                  {this.state.successMessage && <Success changeSuccessMessage={this.changeSuccessMessage} message={this.state.successMessage}/>}
                  {this.state.requestLoad && <div id="loading"> <Loading/> </div>}
            </div>
        )
    }
}
export default MailingLists;




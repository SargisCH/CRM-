import React, { Component } from 'react';
import '../StyleSheet/MailingLists.css';
class ChooseMailingList extends Component {
    constructor(props) {
        super(props);
        this.state={
            deleteConfirm: false,
            deleteId: 0,
            sendView:false, 
            sendId:0,
            templateId: 0,

        }
        this.selectEmailList =this.selectEmailList.bind(this);
        this.changeDeleteConfirm = this.changeDeleteConfirm.bind(this);
        this.deleteEmailList = this.deleteEmailList.bind(this);
        this.send = this.send.bind(this);
        this.changeSendView = this.changeSendView.bind(this);
        this.catchTemplateId = this.catchTemplateId.bind(this)
}

    changeDeleteConfirm(event){
        this.setState({deleteConfirm: !this.state.deleteConfirm, deleteId:event.target.id})
    }
    deleteConfirmRender(){
        if(this.state.deleteConfirm){
        return <div className="deleteConfirmContainer block">
            <div className="deleteConfirm delete_popoUp">
                <p>Are you want to delete </p>
                <button onClick={this.deleteEmailList}>Yes</button>
                <button onClick={this.changeDeleteConfirm}>No</button>
            </div>
        </div>     
        }
    }
    deleteEmailList(){
        let index = this.state.deleteId;
        this.props.deleteEmailList(this.props.emailLists[index].EmailListID, index);
        this.setState({deleteConfirm: !this.state.deleteConfirm, successMessage: "Mailing List is deleted"})
    }
    selectEmailList(event){
        let index = event.target.id;
        let emailListId = this.props.emailLists[index].EmailListID;
        this.props.getEmailListById(emailListId);
     }
     send(){
        let index = this.state.sendId;
        let templateId= this.state.templateId;
        let emailListId = this.props.emailLists[index].EmailListID;
        this.props.send(templateId, emailListId);
        this.setState({sendView: !this.state.sendView,successMessage: "template sent"})
     }
     catchTemplateId(event){
        this.setState({templateId: event.target.id})
     }
     changeSendView(event){
         this.setState({sendView: !this.state.sendView, sendId:event.target.id})
     }
     sendRender(){
         if(this.state.sendView){
            const templateData = this.props.templateData;
			let templateNames = [];
			let templateIds = [];
			for(let i of templateData){
				templateNames.push(i.TemplateName)
				templateIds.push(i.TemplateId)
			}
			for(let j = 0; j < templateNames.length; j++){
				templateNames[j] = templateNames[j].slice(0,-5);
				templateNames[j] = templateNames[j].split(/(?=[A-Z])/).join(" ");
            }
            let templates = templateNames.map((templateNames, index)=>
                <label key={index}> 
                    <input onClick={this.catchTemplateId} name="template" id={templateIds[index]} type="radio" value={templateNames}/>
                    <span className="templateSpan">
					    {templateNames} <br/>
				    </span>
                </label>
            )
            return (
            <div className="templateBlock block">
				<div className="template">
					<p className="popup_p">Choose Template</p>
                      <form type="radio" name="selection" className="templateForm">
							{templates}
                        </form>
                    <button onClick={this.send}>Send</button>
                    <button onClick={this.changeSendView}>Cancel</button>
                </div>
            </div> 
            )
         }   
     }
     render() {
        const options = this.props.emailLists.map((item,index)=>{
            return <tr key={index} className="options">
                <td className="mailingListName"><span id={index} onClick={this.selectEmailList}>{this.props.emailLists[index].EmailListName}</span></td>
                <td className="mail_list_icon"><img alt="send" id={index} onClick={this.changeSendView} aria-hidden="true" className="icon icons8-Sent" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABHklEQVRIS72Wiw3CMAwF2wlgBDaAEcsElA1gA9igbMAIsAFMALnKQYZ+YpK0kSyEVPn8riaiLGY65UycAtDV1c7VcUoooJcAHu6zFuAtN1SDdO+DAJtcwCGQ70+yytXZFYmjTwjkGwMh5d5VlFYrSCc5CZSU5hMD0lr98gS1poC0VlJux7QCYqqN1MLsov/BRrR2fpO/N8NSQVcJA7AwfnlardYrKGWAFvgPaC0JdVIGCB001n3qYhtq4F3U8f4/6vjim1smHEtwEQC6vk6O9X66jqx35Yol6D0pIPRgg+kn+cFy9dCcFOZjTYQempNgUM8YNQRCD+6ZPqgnBsTuk6Axuwk8qBOhx7/cKD2hRPw58YBcATp9rFdQ8gCzgd4KdUp7nM7SmwAAAABJRU5ErkJggg=="/></td>
                <td className="mail_list_icon"><img alt="send" id={index} onClick={this.changeDeleteConfirm} aria-hidden="true" className="icon icons8-Delete" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABH0lEQVRoQ+2Z3Q2CQBCEoQJL0BLsREvQDizFDrQE6cQStAOtQPcMPGnCfHhgwDHhybnd+dnbkFAWI/+VI+dfWMCvE3QCU0tgE4IOLaKO8f82l/CcI6SQb3hnE0EEPHK5JtaRuEmguqEFiM43MMlcCTSVBKCBw8BJAsMwgl26COj7MiNOCDzQXUCcENgCtPlGpiKwE3AC7w54hLSpQChkKgL7EmtBIFMR2Ak4Aa/RlwN+nW65CmixILC3kLeQt5C3kHIL0GJBYG8hxf+Cfbf7ywRuYeRMMxOjrnFiQU51SeAUDVakCcBWgV0DPJu3unBy6NxDCveouYzn0reAVD+J2NcN56ThB2wam2TIjpJPtbqM0Jd88x63gLx+8mqjT+AJZMctMUe7N34AAAAASUVORK5CYII="/></td>
            </tr>
        })
        return (
            <div className="choose_mailing_list">
                <div className="mailLingListSelection">      
                        <table  className="mailingListItemsContainer" name="" id="">
                            <tbody>
                                {options}
                            </tbody>
                        </table>
                </div>
                {this.deleteConfirmRender()}
                {this.sendRender()}
              
            </div>
        )   
    }
}
export default ChooseMailingList;


                

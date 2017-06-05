 import React, { Component } from 'react';
 import '../StyleSheet/MailingLists.css';
 import call from '../helpers/call.js';

 class ChooseMailingList extends Component {
     constructor(props) {
         super(props);
         this.state={
             deleteConfirm: false,
             deleteId: 0,
             sendView:false,
             sendId:0,
             templateId: 0
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
           return <div className="deleteConfirmContainer">
                <div className="deleteConfirm">
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
        this.setState({deleteConfirm: !this.state.deleteConfirm})

    }
     componentDidMount(){
         call('api/emaillists?id=' + this.props.emailLists[0].EmailListID,'GET').then(response => {  response.error ? alert(response.message) :
         this.props.getDefaultEmailLists(response.Contacts, response.EmailListName)});   
     }

     selectEmailList(event){
        let index = event.target.id;
        console.log(index)
        let emailListId = this.props.emailLists[index].EmailListID;
        this.props.getEmailListById(emailListId);
     }
     send(){
        let index = this.state.sendId;
        let templateId= this.state.templateId;
        let emailListId = this.props.emailLists[index].EmailListID;
       this.props.send(templateId, emailListId);
        this.setState({sendView: !this.state.sendView})
     }
     catchTemplateId(event){
        this.setState({templateId: event.target.id})
     }
     changeSendView(event){
         this.setState({sendView: !this.state.sendView, sendId:event.target.id})
     }
     sendRender(){
         if(this.state.sendView){
            let templateData = this.props.templateData;
            let templates = templateData.map((item, index)=>{
                return <p key={index}> <input onClick={this.catchTemplateId} name="template" id={item.TemplateId} type="radio" />{item.TemplateName}</p>
            });
            return (
            <div>
                <div>
                    {templates}
                    <button onClick={this.send}>Send</button>
                    <button onClick={this.changeSendView}>Cancel</button>
                </div>
            </div> 
            )
         }   
     }
     render() {
        console.log(this.props.emailLists)
        const options = this.props.emailLists.map((item,index)=>{
            return <p key={index}  className="options"   >
                <span id={index}  onClick={this.selectEmailList} className="mailingListName">{this.props.emailLists[index].EmailListName}</span>
                <i className="fa fa-times" id={index} onClick={this.changeDeleteConfirm} aria-hidden="true"></i>
                <i className="fa fa-envelope-o" id={index} onClick={this.changeSendView} aria-hidden="true"></i>
            </p>
        })
        return (
            <div className="choose_mailing_list">
                <div className="mailLingListSelection">      
                        <div  className="mailingListItemsContainer" name="" id="">
                            {options}
                        </div>
                </div>
                {this.deleteConfirmRender()}
                {this.sendRender()}
            </div>
        )   
    }
}
export default ChooseMailingList;

import React, { Component } from 'react';
import '../StyleSheet/MailingLists.css';
//import { EditAddList } from './EditAddList';
import call from '../helpers/call.js';
import ChooseMailingList from './ChooseMailingList';
import MailingListTable from './MailingListTable'


class MailingLists extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailLists: [],
            tableContent:null
         };
         this.getEmailListById = this.getEmailListById.bind(this);
    }
    componentDidMount(){
        call('api/emaillists','GET').then(response => {  response.error ? alert(response.message) : this.setState({emailLists: response})});   
         call('api/emaillists?id=1','GET').then(response=> this.setState({tableContent: response}))
    }
    getEmailListById(id){
        call('api/emaillists?id=' + id,'GET').then(response=> this.setState({tableContent: response}))
    }
    render() {
/*        if(this.state.emailLists.length>0){
            console.log(this.state.emailLists)
        }*/
        
        return (
            <div className="mailing_list_container">
                  {this.state.emailLists.length > 0 ? <ChooseMailingList  getEmailListById={this.getEmailListById} emailLists={this.state.emailLists}/>: <p>wait</p> }
                   {this.state.tableContent  !== null ? <MailingListTable  tableContent={this.state.tableContent.Contacts}/>: <p>waitttttt</p> }
            </div>
        )

        
    }
}
export default MailingLists;



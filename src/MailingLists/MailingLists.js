import React, { Component } from 'react';
import '../StyleSheet/MailingLists.css';
//import { EditAddList } from './EditAddList';
import call from '../helpers/call.js';
import ChooseMailingList from './ChooseMailingList';


class MailingLists extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailLists: null,
            tableContent: null
         };

    }
    componentDidMount(){
        call('api/emaillists','GET').then(response => {  response.error ? alert(response.message) : this.setState({emailLists: response})});
    }
/*    passTableContent(){
        let table;
        if(this.state.emailLists !== null){
            call('api/emaillists?id=' + this.state.emailLists[0].EmailListID,'GET').then(res => this.setState({tableContent: res}))
            if(this.state.tableContent !== null){
                table =  <MailingListTable  tableContent={ this.state.tableContent}/>
            } else{
                table =  <p>please Wait</p>
            }
            return table            
        }

    }*/
    render() {
        return (
            <div className="mailing_list_container">
                <div className="choose_mailing_list">
                   {this.state.emailLists !== null ? <ChooseMailingList  getTable={this.getTable} emailLists={this.state.emailLists}/> : <p>please Wait</p> }
                </div>

            </div>
        )

        
    }
}
export default MailingLists;



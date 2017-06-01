import React, { Component } from 'react';
import '../StyleSheet/MailingLists.css';
//import { EditAddList } from './EditAddList';
import call from '../helpers/call.js'

class ChooseMailingList extends Component {
    constructor(props) {
        super(props);
        this.state={
            emailListId: 0,
            showMailingListSelection: false,
            tableContent: null
        }

        this.changeSelection = this.changeSelection.bind(this)
    }
    changeSelection(){
        this.setState({showMailingListSelection: !this.state.showMailingListSelection})
    }
    componentDidMount(){
        call('api/emaillists?id=' + this.props.emailLists[0].EmailListID,'GET').then(res=>this.setState({tableContent: res}))
    }
    rendertable(){
        let table;
        if(this.state.tableContent !== null){
            let tableContent = this.state.tableContent;
            table = tableContent.Contacts.map((item,index)=>{
		     	<tr key={index} ref={index}>
					 <td><input className="check"    type="checkbox" id={index} />
						  </td>
			     	<td  key={`${tableContent['Full Name']}Full Name`}>
				     	{tableContent['Full Name']}
			     	</td>
			     	<td key={`${tableContent['Company Name']}Company Name`}>
				     	{tableContent["Company Name"]}
				     </td>
			     	<td key={`${tableContent.Position}position`} >
			     	    {tableContent.Position}
			     	</td>
			     	<td key={`${tableContent.Country}country`}  id ="ids">
			     	    {tableContent.Country}
			     	</td>
					 <td key={`${tableContent.Email}email`} id ="ids">
					 
			     	    {tableContent.Email}
			     	</td>

		     	</tr>
            })
        }

    }
    mapMailingLists(){
        const options = this.props.emailLists.map((item,index)=>{
            return <p key={index}  className="options" onClick={this.mailingListName} id={index} value={this.props.emailLists[index].EmailListName}>{this.props.emailLists[index].EmailListName}</p>
        })
        return (
            <div className="mailLingListSelection">
                <p id="defaultMailingList">
                    <span>{this.props.emailLists[0].EmailListName}</span>
                    <i className="fa fa-caret-down "  onClick={this.changeSelection}aria-hidden="true"></i>
                </p>
                {this.state.showMailingListSelection ? 
                <div  className="mailingListItemsContainer" name="" id="">
                    {options}
                </div>
                : " "
            }
                <div className="mailingListTable">
                    {this.rendertable()}
                </div>
            </div>
        )
    }
    render() {
     
        return (
            <div className="mailing_list_container">
                <div className="choose_mailing_list">
                </div>
                    {this.mapMailingLists()}
            </div>
        )

        
    }
}
export default ChooseMailingList;

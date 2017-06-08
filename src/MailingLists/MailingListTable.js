 import React, { Component } from 'react';
 import '../StyleSheet/MailingLists.css';

 class MailingListTable extends Component {
     constructor(props) { 
         super(props);
         this.state = {
			 sendArray:[],
			 deleteContacts : []
	 	};
		this.checkBoxChange = this.checkBoxChange.bind(this);
     }
	 checkBoxChange(event){
	 		let index = event.target.id;
	 		let sendArray = this.state.sendArray;
	 		if(event.target.checked === true){
	 			sendArray.push(this.props.tableContent[index].GuID);
	 			this.setState({sendArray: sendArray});
	 		}else{
	 			for(let i in sendArray){
	 				if(this.props.tableContent[index].GuID === sendArray[i]){
						sendArray.splice(i, 1);
						//console.log(this.props.tableContent[index].GuID)
 					}
	 			}
			}
			 this.props.getSendData(sendArray)
	 	 }
     render() {
/*        if(this.state.emailLists.length>0){
            console.log(this.state.emailLists)
        }*/
		 console.log(this.props.tableContent)
          const data=this.props.tableContent
		      const row = data.map((data,index)=>
		     	<tr key={index} ref={index}>
					 <td><input className="checkBoxMailingList"  onChange={this.checkBoxChange} type="checkbox"  id={index}/> </td>
			     	<td  key={`${data['Full Name']}Full Name`}>
				     	{data['Full Name']}
			     	</td>
			     	<td key={`${data['Company Name']}Company Name`}>
				     	{data["Company Name"]}
				     </td>
			     	<td key={`${data.Position}position`} >
			     	    {data.Position}
			     	</td>
			     	<td key={`${data.Country}country`}>
			     	    {data.Country}
			     	</td>
					 <td key={`${data.Email}email`} >
			     	    {data.Email}
			     	</td>
		     	</tr>
		     	);
        return (
			<div className="mailinglist_table_container">
				<div className="mailing_list_table">
					<h2 className="mailinglist_header"> {this.props.mailingListName}</h2>
					<table className="table">
					<thead>
						<tr>
							<th></th>
							<th>Full Name</th>
							<th>Company Name</th>
							<th>Position</th>
							<th>Country</th>
							<th>Email</th>
						</tr>
					</thead>
						<tbody>
							{row}
						</tbody>
					</table>
				</div>
			</div>
        )
    }
}
export default MailingListTable;
						

        
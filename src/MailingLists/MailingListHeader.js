import React,{Component} from 'react';
class MailingListHeader extends Component{
	render(){
		return(
			<thead>
				<tr >
					<th className="mailingListName">Name</th>
					<th className="mailingListSend">Send Mail</th>
                    <th className="mailingListDelete">Delete</th>
					
				</tr>
			</thead>
		);
	}
} 
export default MailingListHeader;
import React,{Component} from 'react';
class MailingListHeader extends Component{
	render(){
		return(
			<thead>
				<tr >
					<th className>Name</th>
					<th className>Send Mail</th>
                    {/*<th className="select">Delete</th>*/}
					
				</tr>
			</thead>
		);
	}
}
export default MailingListHeader;
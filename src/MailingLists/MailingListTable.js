import React, { Component } from 'react';
import '../StyleSheet/MailingLists.css';

class MailingListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    render() {
/*        if(this.state.emailLists.length>0){
            console.log(this.state.emailLists)
        }*/
         const data=this.props.tableContent
		 console.log(this.props.tableContent)
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
            <div className="mailing_list_table">
                 <table>
                    <tbody>
                        {row}
                    </tbody>
                 </table>
            </div>
        )

        
    }
}
export default MailingListTable;
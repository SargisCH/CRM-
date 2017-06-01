import React, { Component } from 'react';
import '../StyleSheet/MailingLists.css';
import call from '../helpers/call.js';

class MailingListTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailLists: null,
         };

    }
    render() {
        console.log(this.props.tableContent)
			/**/
		     	return(
					 	<p></p>
		     	);

        
    }
}
export default MailingListTable;
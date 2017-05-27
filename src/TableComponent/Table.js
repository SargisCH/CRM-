import React, { Component } from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import AddContact from './AddContact.js';
import '../StyleSheet/Table.css';
import Ajax from '../Ajax.js';

class Table extends Component{
			constructor(props){
				super(props);
				this.state = {data:[], newContacts: {}}
				//this.updateTable=this.updateTable.bind(this);
				this.postData = this.postData.bind(this);
				this.getSendData = this.getSendData.bind(this);
				//this.addData= this.addData.bind(this);
				//this.getNewContacts = this.getNewContacts.bind(this);

			}
			componentWillMount(){
				//let that = this;
				Ajax.getData('http://crmbetc.azurewebsites.net/api/contacts').then(response => this.setState({data: response}));
			}
			getSendData(sendData){
				this.state.sendData = sendData
			}
			postData(sendData){
				sendData = this.state.sendData;
				console.log(sendData)
				Ajax.postData('http://crmbetc.azurewebsites.net/api/sendemails?template=1', sendData )
			/*if(sendData && sendData.length > 0 ){
					this.state.sendData = [];
					console.log(sendData);
				}*/
			}
			/*getNewContacts(newContacts){
				this.setState({newContacts: newContacts})
				
					console.log(this.state.newContacts);
			}*/
			/*updateTable(){
		      this.getData()
			}*/
		      //console.log("update table, and Data",array);
			render(){
    			//return <div> {this.state.data.length ? <div>{this.state.data[0].CompanyName}</div> : <div>pandding state</div>}</div>
			return (<div className="UserTable">
							<div id="theader">User Info List</div>
								<table className="table">
								<TableHeader headerdata={this.state.data[0]} className="tableheader"/>
								<TableRow  getSendData={this.getSendData} sendArray={[]} update={this.updateTable} dataArray={this.state.data}/>
								</table>
								<button  onClick={this.postData} className="send_button">send</button>
								<AddContact getNewContacts={this.getNewContacts}/>
							
							{/*<AddRowTable  update={this.updateTable} Id={this.state.data.length + 1} className="addrowtable"/>*/}
							</div>
			)	
		}
}
    export default Table;
		     	
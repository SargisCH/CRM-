import React, { Component } from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import AddContact from './AddContact.js';
import '../StyleSheet/Table.css';
import Ajax from '../Ajax.js';

class Table extends Component{
			constructor(props){
				super(props);
				this.state = {data:[] /*deleteData:""*/}
				//this.updateTable=this.updateTable.bind(this);
				this.postData = this.postData.bind(this);
				this.getSendData = this.getSendData.bind(this);
				//this.addData= this.addData.bind(this);
				this.deleteData = this.deleteData.bind(this);
				this.getNewContacts = this.getNewContacts.bind(this);

			}
			componentDidMount(){
				//let that = this;
				Ajax.getData('http://crmbetc.azurewebsites.net/api/contacts').then(response => this.setState({data: response}));
			}
			getSendData(sendData){
				this.state.sendData = sendData
			}
			deleteData(deleteData, deleteIndex){
				let deleteArray = this.state.data;
				deleteArray.splice(deleteIndex,1);
				this.setState({data: deleteArray})
				Ajax.deleteData('http://crmbetc.azurewebsites.net/api/contacts?id=' + deleteData);
			}
			postData(sendData){
				sendData = this.state.sendData;
				Ajax.postData('http://crmbetc.azurewebsites.net/api/sendemails?template=1', sendData )
			/*if(sendData && sendData.length > 0 ){
					this.state.sendData = [];
					console.log(sendData);
				}*/
			}
			getNewContacts(newContactobj){
				let newData = this.state.data;
				newData.push(newContactobj);
				Ajax.postData('http://crmbetc.azurewebsites.net/api/contacts', newContactobj);
				this.setState({data: newData});
			}
			/*updateTable(){
		      this.getData()
			}*/
			render(){
			return (<div className="UserTable">
							<div id="theader">User Info List</div>
								<table className="table">
								<TableHeader headerdata={this.state.data[0]} className="tableheader"/>
								<TableRow  getSendData={this.getSendData} deleteData={this.deleteData} sendArray={[]} update={this.updateTable} dataArray={this.state.data}/>
								</table>
								<button  onClick={this.postData} className="send_button btn_table">send</button>
								<AddContact getNewContacts={this.getNewContacts}/>
							</div>
			)	
		}
}
    export default Table;
		     	
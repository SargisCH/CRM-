import React, { Component } from 'react';
import TableHeader from'./TableHeader.js';
import TableRow from './TableRow.js';
import AddContact from './AddContact.js';
import '../StyleSheet/Table.css';
//import Ajax from '../Ajax.js';
import call from '../helpers/call.js'
class Table extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: [],
			sendData: [],
			/*deleteData:""*/
		}
		//this.updateTable=this.updateTable.bind(this);
		this.postData = this.postData.bind(this);
		this.getSendData = this.getSendData.bind(this);
		//this.addData= this.addData.bind(this);
		this.deleteData = this.deleteData.bind(this);
		this.getNewContacts = this.getNewContacts.bind(this);
	}
	componentDidMount(){
		let self = this;
		//let that = this;
		//Ajax.getData('http://crmbetc.azurewebsites.net/api/contacts').then(response => this.setState({data: response}));
		call('api/contacts','GET').then(response => {  response.error ? alert(response.message) : self.setState({data: response})})
	}
	getSendData(sendData){
		this.setState({sendData :sendData})
	}
	deleteData(deleteData, deleteIndex){
		let deleteArray = this.state.data;
		deleteArray.splice(deleteIndex,1);
		this.setState({data: deleteArray})
		//Ajax.deleteData('http://crmbetc.azurewebsites.net/api/contacts?id=' + deleteData);
		call('api/contacts?guid=' + deleteData, "DELETE");
	}
	postData(sendData){
		sendData = this.state.sendData;
		call('api/sendemails?template=1','POST', sendData);
		//Ajax.postData('http://crmbetc.azurewebsites.net/api/sendemails?template=1', sendData )
		//call('api/sendemails?template=1','POST').then(response => {  response.error ? alert(response.message) : self.setState({data: response})})
		/*if(sendData && sendData.length > 0 ){
			this.state.sendData = [];
			console.log(sendData);
		}*/
	}
	getNewContacts(newContactobj){
		let self = this;
		let newData = this.state.data;
		console.log(newData)
		newData.push(newContactobj);
		console.log(newData);
		//Ajax.postData('http://crmbetc.azurewebsites.net/api/contacts', newContactobj);
		call('api/contacts','POST',newContactobj).then(()=> this.setState({data: newData}))
		
		
		setTimeout(function(){
			
			call('api/contacts','GET').then(response => {  response.error ? alert(response.message) : self.setState({data: response});console.log("sadadas")},5000);
		})
		
	}
	/*updateTable(){
		this.getData()
	}*/
	render(){
		return (<div className="UserTable">
			{/*<div id="theader">User Info List</div>*/}
				<table className="table">
				<TableHeader headerdata={this.state.data[0]} className="tableheader"/>
				<TableRow  getSendData={this.getSendData} deleteData={this.deleteData} sendArray={[]} update={this.updateTable} dataArray={this.state.data}/>
				</table>
				<button  onClick={this.postData} className="send_button btn_table">Send</button>
				<AddContact getNewContacts={this.getNewContacts}/>

			</div>
		)
	}
}
export default Table;
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
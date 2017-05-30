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
			disabled: true,
			namingEmailList: false
			/*deleteData:""*/
		}
		//this.updateTable=this.updateTable.bind(this);
		this.postData = this.postData.bind(this);
		this.getSendData = this.getSendData.bind(this);
		//this.addData= this.addData.bind(this);
		this.deleteContacts = this.deleteContacts.bind(this);
		this.getNewContacts = this.getNewContacts.bind(this);
		this.createEmailList = this.createEmailList.bind(this)
		this.changeNamilngList =this.changeNamilngList.bind(this);
		this.savedData = this.savedData.bind(this);
	}
	componentDidMount(){
		let self = this;
		//let that = this;
		//Ajax.getData('http://crmbetc.azurewebsites.net/api/contacts').then(response => this.setState({data: response}));
		call('api/contacts','GET').then(response => {  response.error ? alert(response.message) : self.setState({data: response})})
	}
	changeNamilngList(){
		this.setState({namingEmailList: !this.state.namingEmailList})
	}
	createEmailList(){
		this.setState({namingEmailList: !this.state.namingEmailList})
		let mailingLists = this.state.sendData;
		let nameMailingList = this.refs.mailingListName;
		console.log(mailingLists)
	}
	createEmailListRender(){
		if(this.state.namingEmailList){
			return (
				<div className="mailing_list_form">
					<input  ref="mailingListName" type="text"/>
					<button onClick={this.createEmailList}> Create </button>
					<button onClick={this.changeNamilngList} > Cancel </button>
				</div>
			)
		}else{
			return <button  className="btn_table create_email_list" onClick={this.changeNamilngList} > Create New Mailing List </button>
		}
	}
	getSendData(sendData){
		this.setState({sendData :sendData})
		//console.log(sendData)
	}
/*	deleteData(deleteData, deleteIndex){
		let deleteArray = this.state.data;
		deleteArray.splice(deleteIndex,1);
		this.setState({data: deleteArray})
		//Ajax.deleteData('http://crmbetc.azurewebsites.net/api/contacts?id=' + deleteData);
		call('api/contacts?guid=' + deleteData, "DELETE");
	}*/
	deleteContacts(sendDeleteData){
		 sendDeleteData = this.state.sendData;
		 let deleteData = this.state.data;
		 for(let i in sendDeleteData){
			 for(let j in deleteData){
				 if(sendDeleteData[i] === deleteData[j].guID){
					 deleteData.splice(j,1)
				 }
			 }
		 }
		 console.log(deleteData)
		 this.setState({data:deleteData})
		 console.log(sendDeleteData)
		 call('api/contacts','DELETE', sendDeleteData);
	}
	savedData(obj, id){
		let savedData = this.state.data;
		savedData[id] = obj;
		this.setState({data: savedData}) ;
	}
	postData(sendData){
		sendData = this.state.sendData;
		console.log(sendData)
		call('api/sendemails?template=1','POST', sendData)
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
		call('api/contacts','POST', newContactobj).then(response=>{newData.push(response); this.setState({data:newData})})
	}
	/*updateTable(){
		this.getData()
	}*/
	render(){
		return (<div className="UserTable">
				<table className="table">
				<TableHeader headerdata={this.state.data[0]} className="tableheader"/>
				<TableRow  savedData={this.savedData} getSendData={this.getSendData} deleteData={this.deleteData} sendArray={[]} update={this.updateTable} dataArray={this.state.data}/>
				</table>
				<button  onClick={this.postData} className="send_button btn_table">Send</button>
				<button  className="btn_table delete_button" onClick={this.deleteContacts} > Delete</button>
				{this.createEmailListRender()}
				<AddContact getNewContacts={this.getNewContacts}/>
			</div>
		)
	}
}
export default Table;
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
		     	
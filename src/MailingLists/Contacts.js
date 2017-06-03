import React,{Component} from 'react';
import call from '../helpers/call.js';
class Contacts extends Component{
    constructor(props){
        super(props);
        this.state={
            sendData:[],
            checkBoxes:[],
            contacts:this.props.contacts
        }
        this.controlContactsView = this.controlContactsView.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
        this.deleteData = this.deleteData.bind(this);
        // this.console = this.console.bind(this);
    }
    checkBoxChange(event){
			let index = event.target.id;
			let sendData = this.state.sendData;
			this.state.checkBoxes.push(event.target);
			if(event.target.checked === true){
				sendData.push(this.props.contacts[index].GuID);
				this.setState({sendData: sendData})
			}else{
				for(let i in sendData){
					if(this.props.contacts[index].GuID === sendData[i]){
						sendData.splice(i, 1);
					}
				}
			}
			
	}
    deleteData(){
        let deleteData = this.state.sendData;
        let id = this.props.emailListId;
        //let contacts = this.state.contacts
        //console.log(contacts)
        
         call('api/emaillists/update?id='+id+'&flag=false','PUT', deleteData);
        // for(let i in deleteData){
		// 	 for(let j in contacts){
		// 		 if(deleteData[i] == contacts[j].GuID){
		// 			 contacts.splice(j,1)
		// 		 }
		// 	 }
		//  }
        //     this.props.changeContactsState(contacts);
       }
    
    controlContactsView(){
        this.props.controlContactsView(false);
    }
    // console(){
    //     console.log(this.props.contacts)
    // }
	render(){
        const data = this.props.contacts;
        //console.log(data);
        const row = data.map((data,index)=>
            <tr key={index} ref={index}> 
                 <td id="checkBox"><input onChange={this.checkBoxChange} type="checkbox"  id={index}/></td>
                <td  id={index} key={data["Full Name"]}>
                    {data["Full Name"]}
                </td>
                <td  id={index} key={data["Company Name"]}>
                    {data["Company Name"]}
                </td>             
                <td  id={index} key={data["Position"]}>
                    {data["Position"]}
                </td>   
                <td  id={index} key={data["Country"]}>
                    {data["Country"]}
                </td>
                <td  id={index} key={data["Email"]}>
                    {data["Email"]}
                </td>
            </tr>
        );
		return(
            <div className="contacts">
                <div className="close" onClick={this.controlContactsView}>X</div>
                <div className="contacts_table_container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>Full Name</th>
                                    <th>Company Name</th>
                                    <th>Posiiton </th>
                                    <th>Country </th>
                                    <th>Email </th>
                                </tr>
                            </thead>
                            <tbody>
                                {row}
                            </tbody>
                        </table>
                            <button className="deleteContacts" onClick={this.deleteData}>Delete</button>
                </div>
            </div>
		);
	}
}
export default Contacts;

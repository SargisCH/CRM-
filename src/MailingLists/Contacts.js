import React,{Component} from 'react';
import call from '../helpers/call.js';
class Contacts extends Component{
    constructor(props){
        super(props);
        this.state={
            sendData:[],
            checkBoxes:[],
            delete: false,
            disabled: true
           
        }
        this.controlContactsView = this.controlContactsView.bind(this);
        this.checkBoxChange = this.checkBoxChange.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.createDeletePopUp = this.createDeletePopUp.bind(this);
		this.changeDeleteState = this.changeDeleteState.bind(this);
        this.isDisable = this.isDisable.bind(this);
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
            this.isDisable(sendData);
	}
    isDisable(sendData){
        sendData = this.state.sendData;
		if(sendData.length>0){
			this.setState({disabled:false})
		} else {
			this.setState({disabled:true})
		}
	}	
    deleteData(deleteData){
        deleteData = this.state.sendData;
        let id = this.props.emailListId;
        let contacts = this.props.contacts;
        call('api/emaillists/update?id='+id+'&flag=false','PUT', deleteData);
        for(let i in deleteData){
			 for(let j in contacts){
				 if(deleteData[i] == contacts[j].GuID){
					 contacts.splice(j,1)
				 }
			 }
		 }
            this.props.changeContactsState(contacts);
            let checkBoxes = this.state.checkBoxes;
            for(let i in checkBoxes){
                checkBoxes[i].checked = false
            }
		    this.setState({checkBoxes: checkBoxes});
            this.changeDeleteState();
            this.setState({disabled:true})
       }
    
    controlContactsView(){
        this.props.controlContactsView(false);
    }
    createDeletePopUp(){
            if(this.state.delete){
                return(
                    <div className="delete_block">
                        <div className="delete_popoUp">
                            <p>Are you sure?</p>
                            <button onClick={this.deleteData}>Delete</button>
                            <button onClick={this.changeDeleteState}>Cancel</button>
                        </div>
                    </div>
                )
            }
        }
	changeDeleteState(){
		this.setState({delete:!this.state.delete});
	}
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
                            <button className="deleteContacts" disabled={this.state.disabled} onClick={this.changeDeleteState}>Delete</button>
                            {this.createDeletePopUp()}
                </div>
            </div>
		);
	}
}
export default Contacts;

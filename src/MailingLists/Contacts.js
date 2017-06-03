import React,{Component} from 'react';
class Contacts extends Component{
    constructor(props){
        super(props)
        this.controlContactsView = this.controlContactsView.bind(this)
    }
    controlContactsView(){
        this.props.controlContactsView(false);
    }
	render(){
        const data = this.props.contacts;
        //console.log(data);
        const row = data.map((data,index)=>
            <tr key={index} ref={index}>
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
                </div>
            </div>
		);
	}
}
export default Contacts;
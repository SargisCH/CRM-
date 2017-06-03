// import React, { Component } from 'react';
// import '../StyleSheet/MailingLists.css';

// class ChooseMailingList extends Component {
//     constructor(props) {
//         super(props);
//         this.state={
//             emailListId: 0,
//             showMailingListSelection: false,
//             tableContent: []
//         }
//         this.changeSelection = this.changeSelection.bind(this);
//         this.selectEmailList = this.selectEmailList.bind(this);
//     }
//     changeSelection(){
//         this.setState({showMailingListSelection: !this.state.showMailingListSelection})
//     }
//     selectEmailList(event){
//         let index = event.target.id;
//         let emailListId = this.props.emailLists[index].EmailListID;
        //console.log("iddd"+emailListId);
    //     this.props.getEmailListById(emailListId);
    //     this.props.getEmailListId(emailListId);
    //     this.setState({showMailingListSelection: !this.state.showMailingListSelection})
    // }
    // render() {
        //console.log(this.props.emailLists)
        /*const options = this.props.emailLists.map((item,index)=>{
            return <p key={index}  className="options" onClick={this.selectEmailList} id={index} value={this.props.emailLists[index].EmailListName}>{this.props.emailLists[index].EmailListName}</p>
        })
        return (
            <div className="choose_mailing_list">
                <div className="mailLingListSelection">
                    <p id="defaultMailingList">
                        <span>{this.props.emailLists[0].EmailListName}</span>
                        <i className="fa fa-caret-down "  onClick={this.changeSelection} aria-hidden="true"></i>
                    </p>
                    {this.state.showMailingListSelection ? 
                        <div  className="mailingListItemsContainer" name="" id="">
                            {options}
                        </div>
                    : " "
            }
                </div>
            </div>
        )   
    }
}
export default ChooseMailingList;*/

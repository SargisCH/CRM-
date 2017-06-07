import React,{Component} from 'react';
import './StyleSheet/success.css';
class Success extends Component {
    constructor(props){
        super(props)
        this.changeSuccessMessage = this.changeSuccessMessage.bind(this)
    }
    changeSuccessMessage(){
        if(this.props.file){
            this.props.addContactsFile()   
        }
        this.props.changeSuccessMessage(false)
    }
    render() {
        return (
            <div  className="success">
                <div  className="success_message"> 
                    <div className="successContainer">
                        <p>{this.props.message}</p>
                        <p className="success_confirm" onClick={this.changeSuccessMessage}>OK</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Success;

import React,{Component} from 'react';
import './StyleSheet/success.css';
class Success extends Component {
    constructor(props){
        super(props)
        this.changeSuccessMessage = this.changeSuccessMessage.bind(this)
    }
    changeSuccessMessage(){
        this.props.changeSuccessMessage(false)
    }
    render() {
        return (
            <div  className="success">
                <div  className="success_message"> 
                    <h1>{this.props.message}</h1>
                    <p className="success_confirm" onClick={this.changeSuccessMessage}>OK</p>
                </div>
            </div>
        );
    }
}

export default Success;

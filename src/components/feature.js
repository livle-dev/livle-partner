import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Feature extends Component{
    componentWillMount(){
        console.log(this.props.data)
        // this.props.fetchMessage()
    }


    render(){
        return (
            <div>Hi, {this.props.data.company}</div>
        )
    }
}

function mapStateToProps(state){
    return {data: state.auth};
}

export default connect(mapStateToProps, actions)(Feature);
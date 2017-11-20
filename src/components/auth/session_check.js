// //HOC
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import * as actions from '../../actions'
//
// export default function(ComposedComponent) {
//     class CheckSession extends Component {
//
//         componentWillMount() {
//             if (localStorage.getItem('token')) {
//                 this.props.checkSession(()=>{
//                     this.props.history.push('/feature');
//                 });
//             }
//
//         }
//
//         render() {
//             return <ComposedComponent {...this.props} />
//         }
//     }
//
//     return connect(null, actions)(CheckSession);
// }
//
//

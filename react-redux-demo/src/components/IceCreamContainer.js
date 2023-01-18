import React from 'react'
import { buyIcecream } from '../redux'
import { connect } from "react-redux"
function IceCreamContainer(props) {
  return (
    <div>
        <h2>Number of Icecreams - {props.numOfIcecreams}</h2>
        <button onClick={props.buyIcecream}>Buy icecream</button>
    </div>
  )
}

// it gets a redux state as a parameter, gets appropriate state property
const mapStateToProps = state =>{
  return {
    numOfIcecreams:state.numOfIcecreams
  }
}
// dispatching actions , adding actions to props in component
const mapDispatchToProps = dispatch =>{
  return {
    buyIcecream:()=>dispatch(buyIcecream())
  }
}
// connecting actions and reducers to component 
export default connect(mapStateToProps,mapDispatchToProps)(IceCreamContainer)
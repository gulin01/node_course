import React from 'react'
import { buyCake } from '../redux'
import { connect } from "react-redux"
function CakeContainer(props) {
  return (
    <div>
        <h2>Number of cakes - {props.numOfCakes}</h2>
        <button onClick={props.buyCake}>Buy cake</button>
    </div>
  )
}

// it gets a redux state as a parameter, gets appropriate state property
const mapStateToProps = state =>{
  return {
    numOfCakes:state.numOfCakes
  }
}
// dispatching actions , adding actions to props in component
const mapDispatchToProps = dispatch =>{
  return {
    buyCake:()=>dispatch(buyCake())
  }
}
// connecting actions and reducers to component 
export default connect(mapStateToProps,mapDispatchToProps)(CakeContainer)
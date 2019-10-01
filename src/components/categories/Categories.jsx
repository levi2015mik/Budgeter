import React from "react";
import {connect} from "react-redux";
import {getUnfilteredCategories} from "../../redux/selectors"

function Categories(props) {
    console.log(props.categories);
    return(<div>Categories
        <table>
            <thead>
            <tr>
                <td>Name</td>
                <td>Cost AVG</td>
                <td>Interval between purchases</td>
            </tr>
            </thead>
            <tbody>
            {props.categories.map(
                (el,i)=> <Row
                    name={el.name}
                    avg={el.avg}
                    avgTime={el.avgTime}
                    key={i} />)}
            </tbody>
        </table>
    </div>)
}

function Row(props) {
    return(<>
        <tr>
            <td>{props.name}</td>
            <td>{props.avg}</td>
            <td>{props.avgTime}</td>
        </tr>
    </>)
}

export default connect(
    state=>(
        { categories:getUnfilteredCategories(state) })
)(Categories)
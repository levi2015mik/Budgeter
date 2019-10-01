import React from "react";
import {connect} from "react-redux";
import {getUnfilteredCategories} from "../../redux/selectors"
import css from "./Categories.module.css"

function Categories(props) {
    const avgTimeFmt = (time) => Math.floor(time / 1000/ 60/ 60/ 24);
    return(<div className={css.categories}>
        Categories
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Cost AVG</th>
                <th>Interval</th>
            </tr>
            </thead>
            <tbody>
            {props.categories.map(
                (el,i)=> <Row
                    name={el.name}
                    avg={el.avg}
                    avgTime={avgTimeFmt(el.avgTime)}
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
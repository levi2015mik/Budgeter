import React from "react";

function Account(props) {
    return <div>Account {props.match.params.id}</div>
}

export default Account;
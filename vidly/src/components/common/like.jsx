import React, { Component } from "react";

/* Interface of the Component */

// Input: liked: boolean.

// Output: onClick

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    return <i className={classes} aria-hidden="true"></i>;
  }
}

export default Like;

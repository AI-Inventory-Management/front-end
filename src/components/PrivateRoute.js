import React from 'react';
import toast from 'react-hot-toast';
import { Route, redirect } from 'react-router-dom';

function PrivateRoute(props) {
    const currentRole = window.sessionStorage.getItem("role");
    console.log("roles", props.roles.includes(currentRole));

    if (!props.roles.includes(currentRole)) {
        //toast.error("Forbidden");
        console.log("Entré a private route")
        return redirect('/');
    }
    console.log("No entré a private route")

    return props.component;

}

export default PrivateRoute;
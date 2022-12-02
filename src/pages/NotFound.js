import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          gap: "2rem",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "16rem" }}>404</h1>
        <h1
          style={{
            paddingLeft: "5rem",
            paddingRight: "5rem",
            fontSize: "8rem",
            textAlign: "center",
          }}
        >
          Upss, página no encontrada :(
        </h1>
        <Link
          to="/"
          style={{
            textDecoration: "none",

            fontSize: "4rem",
          }}
        >
          <p style={{ color: "lightblue" }}>Regresar al menú principal</p>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

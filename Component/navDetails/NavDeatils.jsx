import React from "react";
import Button from "../buttons/links/Button";
import { useRouter } from "next/router";

function NavDeatils() {
  const router = useRouter();
  const getUrl = router.asPath;

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button style={{ fontWeight: "bold", color: "#647196" }} href="/">
        Go Back
      </Button>
      <Button
        style={{
          backgroundColor: "#4661e6",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1rem",
          textTransform: "capitalize",
          padding: ".6rem 1rem",
          borderRadius: "10px",
        }}
        href={`/editfeedback${getUrl}`}
      >
        edit feedback
      </Button>
    </nav>
  );
}

export default NavDeatils;

import React from "react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div className=" footer-main">
      <div className=" footer-txt">
        Copyright © made by Anurag Sahay
      </div>
      <div className="footer-logo">
        <a href={"https://github.com/anuragsahay5"}>
          <FaGithub />
        </a>
        <a href={"https://in.linkedin.com/in/anurag-sahay-7523bb220"}>
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}

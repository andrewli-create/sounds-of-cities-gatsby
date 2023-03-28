import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import github from "../img/github-icon.svg";
import logo from "../img/logo.svg";
import albumArt from "../img/album_art.jpeg";
import ComposerListRoll from "./ComposerListRoll";
import CompositionListRoll from "./CompositionListRoll";
import $ from 'jquery';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    jQuerycode();
  }, []);

  let jQuerycode = () => {
    $( "body" ).on( "mouseenter", ".navbar-item", function() {
      $(this).find(".navbar-dropdown").fadeIn('fast');
    });

    $( "body" ).on( "mouseleave", ".navbar-item", function() {
      $(this).find(".navbar-dropdown").fadeOut('fast');
    });

    $( "body" ).on( "click", ".closed", function() {
      $(this).removeClass("closed");
      $(".mobile-drop-down-wrapper").slideDown();
      $(this).addClass("opened");
    });

    $( "body" ).on( "click", ".opened", function() {
      $(this).removeClass("opened");
      $(".mobile-drop-down-wrapper").slideUp();
      $(this).addClass("closed");
    });
  }
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <Link to="/" className="navbar-logo" title="Logo">
          <img className="navbar-logo-image" src={albumArt} alt="Sound of Cities"/>
        </Link>
        <div className="mobile-burger closed">
          <div className="burger-bar"></div>
          <div className="burger-bar"></div>
          <div className="burger-bar"></div>
        </div>
        <ul className="nav-item-wrapper">
          <ul className="nav-item-wrapper-inner">
            <li className="navbar-item">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar-item">
              <Link to="/about">About</Link>
            </li>
            <li className="navbar-item">
              <Link to="/composition">Music</Link>
              <ul className="navbar-dropdown navbar-dropdown-translate">
                <CompositionListRoll/>
              </ul>
            </li>
            <li className="navbar-item">
              <Link to="/composer">Composer</Link>
              <ul className="navbar-dropdown">
                <ComposerListRoll/>
              </ul>
            </li>
            <li className="navbar-item no-touch">
            <Link to="/">Streaming <span style={{fontSize: 10}}>Coming Soon!</span></Link>
            </li>
            {/* <li className="navbar-item">
              <Link to="/about">Contact</Link>
            </li> */}
          </ul>
        </ul>
      </nav>
      <div className="mobile-drop-down-wrapper">
        <ul className="mobile-drop-down">
            <li className="mobile-navbar-item">
              <Link to="/">Home</Link>
            </li>
            <li className="mobile-navbar-item">
              <Link to="/about">About</Link>
            </li>
            <li className="mobile-navbar-item">
              <Link to="/composition">Music</Link>
            </li>
            <li className="mobile-navbar-item">
              <Link to="/composer">Composer</Link>
            </li>
            <li className="mobile-navbar-item no-touch">
              <Link to="/">Streaming <span style={{fontSize: 10}}>Coming Soon!</span></Link>
            </li>
        </ul>
      </div>
    </div>
    // <nav
    //   className="navbar is-transparent"
    //   role="navigation"
    //   aria-label="main-navigation"
    // >
    //   <div className="container">
    //     <div className="navbar-brand">
    //       <Link to="/" className="navbar-item" title="Logo">
    //         <img src={logo} alt="Kaldi" style={{ width: "88px" }} />
    //       </Link>
    //       {/* Hamburger menu */}
    //       <button
    //         className={`navbar-burger burger ${isActive && "is-active"}`}
    //         aria-expanded={isActive}
    //         onClick={() => setIsActive(!isActive)}
    //       >
    //         <span />
    //         <span />
    //         <span />
    //       </button>
    //     </div>
    //     <ul id="navMenu" className={` navbar-start has-text-centered navbar-menu ${isActive && "is-active"}`}>
    //         {/* TODO: inline override of padding is a result of refactoring
    //             to a ul for accessibilty purposes, would like to see a css
    //             re-write that makes this unneccesary.
    //          */}
    //         <li className="navbar-item" style={{padding: "0px"}}>
    //           <Link className="navbar-item" to="/about">
    //             About
    //           </Link>
    //         </li>
    //         <li className="navbar-item" style={{padding: "0px"}}>
    //         <Link className="navbar-item" to="/products">
    //           Products
    //         </Link>
    //         </li>
    //         <li className="navbar-item" style={{padding: "0px"}}>
    //         <Link className="navbar-item" to="/blog">
    //           Blog
    //         </Link>
    //         </li>
    //         <li className="navbar-item" style={{padding: "0px"}}>
    //         <Link className="navbar-item" to="/contact">
    //           Contact
    //         </Link>
    //         </li>
    //         <li className="navbar-item" style={{padding: "0px"}}>
    //         <Link className="navbar-item" to="/contact/examples">
    //           Form Examples
    //         </Link>
    //         </li>
    //       <li className="navbar-end has-text-centered">
    //         <a
    //           className="navbar-item"
    //           href="https://github.com/netlify-templates/gatsby-starter-netlify-cms"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           <span className="icon">
    //             <img src={github} alt="Github" />
    //           </span>
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
  );
};

export default Navbar;

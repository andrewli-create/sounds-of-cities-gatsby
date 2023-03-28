import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import github from "../img/github-icon.svg";
import logo from "../img/logo.svg";
import albumArt from "../img/album_art.jpeg";
import ComposerListRoll from "./ComposerListRoll";
import CompositionListRoll from "./CompositionListRoll";
import $ from 'jquery';
import "./animated.css";

const AnimatedBG = () => {
  
  return (
    <>
        <div class="lines">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>

    </>
  );
};

export default AnimatedBG;

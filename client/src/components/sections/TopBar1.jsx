import React, { Component } from "react";
import { debounce, classList } from "../../Utils";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Typography from "@material-ui/core/Typography";
import { NavLink } from "react-router-dom";
import ScrollTo from "../common/ScrollTo";

class TopBar extends Component {
  state = {
    isTop: true,
    isClosed: true,
  };
  handleScrollRef;

  componentDidMount() {
    if (window) {
      this.handleScrollRef = this.handleScroll();
      window.addEventListener("scroll", this.handleScrollRef);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("scroll", this.handleScrollRef);
    }
  }

  handleScroll() {
    return debounce(() => {
      if (window) {
        let isTop = window.scrollY < 100;
        if (isTop !== this.state.isTop) {
          this.setState({ isTop });
        }
      }
    }, 20);
  }

  close = () => {
    this.setState({ isClosed: true });
  };

  render() {
    let toggleIcon = this.state.isClosed ? "menu" : "close";
    return (
      <section
        className={classList({
          header: true,
          "header-fixed": !this.state.isTop,
          closed: this.state.isClosed,
        })}
      >
        <div className="container header-container">
          <div className="brand">
            <Typography variant="h4">
              <a href="/">
                {/* <img src="./assets/images/logo-full.png" alt="" /> */}
                Stonks.js
              </a>
            </Typography>
          </div>
          {/* <ul className="navigation">
            <li>
              <NavLink to="/">Demos</NavLink>
            </li>
            <li>
              <ScrollTo to="intro1" onScroll={this.close}>
                Hello
              </ScrollTo>
            </li>
            <li>
              <ScrollTo to="portfolio1" onScroll={this.close}>
                Works
              </ScrollTo>
            </li>
            <li>
              <ScrollTo to="service1" onScroll={this.close}>
                Service
              </ScrollTo>
            </li>

            <li>
              <ScrollTo to="pricing1" onScroll={this.close}>
                Pricing
              </ScrollTo>
            </li>
            <li>
              <ScrollTo to="contact1" onScroll={this.close}>
                Contact
              </ScrollTo>
            </li>
          </ul> */}
          <div className="m-auto" />
          <ul className="navigation">
            <li>
              <a href="/signup">
                <AssignmentIcon className="mr-16" />
                Sign Up
              </a>
            </li>
            <li>
              <a href="/login">
                <VpnKeyIcon className="mr-16" /> Log In
              </a>
            </li>
          </ul>
          <IconButton
            className="header__toggle"
            onClick={() => {
              this.setState({ isClosed: !this.state.isClosed });
            }}
          >
            <Icon>{toggleIcon}</Icon>
          </IconButton>
        </div>
      </section>
    );
  }
}

export default TopBar;

'use strict';

import React from 'react';
import classnames from 'classnames';

import Track from 'app/adaptors/server/track';
import Flux from 'app/flux';

const NavigationLink = React.createClass({
  onClick(e) {
    var openInNewTab = (e.button === 1 || e.shiftKey || e.ctrlKey || e.metaKey) ? true : false;

    if(!openInNewTab) {
      e.preventDefault();
      this.props.onClick && this.props.onClick();
      Track('send', {
        'hitType': 'event',               // Required.
        'eventCategory': 'nav',           // Required.
        'eventAction': 'click_nav_link',  // Required.
        'eventLabel': this.props.gaId,    // TODO: Remove once GA has been hooked into router
      });
      Flux.navigate(this.props.url);
    }
  },
  render() {
    const { selected, url, children } = this.props;
    const classes = classnames('navigation-link', { selected: selected });
    return <li className={classes}>
      <a href={url} onClick={this.onClick}>{children}</a>
    </li>;
  }
});

export default NavigationLink;

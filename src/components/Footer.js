import React from 'react';
import Container from 'react-bootstrap/Container';


class Footer extends React.Component {

  render() {
    var footerStyles = {
        "position": "absolute",
        "bottom": "0",
        "width": "100%",
        "height": "60px",
        "line-height": "60px",
        "background-color": "#f5f5f5"
    }
    return (
      <footer class="footer" style={footerStyles}>
        <Container>
          <span class="text-muted">Created by <a href="https://www.reddit.com/message/compose/?to=Synergix" target="_blank">u/Synergix</a>.</span>
        </Container>
      </footer>
    )
  }

}

export default Footer;
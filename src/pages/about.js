import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import faqs from '../data/faq.json';


class AboutPage extends React.Component {

  render() {
    const faqList = faqs.map((faq, index) => 
      <div>
        <h4 key={index} class="mt-5">{faq.q}</h4>
        <p dangerouslySetInnerHTML={ {__html: faq.a} } />
      </div>
    );

    return (
      <Container>
        <h1 className="display-4 mt-5">About</h1>
        {faqList}
      </Container>
    );
  }
}

export default AboutPage;

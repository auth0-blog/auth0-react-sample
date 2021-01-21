import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";
import HomeContent from "./home-contect";

class InputBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { domain: "", keyword: "", startDate: "", endDate: "" };

    this.handleInputDomain = this.handleInputDomain.bind(this);
    this.handleInputKeyword = this.handleInputKeyword.bind(this);
    this.handleInputStartDate = this.handleInputStartDate.bind(this);
    this.handleInputEndDate = this.handleInputEndDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputDomain(event) {
    this.setState({
      domain: event.target.value,
    });
  }

  handleInputKeyword(event) {
    this.setState({
      keyword: event.target.value,
    });
  }

  handleInputStartDate(event) {
    this.setState({
      startDate: event.target.value,
    });
  }

  handleInputEndDate(event) {
    this.setState({
      endDate: event.target.value,
    });
  }

  handleSubmit(event) {
    console.log("Search Domain: " + this.state.domain);
    console.log("Search Keyword: " + this.state.keyword);
    console.log("Search StartDate: " + this.state.startDate);
    console.log("Search EndDate: " + this.state.endDate);

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <div class="form-group">
                <label>Enter Domain:</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputDomian"
                  value={this.state.domain}
                  onChange={this.handleInputDomain}
                  required
                />
              </div>
            </Col>
            <Col>
              <div class="form-group">
                <label>Enter Keyword:</label>
                <input
                  type="text"
                  class="form-control"
                  value={this.state.keyword}
                  onChange={this.handleInputKeyword}
                  required
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div class="form-group">
                <label>Select Start Date:</label>
                <input
                  type="date"
                  class="form-control"
                  value={this.state.startDate}
                  onChange={this.handleInputStartDate}
                  required
                />
              </div>
            </Col>
            <Col>
              <div class="form-group">
                <label>Select End Date:</label>
                <input
                  type="date"
                  class="form-control"
                  value={this.state.endDate}
                  onChange={this.handleInputEndDate}
                  required
                />
              </div>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default InputBar;

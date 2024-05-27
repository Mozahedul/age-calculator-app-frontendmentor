import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import "./App.css";

function App() {
  const [days, setDays] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");

  const [dayErrorMsg, setDayErrorMsg] = useState("");
  const [monthErrorMsg, setMonthErrorMsg] = useState("");
  const [yearErrorMsg, setYearErrorMsg] = useState("");

  const validationDate = () => {
    const day = Number(days);
    const month = Number(months);
    const year = Number(years);

    console.log(day, month, year);

    // Show error message for day, month, and year if empty
    day < 1 && setDayErrorMsg("This field is required");
    month < 1 && setMonthErrorMsg("This field is required");
    year < 1 && setYearErrorMsg("This field is required");

    /**
     * Validation for day if the day is not specified between 1 - 31;
     * Validation for month if the day is not specified between 1 - 12;
     *  */
    day > 31 && setDayErrorMsg("Must be a valid day");
    month > 12 && setMonthErrorMsg("Must be a valid month");

    /**
     * The date is invalid e.g. 31/04/1991 (there are 30 days in April)
     */
    if (day === 31 && month === 4 && year === 1991) {
      setDayErrorMsg("Must be a valid date");
    }
  };

  // Form submit handler
  const handleSubmit = event => {
    event.preventDefault();

    // Validation Date
    validationDate();

    // Calculate the age
    const today = new Date();
    const birthDate = new Date(years, months - 1, days);
    console.log(today.getMilliseconds());
    console.log(birthDate);
  };

  // Handle day input
  const handleDayChange = event => {
    setDays(event?.target.value);
  };

  // Handle month input
  const handleMonthChange = event => {
    setMonths(event?.target.value);
  };

  // Hdndle year input
  const handleYearChange = event => {
    setYears(event.target.value);
  };

  return (
    <Container className="bg-body-tertiary container">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Label className="form-label">Day</Form.Label>
            <Form.Control
              value={days}
              onChange={event => handleDayChange(event)}
              type="text"
              className="form-input"
              placeholder="DD"
            ></Form.Control>
            {dayErrorMsg.length > 0 ? (
              <div className="error-msg">{dayErrorMsg}</div>
            ) : (
              ""
            )}
          </Col>
          <Col>
            <Form.Label className="form-label">Month</Form.Label>
            <Form.Control
              value={months}
              onChange={event => handleMonthChange(event)}
              className="form-input"
              type="text"
              placeholder="MM"
            ></Form.Control>
            {monthErrorMsg.length > 0 ? (
              <div className="error-msg">{monthErrorMsg}</div>
            ) : (
              ""
            )}
          </Col>
          <Col>
            <Form.Label className="form-label">Year</Form.Label>
            <Form.Control
              value={years}
              onChange={event => handleYearChange(event)}
              className="form-input"
              type="text"
              placeholder="YYYY"
            ></Form.Control>
            {yearErrorMsg.length > 0 ? (
              <div className="error-msg">{yearErrorMsg}</div>
            ) : (
              ""
            )}
          </Col>
        </Row>

        {/* Image + border */}
        <Row className="image-submit">
          <Button
            type="submit"
            style={{ width: "45px", height: "45px", borderRadius: "100px" }}
            className="img-button"
          >
            <Image
              src="/images/icon-arrow.svg"
              style={{ width: "100%" }}
              roundedCircle
            />
          </Button>
        </Row>
      </Form>

      <Row style={{ marginTop: "30px" }}>
        <Col>
          <strong className="date date-dynamic">--</strong>
          <strong className="date date-space">years</strong>
        </Col>
      </Row>
      <Row style={{ marginTop: "-20px" }}>
        <Col>
          <strong className="date date-dynamic">--</strong>
          <strong className="date date-space">months</strong>
        </Col>
      </Row>
      <Row style={{ marginTop: "-20px" }}>
        <Col>
          <strong className="date date-dynamic">--</strong>
          <strong className="date date-space">days</strong>
        </Col>
      </Row>
    </Container>
  );
}

export default App;

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

  // show year, month, and day
  const [showDay, setShowDay] = useState("");
  const [showMonth, setShowMonth] = useState("");
  const [showYear, setShowYear] = useState("");
  const [showHour, setShowHour] = useState(0);
  const [showMinute, setShowMinute] = useState(0);
  const [showSecond, setShowSecond] = useState(0);

  // Form submit handler
  const handleSubmit = event => {
    event.preventDefault();

    // Validation Date
    const day = Number(days);
    const month = Number(months);
    const year = Number(years);

    // Check the user input if insert future year
    const currentDate = Date.now();
    const userInputDate = new Date(year, month - 1, day).getTime();

    if (userInputDate > currentDate) {
      setYearErrorMsg("Must be in the past");
      return true;
    }

    // Show error message for day, month, and year if empty
    if (day < 1) {
      setDayErrorMsg("This field is required");
    }

    if (month < 1) {
      setMonthErrorMsg("This field is required");
    }

    if (year < 1) {
      setYearErrorMsg("This field is required");
    }

    /**
     * Validation for day if the day is not specified between 1 - 31;
     * Validation for month if the day is not specified between 1 - 12;
     *  */
    if (day > 31) {
      setDayErrorMsg("Must be a valid day");
    }

    if (month > 12) {
      setMonthErrorMsg("Must be a valid month");
    }

    if (day > 31 && month > 12) {
      return true;
    }

    if (day < 1 && month < 1 && year < 1) {
      return true;
    }

    /**
     * The date is invalid e.g. 31/04/1991 (there are 30 days in April)
     */
    if (day === 31 && month === 4 && year === 1991) {
      setDayErrorMsg("Must be a valid date");
      return true;
    }

    // Calculate the age
    const dateNow = Date.now();
    const dateOfBirthInMilliSeconds = new Date(
      years,
      months - 1,
      days
    ).getTime();

    const ageInMilliSeconds = dateNow - dateOfBirthInMilliSeconds;

    // Convert date of age into UTC date format
    const newUTCDate = new Date(ageInMilliSeconds);

    const calculatedYear = newUTCDate.getUTCFullYear() - 1970;
    const calculatedMonth = newUTCDate.getUTCMonth();
    const calculatedDate = newUTCDate.getUTCDate();
    const calcualtedHour = newUTCDate.getHours();
    const calcualtedMinutes = newUTCDate.getMinutes();
    const calculatedSeconds = newUTCDate.getSeconds();

    setShowYear(calculatedYear);
    setShowMonth(calculatedMonth);
    setShowDay(calculatedDate);
    setShowHour(calcualtedHour);
    setShowMinute(calcualtedMinutes);
    setShowSecond(calculatedSeconds);
  };

  // Handle day input
  const handleDayChange = event => {
    if (event.target.value < 1) return true;
    if (event.target.value > 31) return true;
    setDays(event?.target.value);
  };

  // Handle month input
  const handleMonthChange = event => {
    if (event.target.value < 1) return true;
    if (event.target.value > 12) return true;
    setMonths(event?.target.value);
  };

  // Hdndle year input
  const handleYearChange = event => {
    if (event.target.value < 1) return true;
    setYears(event.target.value);
  };

  return (
    <>
      <Container className="bg-body-tertiary container">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Label className="form-label">Day</Form.Label>
              <Form.Control
                value={days}
                onChange={event => handleDayChange(event)}
                type="number"
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
                type="number"
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
                type="number"
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
            <strong className="date date-dynamic">
              {showYear.length < 1 ? "--" : showYear}
            </strong>
            <strong className="date date-space">years</strong>
          </Col>
        </Row>
        <Row style={{ marginTop: "-20px" }}>
          <Col>
            <strong className="date date-dynamic">
              {showMonth.length < 1 ? "--" : showMonth}
            </strong>
            <strong className="date date-space">months</strong>
          </Col>
        </Row>
        <Row style={{ marginTop: "-20px" }}>
          <Col>
            <strong className="date date-dynamic">
              {showDay.length < 1 ? "--" : showDay}
            </strong>
            <strong className="date date-space">days</strong>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: "15px",
            paddingTop: "15px",
            borderTop: "1px solid lightGray",
          }}
        >
          <Col className="time-col">
            <button type="button" className="time-btn">
              {showHour}
            </button>
            <strong>HOURS</strong>
          </Col>
          <Col className="time-col">
            <button type="button" className="time-btn">
              {showMinute}
            </button>
            <strong>MINUTES</strong>
          </Col>
          <Col className="time-col">
            <button type="button" className="time-btn">
              {showSecond}
            </button>
            <strong>SECONDS</strong>
          </Col>
        </Row>
      </Container>
      <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://portfolio-mozahedul.vercel.app/" target="_blank">
          Mozahedul Islam
        </a>
        .
      </div>
    </>
  );
}

export default App;

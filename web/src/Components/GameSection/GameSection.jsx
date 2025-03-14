import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { Get } from "../../Utils/Utils";
import { useNavigate } from "react-router-dom";

const GameSection = () => {
  const [quiz, setQuiz] = useState([]);

  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      selectedOption: "",
    },
    onSubmit: (values) => {
      console.log("Selected Option:", values.selectedOption);
      toast.success(`You selected: ${values.selectedOption}`);
      navigate("/checkout")
    },
  });

  useEffect(() => {
    fetchQuiz();
    // eslint-disable-next-line
  }, []);

  const fetchQuiz = async () => {
    try {
      let res = await Get("question");
      if (res && res.data.questions) {
        const questions = res.data.questions;
        const randomIndex = Math.floor(Math.random() * questions.length);
        console.log("Random Index:", randomIndex);
        console.log("Random Quiz Item:", questions[randomIndex]);
        setQuiz([questions[randomIndex]]);
      }
    } catch (err) {
      console.log(err, "error fetching quiz");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
        {/* <div className="text-center"><span class="loader1"></span></div> */}
      {quiz.length > 0 ? (
        quiz.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="container-fluid">
              <div className="gamebg mt-3">
                <h3>{item.question}</h3>
              </div>
            </div>
            <div className="container mt-4">
              <div className="row justify-content-center">
                <div className="col-md-9">
                  <FormControl component="fieldset" fullWidth>
                    <h2 className="yellow">Choose an option</h2>
                    <RadioGroup
                      name="selectedOption"
                      value={formik.values.selectedOption}
                      onChange={formik.handleChange}
                    >
                      <div className="row" >
                      {["option1", "option2", "option3", "option4"].map(
                        (optionKey, optIndex) => (
                            <div className="col-md-6 mt-2" key={optIndex}>
                              <FormControlLabel
                                value={item[optionKey]}
                                control={<Radio color="warning" />}
                                label={item[optionKey]}
                                sx={{
                                  border: "1px solid #d5d5d5",
                                  width: "80%",
                                  borderRadius: "10px",
                                  alignItems: "center",
                                  display: "flex",
                                  backgroundColor:
                                    formik.values.selectedOption ===
                                    item[optionKey]
                                      ? "#f9a20050" // Yellow background for selected
                                      : "transparent", // Default background
                                  transition: "background-color 0.3s ease",
                                }}
                              />
                            </div>
                        )
                      )}
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="row mt-3 justify-content-center">
                <div className="col-md-3">
                  <Button
                    type="submit"
                    variant="contained"
                    className="btn-add-to-cart w-100"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))
      ) : (
        <div className="text-center"><span class="loader1"></span></div>
      )}
    </form>
  );
};

export default GameSection;

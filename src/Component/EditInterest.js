import { useState, useEffect } from "react";

import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
  TextField,
  FormControlLabel,
 
  RadioGroup,
  Radio,
} from "@mui/material";
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import {  getUsers, editUser} from '../Services/api';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, FormProvider } from "react-hook-form";


const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const schema = yup.object().shape({
  fullname: yup.string().required("field is required"),
  email: yup.string()
  .email('Email is invalid')
  .required('Email is required'),
  gender: yup
    .string()
    .required()
    .oneOf(["female", "male"], "Selecting the gender is required"),
  // tags: yup.string().required("field is required"),
  // tags: yup.array("").min(1, "At least 1 skill required"),
});


const EditUser = () => {

  const { state } = useLocation();
  console.log("state--->",state);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      fullname:  "",
      email:  "",
      gender:  "",
      tags:[]
    },

    resolver: yupResolver(schema),
  });
  const { reset, control, watch, formState, handleSubmit, setValue } = methods;
  const { errors } = formState;

  const form = watch();

  const navigate = useNavigate();

  const { id } = useParams();



  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUsers(id);
    setUser(response.data);
  };

  const [user, setUser] = useState({
    fullname:  "",
      email:"",
      gender: "",
      tags:[]
  });

  const {  fullname, email, gender } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  
  const onSubmit = async() => {
    console.log("on submit");
    // console.log("user---->",user);
    const response = await editUser(id, user);
    navigate("/");
  };

  return (
    <>
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
    <Container>
      <Typography variant="h4">Edit Information</Typography>
      <Controller
              name="fullname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={fullname}
                  onChange={e => onInputChange(e)}
                  error={!!errors[field.fullname]}
                  helperText={errors?.["fullname"]?.message}
                  label="FullName"
                  variant="outlined"
                  sx={{ m: 1, width: 500 }}
                />
              )}
            />
 
 <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={email}
                  onChange={e => onInputChange(e)}
                  error={!!errors[field.email]}
                  helperText={errors?.["email"]?.message}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  sx={{ m: 1, width: 500 }}
                />
              )}
            />
            <Controller
              className="mt-8 mb-16"
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl className="mt-8 mb-16 mx-14">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    {...field}
                  >
                    <FormControlLabel
                      value={"female"}
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value={"male"}
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />
      <FormControl>
        <div className="flex mx-2 float-end">
          <Button
            className="m-2 rounded-pill"
            variant="outlined"
            color="primary"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="rounded-pill"
            color="primary"
            type="submit"
          >
            Save
          </Button>
        </div>
      </FormControl>
    </Container>
    </form>
      </FormProvider>
    </>
  );
};

export default EditUser;

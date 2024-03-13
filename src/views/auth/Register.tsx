import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import SubHeader from "../../components/Title/SubHeader";
import {
  useLoginMutation,
  useRegisterMutation,
  useGetLoginStatusQuery,
  useChangeLoginStatusMutation,
} from "../../lib/features/authApiSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useAppDispatch } from "../../lib/store";
import { setCloseAuthModal } from "../../lib/features/globalSlice";
import { setToken } from "../../lib/features/authSlice";
import CustomModal from "../../components/Modal/CustomModal";
import { toast } from "react-toastify";

const SignupAndSignIn = () => {
  const dispatch = useAppDispatch();
  const [authOption, setAuthOption] = useState("signIn");
  const [username, setUsername] = useState(null);
  const [loginCredentials, setLoginCredentials] = useState();
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
  const {
    data: loggedInStatusData,
    error: loggedInStatusErr,
    isError: loggedInStatusIsEror,
    isSuccess: loggedInStatusIsSuccess,
    refetch,
  } = useGetLoginStatusQuery({ username }, { skip: !username });
  const [
    changeLoginStatus,
    {
      isLoading: changeLogIsLoading,
      isError: changeLogIsErr,
      isSuccess: changeLogIsSuccess,
      data: changeLogData,
      error: changeLogErr
    },
  ] = useChangeLoginStatusMutation();

  const [
    register,
    {
      data: registerData,
      isLoading: signUpIsLoading,
      isSuccess: signUpIsSuccess,
      isError: registerIsErr,
      error: registerErr
    },
  ] = useRegisterMutation();
  const [
    login,
    {
      data: loginData,
      isLoading: signInIsLoading,
      isSuccess: signInIsSuccess,
      isError: loginIsErr,
      error: loginError
    },
  ] = useLoginMutation();
  const signUpInitialValues = {
    username: "",
    password: "",
    role: "",
  };

  const SignUpValSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
  });
  const SignInValSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSignUpSubmit = useCallback(async (values) => {
    try {
      await register(values).unwrap();
    } catch (error) {
      console.log("The error:: ", error);
    }
  }, []);

  const handleSignInSubmit = useCallback((values) => {
    setUsername(values?.username);
    setLoginCredentials(values);
  },[signInIsLoading]);

  const handleSetIsAlreadyLoggedIn = useCallback(
    (value: boolean) => {
      setIsAlreadyLoggedIn(value);
      if (value === false) {
        login(loginCredentials);
      }
    },
    [loginCredentials]
  );

  const handleChangeLog = useCallback(() => {
    if (username) {
      changeLoginStatus(username);
    }
  }, [username]);

  useEffect(() => {
    if (signUpIsSuccess && registerData.responseCode === "200") {
      toast.success(registerData?.responseDescription);
      dispatch(setCloseAuthModal(false));
    }
    if (signInIsSuccess && loginData.responseCode === "200") {
      toast.success(loginData?.responseDescription);
      dispatch(setToken(loginData?.data?.access_token));
      dispatch(setCloseAuthModal(false));
    }
    if (changeLogIsSuccess && changeLogData.responseCode === "200") {
      setIsAlreadyLoggedIn(false);
      login(loginCredentials).unwrap();
    }
  }, [signUpIsSuccess, signInIsSuccess, changeLogIsSuccess]);

  useEffect(() => {
    if (username) {
      refetch();
    }
  }, [authOption, username]);

  useEffect(() => {
    if (loggedInStatusIsSuccess) {
      if (loggedInStatusData?.data === true) {
        setIsAlreadyLoggedIn(true);
      } else {
        login(loginCredentials).unwrap();
      }
    }
  }, [loggedInStatusIsSuccess]);

  useEffect(()=>{
    if(changeLogIsErr){
        toast.error(changeLogErr?.data.data)
    }
    if(loginIsErr){
        toast.error(loginError?.data?.data)
    }
    if(registerIsErr){
        toast.error(registerErr?.data?.data)
    }
    if(loggedInStatusErr){
        toast.error(loggedInStatusErr?.data?.data)
    }
  },[changeLogIsErr, registerIsErr, loginIsErr, loggedInStatusErr])


  return (
    <div className="w-full flex flex-col justify-center items-center mt-[2rem] mb-[1.4rem]">
      <div className="w-[95%]">
        <SubHeader>{authOption === "signIn" ? "Sign In" : "Sign Up"}</SubHeader>
      </div>
      <Formik
        enableReinitialize
        initialValues={
          authOption === "signIn" ? signUpInitialValues : signUpInitialValues
        }
        validationSchema={
          authOption === "signIn" ? SignInValSchema : SignUpValSchema
        }
        onSubmit={
          authOption === "signIn" ? handleSignInSubmit : handleSignUpSubmit
        }
      >
        {({ submitForm, resetForm }) => (
          <Form className="flex w-[95%] justify-center items-center flex-col gap-5">
            <div className="flex w-full flex-col">
              <label htmlFor="Title" className="ml-1 font-[600]">
                Username<span className="text-red-900 pl-1">*</span>
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="border-[1.5px] h-9 p-2 rounded-lg focus:outline-none"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-700"
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="description" className="ml-1 font-[600]">
                Password<span className="text-red-900 pl-1">*</span>
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="border-[1.5px] h-9 p-2 rounded-lg focus:outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-700"
              />
            </div>
            {authOption !== "signIn" && (
              <div className="flex w-full flex-col">
                <label htmlFor="status" className="ml-1 font-[600]">
                  Role<span className="text-red-900 pl-1">*</span>
                </label>
                <Field
                  type="text"
                  id="role"
                  name="role"
                  as="select"
                  className="border-[1.5px] h-9 px-2 rounded-lg focus:outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="BUYER">BUYER</option>
                  <option value="SELLER">SELLER</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-700"
                />
              </div>
            )}

            <div className="flex flex-row gap-5">
              <button
                className="bg-black opacity-70 py-[5px] px-[20px] text-white rounded"
                type="button"
                onClick={() => dispatch(setCloseAuthModal(false))}
              >
                Cancle
              </button>
              <button
                className="bg-[#7E30E1] py-[5px] px-[20px] text-white rounded"
                type="submit"
              >
                {signUpIsLoading || signInIsLoading ? (
                  <>
                    <Spin
                      className="mr-[10px]"
                      indicator={
                        <LoadingOutlined style={{ fontSize: 20 }} spin />
                      }
                    />
                    Submit ...
                  </>
                ) : (
                  <>Submit</>
                )}
              </button>
            </div>
            <div className="">
              {authOption === "signIn" ? (
                <p>
                  Don't have an account?{" "}
                  <span
                    onClick={() => setAuthOption("signUp")}
                    className="text-blue-600 cursor-pointer"
                  >
                    Sign up
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => setAuthOption("signIn")}
                    className="text-blue-600 cursor-pointer"
                  >
                    Sign in
                  </span>
                </p>
              )}
            </div>
          </Form>
        )}
      </Formik>
      <CustomModal
        isOpen={isAlreadyLoggedIn}
        onCancel={() => handleSetIsAlreadyLoggedIn(false)}
      >
        <div className="p-[20px] flex flex-col justify-center items-center">
          <p className="text-1xl font-semibold antialiased">
            You already have an active session
          </p>
          <p className="mt-2">Do you want to logout other active sessions?</p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              className="bg-black opacity-70 py-[5px] px-[20px] text-white rounded"
              type="button"
              onClick={() => handleSetIsAlreadyLoggedIn(false)}
            >
              Ignore
            </button>
            <button
              className="bg-[#7E30E1] py-[5px] px-[20px] text-white rounded"
              onClick={() => handleChangeLog()}
            >
              {changeLogIsLoading ? (
                <>
                  <Spin
                    className="mr-[10px]"
                    indicator={
                      <LoadingOutlined style={{ fontSize: 20 }} spin />
                    }
                  />
                  Logout ...
                </>
              ) : (
                <>Logout</>
              )}
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default SignupAndSignIn;

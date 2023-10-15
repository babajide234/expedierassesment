import { useMutation } from "react-query";
import { Button } from "../components/Button"
import { Input } from "../components/Forms"
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Login, getCookie, setCookie } from "../util/functions";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import useUserStore from "../store/userStore";
import useAuthStore from "../store/authStore";

const LoginPage = () => {
    
    const navigate = useNavigate(); 
    const setLogin = useAuthStore((state) => state.login);

    // const cookies = new Cookies();

    const login = useMutation((payload) => Login(payload),{
        onSuccess: (data) => {
            // console.log(data);
            const decoded = jwtDecode(data.token);
            setCookie('token', data.token, new Date(decoded.iat  * 1000) );
            toast.success('logged in successfully');
            setLogin()

            navigate('/');
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const initialValues = {
        username: 'mor_2314',
        password: '83r5^_'
    };
    
    const validationSchema = Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
    });
    
    const handleSubmit = (values) => {
      console.log('Form submitted:', values);
      const payload = {
          username: values.username,
          password: values.password
      } 
      login.mutate(payload);

    };

  return (
    <div className="w-full">
        <div className="w-full px-8 md:px-20 mb-10">
            <h2 className=" text-[2rem] md:text-[4rem] text-neutral font-bold">Login</h2>
        </div>
        <div className="w-full">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange, errors, touched }) => (
                <Form className="w-full px-10 md:px-20">        
                        <div className="w-full relative mb-6">
                            <Input
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                placeholder="Username"
                            />
                            {errors.username && touched.username && (
                                <div className="text-red-600">{errors.username}</div>
                            )}
                        </div>
                        <div className=" w-full relative mb-6">
                            <Input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                placeholder="Password"
                            />
                            {errors.password && touched.password && (
                                <div className="text-red-600">{errors.password}</div>
                            )}
                        </div>
                        <div className="text-center lg:text-left flex gap-5 w-full justify-between">
                            <Button type="submit" onClick={()=>navigate('/')}>
                                Back
                            </Button>
                            <Button type="submit" loading={login.isLoading}>
                                Login
                            </Button>
                        </div>
                </Form>
                )}
            </Formik>
        </div>
    </div>
    )
}

export default LoginPage;

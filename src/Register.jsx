import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useState} from "react";

function Register() {

    const initialValues = {
        firstName: '',
        lastName: '',
        npiNum: '',
        address: '',
        telephone: '',
        email: '',
    };

    const [values, setValues] = useState();
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        npiNum: Yup.string()
            .required("NPI Number is required")
            .matches(/^[0-9]+$/, "NPI Number must be only numbers")
            .min(10, 'NPI Number Must be exactly 10 digits')
            .max(10, 'NPI Number Must be exactly 10 digits'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        address: Yup.string()
            .required('Business Address is required'),
        telephone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Telephone is required')
    });

    function onSubmit(fields) {
        setValues(fields);
    }

    return (

        <div className='app-container'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 offset-sm-2 mt-5">
                        <div className="card m-3">
                            <Formik initialValues={initialValues} validationSchema={validationSchema}
                                    onSubmit={onSubmit}>
                                {({errors, touched}) => (
                                    <Form>
                                        <h3 className="card-header">Register</h3>
                                        <div className="card-body">
                                            <div className="form-row">
                                                <div className="form-group">
                                                    <ErrorMessage name="title" component="div"
                                                                  className="invalid-feedback"/>
                                                </div>
                                                <div className="form-group col">
                                                    <label>First Name</label>
                                                    <Field name="firstName" type="text"
                                                           className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')}/>
                                                    <ErrorMessage name="firstName" component="div"
                                                                  className="invalid-feedback"/>
                                                </div>
                                                <div className="form-group col">
                                                    <label>Last Name</label>
                                                    <Field name="lastName" type="text"
                                                           className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')}/>
                                                    <ErrorMessage name="lastName" component="div"
                                                                  className="invalid-feedback"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>NPI Number</label>
                                                <Field name="npiNum" type="text"
                                                       className={'form-control' + (errors.npiNum && touched.npiNum ? ' is-invalid' : '')}/>
                                                <ErrorMessage name="npiNum" component="div"
                                                              className="invalid-feedback"/>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col">
                                                    <label>Business Address</label>
                                                    <Field name="address" type="address"
                                                           className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')}/>
                                                    <ErrorMessage name="address" component="div"
                                                                  className="invalid-feedback"/>
                                                </div>
                                                <div className="form-group col">
                                                    <label>Telephone Number</label>
                                                    <Field name="telephone" type="telephone"
                                                           className={'form-control' + (errors.telephone && touched.telephone ? ' is-invalid' : '')}/>
                                                    <ErrorMessage name="telephone" component="div"
                                                                  className="invalid-feedback"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <Field name="email" type="text"
                                                       className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}/>
                                                <ErrorMessage name="email" component="div"
                                                              className="invalid-feedback"/>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-primary">
                                                    Register
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <pre>{values && JSON.stringify(values, null, 2)}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;

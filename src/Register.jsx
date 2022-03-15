import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useState} from "react";
import {City, State} from 'country-state-city';

function Register() {

    const initialValues = {
        firstName: '',
        lastName: '',
        npiNum: '',
        address: '',
        state: '',
        city: '',
        zip: '',
        telephone: '',
        email: '',
    };

    const [values, setValues] = useState();
    const [stateIso, setStateIso] = useState('')
    const allStates = State.getStatesOfCountry('US');

    // eslint-disable-next-line no-use-before-define
    const phoneRegExp = (/^(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d+)\)?[-. \\/]?)?((?:\(?\d+\)?[-. \\/]?)*)(?:[-. \\/]?(?:#|ext\.?|extension|x)[-. \\/]?(\d+))?$/i);

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
            .required('Street Address is required'),
        state: Yup.string()
            .required('State is required'),
        city: Yup.string()
            .required('City is required'),
        zip: Yup.string()
            .required("Zip is required")
            .matches(/^[0-9]+$/, "Invalid Zip")
            .min(5, 'Invalid Zip')
            .max(5, 'Invalid Zip'),
        telephone: Yup.string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .required('Telephone is required')
    });

    function onSubmit(fields) {
        setValues(fields);
    }

    function handleChange(e) {
        // eslint-disable-next-line array-callback-return
        allStates.map((values) => {
            if (e.target.value === values.name) {
                setStateIso(values.isoCode);
            }
        })
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
                                            <div className="form-group">
                                                <label>Street Address</label>
                                                <Field name="address" type="text"
                                                       className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')}/>
                                                <ErrorMessage name="address" component="div"
                                                              className="invalid-feedback"/>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>State</label>
                                                    <Field name="state" as="select" id="state" onBlur={handleChange}
                                                           className={'form-control' + (errors.state && touched.state ? ' is-invalid' : '')}>
                                                        <option value={""}>Choose...</option>
                                                        {allStates.map((values, idx) => (
                                                            <option key={idx}>{values.name}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="state" component="div"
                                                                  className="invalid-feedback"/>
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label>City</label>
                                                    <Field name="city" id="city" as="select"
                                                           className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')}>
                                                        <option value={""}>Choose...</option>
                                                        {City.getCitiesOfState('US', stateIso).map((values, idx) => (
                                                            <option key={idx}>{values.name}</option>
                                                        ))}
                                                    </Field>
                                                    <ErrorMessage name="city" component="div"
                                                                  className="invalid-feedback"/>
                                                </div>
                                                <div className="form-group col-md-2">
                                                    <label>Zip</label>
                                                    <Field name="zip" type="text" pattern="[0-9]{5}"
                                                           className={'form-control' + (errors.zip && touched.zip ? ' is-invalid' : '')}/>
                                                    <ErrorMessage name="zip" component="div"
                                                                  className="invalid-feedback"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Telephone Number</label>
                                                <Field name="telephone" type="telephone"
                                                       className={'form-control' + (errors.telephone && touched.telephone ? ' is-invalid' : '')}/>
                                                <ErrorMessage name="telephone" component="div"
                                                              className="invalid-feedback"/>
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

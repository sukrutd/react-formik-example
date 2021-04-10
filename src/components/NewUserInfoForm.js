import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
	name: 'Sukrut',
	email: ''
};

const onSubmit = (values) => console.log('Form data', values);

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email format').required('Required')
});

/**
 *  This component uses useFormik hook for
 *  1. managing form state,
 *  2. validation and displaying error messages,
 * 	3. handling form submission
 */
const NewUserInfoForm = () => {
	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema
	});

	console.log('formik.touched', formik.touched);

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className='form-control'>
				<label htmlFor='name'>Name</label>
				<input type='text' id='name' name='name' {...formik.getFieldProps('name')} />
				{formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
			</div>

			<div className='form-control'>
				<label htmlFor='email'>E-mail</label>
				<input type='email' id='email' name='email' {...formik.getFieldProps('email')} />
				{formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
			</div>

			<button type='submit'>Submit</button>
		</form>
	);
};

export default NewUserInfoForm;

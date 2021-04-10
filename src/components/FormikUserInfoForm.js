import React from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import Alert from './Alert';

const initialValues = {
	name: 'Sukrut',
	email: '',
	description: '',
	address: '',
	social: {
		facebook: '',
		linkedin: ''
	},
	phoneNumbers: ['']
};

const onSubmit = (values) => console.log('Form data', values);

const validationSchema = Yup.object({
	name: Yup.string().required('Required'),
	email: Yup.string().email('Invalid email format').required('Required'),
	address: Yup.string().required('Required')
});

/**
 * This component uses Formik components instead of useFormik hook
 */
const FormikUserInfoForm = () => (
	<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
		<Form>
			<div className='form-control'>
				<label htmlFor='name'>Name</label>
				<Field type='text' id='name' name='name' />
				<ErrorMessage name='name' component={Alert} />
			</div>

			<div className='form-control'>
				<label htmlFor='email'>E-mail</label>
				<Field type='email' id='email' name='email' />
				<ErrorMessage name='email'>{(errorMessage) => <Alert>{errorMessage}</Alert>}</ErrorMessage>
			</div>

			<div className='form-control'>
				<label htmlFor='description'>Description</label>
				<Field as='textarea' id='description' name='description' />
				<ErrorMessage name='description' component={Alert} />
			</div>

			<div className='form-control'>
				<label htmlFor='address'>Address</label>
				<Field name='address'>
					{({ field, meta }) => {
						console.log('Field rendered!');
						return (
							<div>
								<input type='text' id='address' {...field} />
								{meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
							</div>
						);
					}}
				</Field>
			</div>

			<div className='form-control'>
				<label htmlFor='facebook'>Facebook Profile</label>
				<Field type='text' id='facebook' name='social.facebook' />
			</div>

			<div className='form-control'>
				<label htmlFor='linkedin'>LinkedIn Profile</label>
				<Field type='text' id='linkedin' name='social.linkedin' />
			</div>

			<div className='form-control'>
				<label htmlFor=''>Phone Numbers</label>
				<FieldArray name='phoneNumbers'>
					{({ push, remove, form }) => {
						const { values: { phoneNumbers = [] } = {} } = form;
						return (
							<>
								{phoneNumbers.map((phoneNumber, index) => (
									<div key={index} className='field-array-item'>
										<Field type='text' name={`phoneNumbers[${index}]`} />
										{index > 0 && (
											<button type='button' onClick={() => remove(index)}>
												-
											</button>
										)}
										<button type='button' onClick={() => push('')}>
											+
										</button>
									</div>
								))}
							</>
						);
					}}
				</FieldArray>
			</div>

			<button type='submit'>Submit</button>
		</Form>
	</Formik>
);

export default FormikUserInfoForm;

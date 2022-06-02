import { Formik } from 'formik'
import React from 'react'
import { signin } from '../lib/auth'

type Props = {}

const Login = (props: Props) => {
    return (
        <div className='bg-secondary-dark h-screen w-screen'>
            <div className='bg-primary-dark h-full w-full max-w-3xl mx-auto'>
                <div className='shadow-sm shadow-secondary-dark py-5 px-7' >
                    <h1 className='text-xl text-white font-bold'>Sign in</h1>
                </div>
                <Formik initialValues={{ email: '', password: '' }} onSubmit={async ({ email, password }, { setSubmitting, setFieldValue }) => {
                    setSubmitting(true)
                    const error = await signin(email, password)
                    if (error) {
                        setSubmitting(false)
                        alert(error)
                    }
                    alert("Logged in bro")
                    setSubmitting(false)
                }}>
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form className="flex flex-col w-full p-5 space-y-3 " onSubmit={handleSubmit}>
                            <input
                                className='input-dark'
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder='Email'
                            />
                            <input
                                className='input-dark'
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder='Password'
                            />
                            <button disabled={isSubmitting} className="btn-dark w-48" type="submit">Submit</button>
                            <button className="btn-dark w-48" type='button'>Create an account</button>
                            <div className='text-center space-y-2'>
                                <p className='text-white'>Or Sign in with:</p>
                                <button className="btn-dark" type='button'>Google</button>
                            </div>
                        </form>
                    )}
                </Formik>

            </div>
        </div >
    )
}

export default Login
import { signOut } from 'firebase/auth'
import { Formik } from 'formik'
import React from 'react'
import { signin } from '../lib/auth'
import { signInWithGoogle } from '../lib/auth/withProviders'
import { auth } from '../lib/firebase'

type Props = {}

const Signup = (props: Props) => {
    return (
        <div className='bg-secondary-dark h-screen w-screen'>
            <div className='bg-primary-dark h-full w-full max-w-3xl mx-auto'>
                <div className='shadow-sm shadow-secondary-dark py-5 px-7' >
                    <h1 className='text-xl text-white font-bold'>Sign up</h1>
                </div>
                <Formik initialValues={{ username: '', email: '', password: '', repeat: '' }} onSubmit={async ({ email, password }, { setSubmitting, setFieldValue }) => {
                    setSubmitting(true)
                    const error = await signin(email, password)
                    if (error) {
                        setSubmitting(false)
                        return alert(error)
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
                                type="username"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                placeholder='Username'
                            />
                            <input
                                className='input-dark'
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder='Email'
                            />
                            <div className='flex space-x-3'>
                                <input
                                    className='input-dark flex-1'
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder='Password'
                                />
                                <input
                                    className='input-dark flex-1'
                                    type="password"
                                    name="repeat"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.repeat}
                                    placeholder='Repeat Password'
                                />

                            </div>
                            <button disabled={isSubmitting} className="btn-dark w-52" type="submit">Submit</button>
                            <button className="btn-dark w-52" type='button'>Already have an account</button>
                            <div className='text-center space-y-2'>
                                <p className='text-white'>Or Sign in with:</p>
                                <button className="btn-dark" type='button' onClick={async () => {
                                    const error = await signInWithGoogle()
                                    if (error) {
                                        alert(error)
                                        return await signOut(auth)
                                    }
                                    alert("Signup success")
                                }}>Google</button>
                            </div>
                        </form>
                    )}
                </Formik>

            </div>
        </div >
    )
}

export default Signup
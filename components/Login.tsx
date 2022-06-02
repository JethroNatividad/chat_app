import { Formik } from 'formik'
import React from 'react'

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
                    // console.log(text)
                    // setFieldValue('text', text);
                    // await createTodo({ text, completed: false })
                    // await editTodo(id, { completed, text })
                    setSubmitting(false)
                    // setEditing(false)
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
                                className='btn-dark'
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder='Email'
                            />
                            <input
                                className='btn-dark'
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder='Password'
                            />
                            <button disabled={isSubmitting} className="" type="submit">Submit</button>
                        </form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default Login
import React from 'react'

type Props = {}

const Login = (props: Props) => {
    return (
        <div className='bg-secondary-dark h-screen w-screen'>
            <div className='bg-primary-dark h-full w-full max-w-3xl mx-auto'>
                <div className='shadow-sm shadow-secondary-dark py-5 px-10' >
                    <h1 className='text-xl text-white font-semibold'>Sign in</h1>
                </div>

            </div>
        </div >
    )
}

export default Login
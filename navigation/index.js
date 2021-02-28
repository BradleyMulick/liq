import React from 'react'
import { AuthProvider } from './AuthProvider'
import { FluidProvider } from './FluidProvider'
import Routes from './Routes'

const Providers = () => {
    return (
        <AuthProvider>
            <FluidProvider>

                <Routes />
            </FluidProvider>

        </AuthProvider>
    )
}

export default Providers
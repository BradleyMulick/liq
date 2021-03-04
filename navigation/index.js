import React from 'react'
import { AuthProvider } from './AuthProvider'
import { FluidProvider } from './FluidProvider'
import { LogsProvider } from './LogsProvider'
import Routes from './Routes'

const Providers = () => {
    return (
        <AuthProvider>
            <FluidProvider>
                <LogsProvider>
                    <Routes />
                </LogsProvider>
            </FluidProvider>

        </AuthProvider>
    )
}

export default Providers
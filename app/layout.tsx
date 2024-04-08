import React, { ReactNode } from "react"
import Providers from "./providers";
import { Metadata } from "next";
import PoweredByLogo from "@/modules/ui/PoweredByLogo";
import { Box, Flex } from "@chakra-ui/react";
import { ConnectWallet } from "@/modules/wallet";


export const metadata: Metadata = {
    title: {
        default: "KiddoCash",
        template: "%s | App Name"
    },
}

interface Props {
    children?: ReactNode;
}

const RootLayout = async (props: Props) => {
    const { children } = props;

    return (
        <html lang="en">
            <body>
                <Box backgroundImage="/bg.jpg" backgroundRepeat='no-repeat' backgroundPosition='center' minHeight='100vh'>
                <Providers>
                    <Flex justify="flex-end" align="flex-start">
                        <Box m={2} position="static" top="8" right="8">
                            <ConnectWallet />
                        </Box>
                    </Flex>
                    {children}
                    <PoweredByLogo />
                </Providers>
                </Box>
            </body>
        </html>
    )
}

export default RootLayout
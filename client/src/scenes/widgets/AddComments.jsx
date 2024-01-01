import { useTheme } from '@emotion/react';
import { Box, Button, Typography } from '@mui/material'
import WidgetWrapper from 'components/WidgetWrapper'
import React from 'react'

export const AddComments = () => {

    const { palette } = useTheme();
    const dark = palette.neutral.dark;


    return (
        <WidgetWrapper mb={'2rem'}>
            <Box>
                <Typography
                    variant="h4"
                    color={dark}
                    fontWeight="600"
                    sx={{
                        '&:hover': {
                            color: palette.primary.light,
                            cursor: 'pointer',
                        },
                    }}
                >
                    Add Comments or Chat With the Patient
                </Typography>
            </Box>
            <Box mt={'1rem'}>
                <Button variant='outlined'>Click to chat with patient</Button>
            </Box>
            <Box mt={'1rem'}>

            </Box>
        </WidgetWrapper>
    )
}

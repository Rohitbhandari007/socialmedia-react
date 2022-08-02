import React from 'react'
import Nav from '../components/Nav'
import Profile from '../components/Profile'
import { Grid, GridItem, Button } from '@chakra-ui/react'


function ProfilePage() {
    return (
        <Grid templateColumns='repeat(5, 1fr)' gap={2}>
            <GridItem colSpan={2}>
                <Nav />
            </GridItem>
            <GridItem>

                <Profile />
            </GridItem>

        </Grid>
    )
}

export default ProfilePage
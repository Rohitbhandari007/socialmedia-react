import React from 'react'
import Nav from '../components/Nav'
import { Grid, GridItem, Button } from '@chakra-ui/react'


function ProfilePage() {
    return (
        <Grid templateColumns='repeat(5, 1fr)' gap={2}>
            <GridItem colSpan={2}>
                <Nav />
            </GridItem>
            <GridItem>

                yes
            </GridItem>
            <GridItem colSpan={2}>
                lol
            </GridItem>
        </Grid>
    )
}

export default ProfilePage
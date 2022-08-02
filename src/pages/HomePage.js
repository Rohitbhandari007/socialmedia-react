import React, { useState, useEffect, useContext } from 'react'
import Feed from '../components/Feed'
import CreatePost from '../components/CreatePost'
import Nav from '../components/Nav'
import Suggestions from '../components/Suggestions'
import { Grid, GridItem, Button } from '@chakra-ui/react'


const HomePage = () => {

    return (
        <Grid templateColumns='repeat(5, 1fr)' gap={2}>
            <GridItem colSpan={2}>
                <Nav />
            </GridItem>
            <GridItem>
                <Feed />
            </GridItem>
            <GridItem>
                <Suggestions />
            </GridItem>
        </Grid>
    )
}

export default HomePage
import { Avatar, Flex, Text, Divider } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function SearchResults({ username, uid, profile_image }) {


    return (
        <>
            <Flex
                flexDir='row'
                alignItems='center'
                height='8vh'
            >
                <Avatar size='sm' src={profile_image}></Avatar>
                <Link to={'/user/' + username + "/" + uid}>
                    <Text ml={1}>{username}</Text>
                </Link>
            </Flex >
            <Divider></Divider>
        </>

    )
}

export default SearchResults
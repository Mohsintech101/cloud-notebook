import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Text,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import NoteContext from "../context/notes/NoteCotext";
import { Link } from "react-router-dom";

export default function Account({ ChangeAlert }) {

  //host and user details api
  const host = process.env.REACT_APP_HOST
  const userDetailsApi = process.env.REACT_APP_USER_DETAILS

  //initial account details
  const initialAccountDetails = [];

  //initial account detail state
  const [accountDetails, setAccountDetails] = useState(initialAccountDetails);

  //destructuring account details
  const { _id: id, name, email, date } = accountDetails

  const getUsersData = async () => {
    //API Calling for getting User Account Details
    try {
      const response = await fetch(
        `${host}${userDetailsApi}`,
        {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const userDetails = await response.json();
      // console.log(userDetails)
      setAccountDetails(userDetails);
    } catch (error) {
      // console.error(error.message);
      ChangeAlert(error.message, "danger");
    }
  };

  //useContext - NoteContext
  const context = useContext(NoteContext);
  const { noteState, getNotes } = context;

  //useEffect for calling every time page loads / rerenders
  useEffect(() => {
    getUsersData();
    getNotes();
    // eslint-disable-next-line
  }, []);

  //customize date
  const customizeDate = (date) => {
    //created date
    const customDate = new Date(date)
    const createdDate =customDate.getDate()
    const createdMonth = customDate.getMonth()
    const createdYear = customDate.getFullYear()
    
    //account created date
    const accountCreatedDate = `${createdDate}/${createdMonth + 1}/${createdYear}`

    //current date and no of days ago account created in days
    const currentDate = new Date()
    const dateDiff = currentDate - customDate
    const no_of_days = Math.floor(dateDiff/1000/60/60/24)
    
    return (
      <>
      {accountCreatedDate}  (<span className="fontSecondaryColor">{no_of_days} days</span>)
      </>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <Heading className="fontPrimaryColor ifontSize30" size="md">User Information</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading className="fontPrimaryColor" size="xs" textTransform="uppercase">
                USer ID
              </Heading>
              <Text className="fontTertiaryColor" pt="2" fontSize="sm">
                {id}
              </Text>
            </Box>
            <Box>
              <Heading className="fontPrimaryColor" size="xs" textTransform="uppercase">
                User Name
              </Heading>
              <Text className="fontTertiaryColor" pt="2" fontSize="sm">
                {name}
              </Text>
            </Box>
            <Box>
              <Heading className="fontPrimaryColor" size="xs" textTransform="uppercase">
                Email ID
              </Heading>
              <Text className="fontTertiaryColor" pt="2" fontSize="sm">
                {email}
              </Text>
            </Box>
            <Box>
              <Heading className="fontPrimaryColor" size="xs" textTransform="uppercase">
                Total Notes
              </Heading>
              <Text pt="2" fontSize="sm">
               <Link className="fontTertiaryColor" to="/">{noteState.length}</Link>
              </Text>
            </Box>
            <Box>
              <Heading className="fontPrimaryColor" size="xs" textTransform="uppercase">
                Created Date
              </Heading>
              <Text className="fontTertiaryColor" pt="2" fontSize="sm">
                {customizeDate(date)}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

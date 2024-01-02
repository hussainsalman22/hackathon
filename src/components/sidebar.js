import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from './firebase';
import { collection, getDocs, doc } from 'firebase/firestore';
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
 
  Drawer,
  Card,
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  NoSymbolIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,

  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar(props) {
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [reqlength, setreqlength] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestdata = await getDocs(collection(db, 'request'));
        // console.log(requestdata.length())
        // const snapshot = await db.collection('request').get();

        const items = requestdata.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setreqlength(items.length)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const navigate = useNavigate();
  function Home() {
    navigate("Home")
  }
  function post() {
    navigate("Post")
  }

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >


          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""
                    }`}
                />
              }
            >
              <Link to="/Home">
                <ListItem className="p-0 border-b-0 p-3" selected={open === 1} onClick={closeDrawer} >


                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5 " />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal" >
                    Home
                  </Typography>


                </ListItem>
              </Link>

            </Accordion>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""
                    }`}
                />
              }
            >
              <Link to="/Post">
                <ListItem className="p-0  border-b-0 p-3" onClick={closeDrawer} selected={open === 2}>

                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Post
                  </Typography>

                </ListItem>
              </Link>

            </Accordion>
            <hr className="my-2 border-blue-gray-50" />
            <Link to="/Request">
              <ListItem onClick={closeDrawer}>
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                request
                <ListItemSuffix>
                  <Chip
                    value={reqlength}
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
            </Link>
            <Link to="/Accepted">
              <ListItem onClick={closeDrawer}>
                {/* <Link to="Accepted"> */}
                <ListItemPrefix>
                  <CheckCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Accepted

              </ListItem>
            </Link>
            <Link to="/Rejected" >
              <ListItem onClick={closeDrawer}>
                <ListItemPrefix>
                  <NoSymbolIcon className="h-5 w-5" />
                </ListItemPrefix>
                rejected
              </ListItem>
            </Link>
            <Link to="/Donation">
              <ListItem onClick={closeDrawer}>
                <ListItemPrefix>
                  <CurrencyDollarIcon className="h-5 w-5" />
                </ListItemPrefix>
                Donation
              </ListItem>
            </Link>
            <Link to="/Terms">
              <ListItem onClick={closeDrawer}>
                <ListItemPrefix>
                  <InformationCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Terms
              </ListItem>
            </Link>
            <Link to="/Policy">
              <ListItem onClick={closeDrawer}>
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Policy
              </ListItem>
            </Link>

            <Link to="/">
              <ListItem >

                <ListItemPrefix>
                  <PowerIcon className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </Link>
          </List>

        </Card>
      </Drawer>
    </>
  );
}